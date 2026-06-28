SELECT hardware_id, value, recorded_at
FROM telemetry_logs
WHERE metric = 'temperature'
  AND value > 8.0
ORDER BY recorded_at DESC
LIMIT 10;
