-- initial data
INSERT INTO zikr.reading (zikr, utterance, started, expected) VALUES('salawat', 0, now(), timestamp '2024-04-09 21:00');

-- cleanup
DELETE FROM zikr.record 
WHERE created < '2021-02-14 19:25:49';

DELETE FROM zikr.record 
WHERE created < now() - INTERVAL '1 days';

-- UPDATE zikr.reading  SET started = (timestamp '2024-01-11 18:00'), expected = (timestamp '2024-04-09 21:00') where id = 1;

