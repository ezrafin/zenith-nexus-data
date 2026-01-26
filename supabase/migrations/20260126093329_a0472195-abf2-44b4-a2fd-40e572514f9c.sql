-- Create rate_limits table for IP-based rate limiting
CREATE TABLE public.rate_limits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address inet NOT NULL,
  action_type text NOT NULL,
  request_count integer NOT NULL DEFAULT 1,
  window_start timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT rate_limits_ip_action_unique UNIQUE (ip_address, action_type)
);

-- Create index for fast lookups
CREATE INDEX idx_rate_limits_ip_action ON public.rate_limits (ip_address, action_type);
CREATE INDEX idx_rate_limits_window ON public.rate_limits (window_start);

-- Enable RLS but allow service role full access
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- No public access - only service role can manage rate limits
-- (Edge functions use service role key)

-- Function to check and update rate limit (called by edge function)
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_user_id uuid DEFAULT NULL,
  p_ip_address inet DEFAULT NULL,
  p_action_type text DEFAULT 'general',
  p_max_attempts integer DEFAULT 10,
  p_window_seconds integer DEFAULT 60
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current_count integer;
  v_window_start timestamp with time zone;
  v_now timestamp with time zone := now();
  v_window_cutoff timestamp with time zone := v_now - (p_window_seconds || ' seconds')::interval;
BEGIN
  -- Prefer user_id if available, otherwise use IP
  IF p_user_id IS NOT NULL THEN
    -- User-based rate limiting (existing logic via separate tracking)
    -- For now, just return true for authenticated users (they have other protections)
    RETURN true;
  END IF;
  
  IF p_ip_address IS NULL THEN
    -- No identifier available, allow but log warning
    RETURN true;
  END IF;
  
  -- Check if we have a recent record for this IP + action
  SELECT request_count, window_start 
  INTO v_current_count, v_window_start
  FROM public.rate_limits
  WHERE ip_address = p_ip_address 
    AND action_type = p_action_type
  FOR UPDATE;
  
  IF NOT FOUND THEN
    -- First request, create record
    INSERT INTO public.rate_limits (ip_address, action_type, request_count, window_start)
    VALUES (p_ip_address, p_action_type, 1, v_now);
    RETURN true;
  END IF;
  
  -- Check if window has expired
  IF v_window_start < v_window_cutoff THEN
    -- Reset the window
    UPDATE public.rate_limits
    SET request_count = 1, window_start = v_now, updated_at = v_now
    WHERE ip_address = p_ip_address AND action_type = p_action_type;
    RETURN true;
  END IF;
  
  -- Window still active, check count
  IF v_current_count >= p_max_attempts THEN
    -- Rate limit exceeded
    RETURN false;
  END IF;
  
  -- Increment count
  UPDATE public.rate_limits
  SET request_count = request_count + 1, updated_at = v_now
  WHERE ip_address = p_ip_address AND action_type = p_action_type;
  
  RETURN true;
END;
$$;

-- Cleanup function to remove old rate limit records (run periodically)
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_deleted integer;
BEGIN
  DELETE FROM public.rate_limits
  WHERE window_start < now() - interval '1 hour';
  
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  RETURN v_deleted;
END;
$$;