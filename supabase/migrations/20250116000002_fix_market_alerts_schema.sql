-- Fix market_alerts schema to ensure compatibility
-- This migration ensures the table has the correct structure

-- First, check if table exists and has the old structure
DO $$
BEGIN
    -- If target_value is nullable, make it NOT NULL
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'market_alerts' 
        AND column_name = 'target_value'
        AND is_nullable = 'YES'
    ) THEN
        -- Update existing NULL values to 0 (or handle as needed)
        UPDATE public.market_alerts 
        SET target_value = 0 
        WHERE target_value IS NULL;
        
        -- Make column NOT NULL
        ALTER TABLE public.market_alerts 
        ALTER COLUMN target_value SET NOT NULL;
    END IF;

    -- Remove target_percent column if it exists (not used in current implementation)
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'market_alerts' 
        AND column_name = 'target_percent'
    ) THEN
        ALTER TABLE public.market_alerts 
        DROP COLUMN IF EXISTS target_percent;
    END IF;

    -- Ensure target_value is DECIMAL type
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'market_alerts' 
        AND column_name = 'target_value'
        AND data_type != 'numeric'
    ) THEN
        ALTER TABLE public.market_alerts 
        ALTER COLUMN target_value TYPE numeric USING target_value::numeric;
    END IF;
END $$;

-- Ensure constraints exist
DO $$
BEGIN
    -- Add market_type constraint if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'market_alerts_market_type_check'
        AND table_schema = 'public'
        AND table_name = 'market_alerts'
    ) THEN
        ALTER TABLE public.market_alerts
        ADD CONSTRAINT market_alerts_market_type_check 
        CHECK (market_type IN ('indices', 'stocks', 'crypto', 'commodities', 'currencies'));
    END IF;

    -- Add alert_type constraint if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'market_alerts_alert_type_check'
        AND table_schema = 'public'
        AND table_name = 'market_alerts'
    ) THEN
        ALTER TABLE public.market_alerts
        ADD CONSTRAINT market_alerts_alert_type_check 
        CHECK (alert_type IN ('price_above', 'price_below', 'percent_change_up', 'percent_change_down'));
    END IF;
END $$;

-- Ensure indexes exist
CREATE INDEX IF NOT EXISTS idx_market_alerts_user_id ON public.market_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_market_alerts_active ON public.market_alerts(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_market_alerts_symbol ON public.market_alerts(symbol);

