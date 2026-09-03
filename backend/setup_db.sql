-- Run as postgres superuser, then update backend/.env DATABASE_URL if needed:
-- postgresql://teb:tebpass@localhost:5432/teb_enterprises

DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'teb') THEN
    CREATE ROLE teb LOGIN PASSWORD 'tebpass';
  END IF;
END
$$;

SELECT 'CREATE DATABASE teb_enterprises OWNER teb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'teb_enterprises')\gexec
