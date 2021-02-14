CREATE SCHEMA zikr;
set search_path =  zikr; 

CREATE TABLE reading (
	id SERIAL NOT NULL,
	zikr varchar (50) NULL,
    utterance INT NOT NULL,
    started timestamp,
    expected timestamp,
    PRIMARY KEY (id)
);
CREATE INDEX zikr_id_idx ON reading (id);

CREATE TABLE record (
	id SERIAL NOT NULL,
	zikr varchar (50) NULL,
    profileid varchar (50) NULL,
    profilename varchar (50) NULL,
    utterance varchar (50) NULL,
    created timestamp,
    PRIMARY KEY (id)
);
CREATE INDEX record_id_idx ON record (id);
