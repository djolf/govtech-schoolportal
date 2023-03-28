-- Database: gtschool

-- DROP DATABASE IF EXISTS gtschool;

CREATE DATABASE gtschool
    WITH
    OWNER = admin
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.936'
    LC_CTYPE = 'English_United States.936'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Table: public.teachers

-- DROP TABLE IF EXISTS public.teachers;

CREATE TABLE IF NOT EXISTS public.teachers
(
    id integer NOT NULL DEFAULT 'nextval('teachers_id_seq'::regclass)',
    name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    subject character varying(30) COLLATE pg_catalog."default" NOT NULL,
    contact character varying(8) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT teachers_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.teachers
    OWNER to postgres;

-- Table: public.classes

-- DROP TABLE IF EXISTS public.classes;

CREATE TABLE IF NOT EXISTS public.classes
(
    id integer NOT NULL DEFAULT 'nextval('classes_id_seq'::regclass)',
    name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    level character varying(30) COLLATE pg_catalog."default" NOT NULL,
    formteacher integer NOT NULL,
    CONSTRAINT classes_pkey PRIMARY KEY (id),
    CONSTRAINT classes_form_teacher_fkey FOREIGN KEY (formteacher)
        REFERENCES public.teachers (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.classes
    OWNER to postgres;