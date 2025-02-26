-- Drop existing database if needed
DROP DATABASE IF EXISTS gtschool;

-- Create new database with correct collation settings
CREATE DATABASE gtschool
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TEMPLATE template0
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Switch to the new database
\c gtschool

-- Drop and create teachers table
DROP TABLE IF EXISTS public.teachers CASCADE;
CREATE TABLE public.teachers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(30) NOT NULL,
    contact VARCHAR(8) NOT NULL
) TABLESPACE pg_default;
ALTER TABLE public.teachers OWNER TO postgres;

-- Drop and create classes table
DROP TABLE IF EXISTS public.classes CASCADE;
CREATE TABLE public.classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    level VARCHAR(30) NOT NULL,
    formteacher INTEGER NOT NULL,
    CONSTRAINT classes_form_teacher_fkey FOREIGN KEY (formteacher)
        REFERENCES public.teachers (id)
        ON DELETE CASCADE
) TABLESPACE pg_default;
ALTER TABLE public.classes OWNER TO postgres;
