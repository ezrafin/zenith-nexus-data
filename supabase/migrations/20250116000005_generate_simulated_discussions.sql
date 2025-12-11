-- Generate Simulated Forum Discussions
-- This migration creates realistic forum discussions with replies, timestamps, and admin comments

-- First, ensure we have the admin user
DO $$
DECLARE
    admin_user_id uuid;
    discussion_ids uuid[];
    reply_ids uuid[];
    user_avatars text[] := ARRAY[
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
    ];
    user_names text[] := ARRAY[
        'Alex Thompson',
        'Sarah Chen',
        'Michael Rodriguez',
        'Emma Wilson',
        'David Kim',
        'Lisa Anderson',
        'James Parker',
        'Maria Garcia'
    ];
    i integer;
    discussion_id uuid;
    reply_id uuid;
    base_time timestamp with time zone;
BEGIN
    -- Get admin user ID
    SELECT id INTO admin_user_id
    FROM auth.users
    WHERE email = 'mark.lindt.finance@gmail.com'
    LIMIT 1;

    -- If admin doesn't exist, create a placeholder (in production, admin should exist)
    IF admin_user_id IS NULL THEN
        RAISE NOTICE 'Admin user not found. Please ensure mark.lindt.finance@gmail.com exists.';
        RETURN;
    END IF;

    -- Discussion 1: "Best Long-Term Investment Strategy for 2024"
    base_time := now() - interval '5 days' - interval '3 hours';
    INSERT INTO public.forum_discussions (
        title, content, author_name, category, tags, is_approved, approved_by, approved_at, created_at
    ) VALUES (
        'Best Long-Term Investment Strategy for 2024',
        'I''ve been researching various investment strategies and wanted to get the community''s thoughts on what approach works best for long-term wealth building. Should I focus on index funds, individual stocks, or a mix? What about international exposure?',
        user_names[1],
        'investments',
        ARRAY['long-term', 'strategy', 'index-funds'],
        true,
        admin_user_id,
        base_time + interval '2 hours',
        base_time
    ) RETURNING id INTO discussion_id;
    discussion_ids := array_append(discussion_ids, discussion_id);

    -- Replies for Discussion 1
    INSERT INTO public.forum_replies (discussion_id, content, author_name, created_at) VALUES
        (discussion_id, 'I''ve been using a 60/40 split between index funds and individual stocks for the past 5 years. The index funds provide stability while individual picks allow for growth. Consider adding 20% international exposure for diversification.', user_names[2], base_time + interval '4 hours'),
        (discussion_id, 'For long-term, I strongly recommend VTI (Total Stock Market) or VOO (S&P 500). Low fees, broad diversification, and historically strong returns. Individual stock picking is risky unless you have time to research thoroughly.', user_names[3], base_time + interval '6 hours'),
        (discussion_id, 'Don''t forget about tax-advantaged accounts! Max out your 401(k) and IRA first. The tax benefits compound significantly over time.', user_names[4], base_time + interval '1 day');

    -- Discussion 2: "Understanding Crypto Market Cycles"
    base_time := now() - interval '3 days' - interval '5 hours';
    INSERT INTO public.forum_discussions (
        title, content, author_name, category, tags, is_approved, approved_by, approved_at, created_at
    ) VALUES (
        'Understanding Crypto Market Cycles',
        'Can someone explain how crypto market cycles work? I''m seeing a lot of volatility and want to understand if this is normal. When should I consider entering the market?',
        user_names[5],
        'crypto',
        ARRAY['crypto', 'market-cycles', 'volatility'],
        true,
        admin_user_id,
        base_time + interval '1 hour',
        base_time
    ) RETURNING id INTO discussion_id;
    discussion_ids := array_append(discussion_ids, discussion_id);

    -- Replies for Discussion 2
    INSERT INTO public.forum_replies (discussion_id, content, author_name, created_at) VALUES
        (discussion_id, 'Crypto markets typically follow 4-year cycles tied to Bitcoin halving events. We''re currently in what many consider a consolidation phase. Dollar-cost averaging is your friend here.', user_names[6], base_time + interval '3 hours'),
        (discussion_id, 'Volatility is absolutely normal in crypto. If you can''t handle 30-50% swings, crypto might not be for you. Only invest what you can afford to lose completely.', user_names[7], base_time + interval '5 hours'),
        (discussion_id, 'I''d wait for clearer regulatory signals before making large allocations. The SEC situation is still developing.', user_names[8], base_time + interval '1 day' + interval '2 hours');

    -- Discussion 3: "Company Analysis: Tesla vs. Traditional Auto"
    base_time := now() - interval '7 days' - interval '2 hours';
    INSERT INTO public.forum_discussions (
        title, content, author_name, category, tags, is_approved, approved_by, approved_at, created_at
    ) VALUES (
        'Company Analysis: Tesla vs. Traditional Auto',
        'I''m trying to decide between investing in Tesla or traditional automakers like Ford and GM. Tesla has the growth story, but traditional companies are catching up with EVs. What are your thoughts?',
        user_names[2],
        'companies',
        ARRAY['tesla', 'automotive', 'ev'],
        true,
        admin_user_id,
        base_time + interval '3 hours',
        base_time
    ) RETURNING id INTO discussion_id;
    discussion_ids := array_append(discussion_ids, discussion_id);

    -- Replies for Discussion 3
    INSERT INTO public.forum_replies (discussion_id, content, author_name, created_at) VALUES
        (discussion_id, 'Tesla has first-mover advantage and superior technology, but the valuation is stretched. Traditional automakers have manufacturing expertise and are pivoting quickly. I''d go with a diversified approach.', user_names[1], base_time + interval '5 hours'),
        (discussion_id, 'Don''t forget about BYD - they''re the real competition globally. Tesla might dominate in the US, but BYD is winning in China and expanding rapidly.', user_names[3], base_time + interval '8 hours'),
        (discussion_id, 'I''m long on Ford. Their F-150 Lightning is a game-changer, and they have the infrastructure to scale. Plus, the dividend is nice.', user_names[5], base_time + interval '1 day' + interval '1 hour');

    -- Discussion 4: "Market Correction: Time to Buy or Wait?"
    base_time := now() - interval '2 days' - interval '8 hours';
    INSERT INTO public.forum_discussions (
        title, content, author_name, category, tags, is_approved, approved_by, approved_at, created_at
    ) VALUES (
        'Market Correction: Time to Buy or Wait?',
        'The market has been down 5% this week. Is this a buying opportunity or should I wait for more clarity? I have cash on the sidelines and don''t want to miss out, but also don''t want to catch a falling knife.',
        user_names[4],
        'markets',
        ARRAY['market-correction', 'buying-opportunity', 'timing'],
        true,
        admin_user_id,
        base_time + interval '1 hour',
        base_time
    ) RETURNING id INTO discussion_id;
    discussion_ids := array_append(discussion_ids, discussion_id);

    -- Replies for Discussion 4
    INSERT INTO public.forum_replies (discussion_id, content, author_name, created_at) VALUES
        (discussion_id, 'Time in the market beats timing the market. If you''re investing for the long term, start dollar-cost averaging now. Don''t try to catch the bottom.', user_names[6], base_time + interval '2 hours'),
        (discussion_id, 'I''m waiting for the VIX to drop below 20 before adding more. We might see more volatility ahead with earnings season coming up.', user_names[7], base_time + interval '4 hours'),
        (discussion_id, 'Consider your time horizon. If you''re investing for 10+ years, these short-term moves are noise. Buy quality companies at fair prices.', user_names[2], base_time + interval '6 hours');

    -- Add admin comments to some replies
    -- Get reply IDs and add admin comments
    FOR i IN 1..array_length(discussion_ids, 1) LOOP
        -- Get second reply for each discussion
        SELECT id INTO reply_id
        FROM public.forum_replies
        WHERE discussion_id = discussion_ids[i]
        ORDER BY created_at
        LIMIT 1
        OFFSET 1;

        IF reply_id IS NOT NULL THEN
            -- Get the created_at time of the reply to add comment after it
            SELECT created_at INTO base_time
            FROM public.forum_replies
            WHERE id = reply_id;

            INSERT INTO public.admin_comments (reply_id, admin_id, comment, created_at) VALUES
                (reply_id, admin_user_id, 
                 CASE i
                     WHEN 1 THEN 'Excellent advice! I''d also emphasize the importance of rebalancing your portfolio annually to maintain your target allocation.'
                     WHEN 2 THEN 'Good point about dollar-cost averaging. I''d add that investors should also consider their time horizon - crypto requires patience and strong risk tolerance.'
                     WHEN 3 THEN 'Valid comparison. One thing to watch is how traditional automakers handle the transition - execution risk is real. Tesla has proven execution but at a premium valuation.'
                     WHEN 4 THEN 'Sound advice. Remember that market corrections are normal and often create opportunities for disciplined investors. Focus on quality companies with strong fundamentals.'
                     ELSE 'Great insight! Keep the discussion going.'
                 END,
                 base_time + interval '2 hours');
        END IF;
    END LOOP;

    RAISE NOTICE 'Generated % simulated discussions', array_length(discussion_ids, 1);
END $$;

