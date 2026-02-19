-- Overall unlock rate
WITH preview_counts AS (
  SELECT COUNT(DISTINCT run_id) as total_previews
  FROM conversion_events
  WHERE event_type = 'preview_viewed'
),
unlock_counts AS (
  SELECT COUNT(DISTINCT run_id) as total_unlocks
  FROM conversion_events
  WHERE event_type = 'unlock_clicked'
)
SELECT 
  total_previews,
  total_unlocks,
  ROUND(CAST(total_unlocks AS float) / NULLIF(total_previews, 0) * 100, 2) as unlock_rate
FROM preview_counts, unlock_counts;

-- Last 7 days
WITH daily_stats AS (
  SELECT 
    DATE_TRUNC('day', created_at) as day,
    COUNT(DISTINCT CASE WHEN event_type = 'preview_viewed' THEN run_id END) as previews,
    COUNT(DISTINCT CASE WHEN event_type = 'unlock_clicked' THEN run_id END) as unlocks
  FROM conversion_events
  WHERE created_at >= NOW() - INTERVAL '7 days'
  GROUP BY DATE_TRUNC('day', created_at)
)
SELECT 
  day,
  previews,
  unlocks,
  ROUND(CAST(unlocks AS float) / NULLIF(previews, 0) * 100, 2) as daily_rate
FROM daily_stats
ORDER BY day DESC;