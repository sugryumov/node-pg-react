CREATE TABLE employees (
  id SERIAL,
  name text,
  title text,
  CONSTRAINT employees_pkey PRIMARY KEY (id)
);

CREATE TABLE users (
  "id" SERIAL,
  "email" text,
  "password" text,
  "isActivated" boolean,
  "activationLink" text
);

CREATE TABLE tokens ("id" SERIAL, "refreshToken" text);