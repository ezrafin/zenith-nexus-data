-- Create function to get user collection progress
CREATE OR REPLACE FUNCTION public.get_user_collection_progress(p_user_id uuid)
RETURNS TABLE(
  collected_count bigint,
  total_count bigint,
  has_all_regular boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_collected_count bigint;
  v_regular_total bigint;
BEGIN
  -- Count user's collected bills (excluding legendary)
  SELECT COUNT(*) INTO v_collected_count
  FROM user_collected_bills ucb
  INNER JOIN collectible_bills cb ON ucb.bill_id = cb.bill_id
  WHERE ucb.user_id = p_user_id
    AND cb.rarity = 'regular';
  
  -- Count total regular bills
  SELECT COUNT(*) INTO v_regular_total
  FROM collectible_bills
  WHERE rarity = 'regular';
  
  -- Return progress
  RETURN QUERY SELECT 
    v_collected_count,
    v_regular_total,
    (v_collected_count >= v_regular_total);
END;
$$;