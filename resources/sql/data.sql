-- initial data
INSERT INTO zikr.reading (zikr, utterance, started, expected) VALUES('salawat', 0, now(), timestamp '2021-04-10 23:59');

-- cleanup
DELETE FROM zikr.record 
WHERE created < '2021-02-14 19:25:49';

DELETE FROM zikr.record 
WHERE created < now() - INTERVAL '1 days';