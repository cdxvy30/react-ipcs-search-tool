CREATE DATABASE ipcs;

CREATE TABLE device_COOKAS(
  -- fid SERIAL PRIMARY KEY,
  device_id CHAR(20),
  hum VARCHAR(255),
  kpa VARCHAR(255),
  rad VARCHAR(255),
  rain VARCHAR(255),
  serial_id CHAR(20),
  source CHAR(10),
  temp VARCHAR(255),
  _timestamp TIMESTAMP,
  _type CHAR(10),
  wd VARCHAR(255),
  ws VARCHAR(255)
);
