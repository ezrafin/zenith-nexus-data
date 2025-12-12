-- Add replies to the first 6 discussions (oldest ones)
INSERT INTO public.forum_replies (discussion_id, user_id, author_name, content, created_at)
SELECT 
  fd.id,
  p.id,
  COALESCE(p.display_name, 'User'),
  (ARRAY[
    'Great point! I completely agree with this analysis.',
    'Thanks for sharing this insight. Very helpful for beginners.',
    'I have been following this strategy for months now. Works great!',
    'Could you elaborate more on the risk management aspect?',
    'This is exactly what I was looking for. Bookmarked!',
    'Interesting perspective. Have you considered the macro factors?',
    'I disagree with some points here, but overall solid analysis.',
    'Been trading for 5 years and this is spot on.',
    'What about the impact of interest rates on this?',
    'Thanks for the detailed explanation!',
    'This changed my view on portfolio diversification.',
    'Great discussion! Following for updates.',
    'Has anyone tested this in a bear market?',
    'I would add that tax implications are also important.',
    'Solid fundamentals here. Well researched.',
    'This aligns with what the experts are saying.',
    'Can you share your sources for this data?',
    'I have seen similar patterns in other markets.',
    'The technical analysis here is impressive.',
    'What is your take on the current volatility?'
  ])[floor(random() * 20 + 1)::int],
  NOW() - (random() * interval '30 days')
FROM (
  SELECT id FROM public.forum_discussions ORDER BY created_at ASC LIMIT 6
) fd
CROSS JOIN generate_series(1, 30) AS gs
JOIN LATERAL (
  SELECT id, display_name FROM public.profiles ORDER BY random() LIMIT 1
) p ON true;

-- Sync reply_count with actual replies
UPDATE public.forum_discussions fd
SET reply_count = (
  SELECT COUNT(*) 
  FROM public.forum_replies fr 
  WHERE fr.discussion_id = fd.id
);