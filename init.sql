--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: equipements; Type: TABLE; Schema: public; Owner: reignier
--

CREATE TABLE Users (
    phone varchar(20),
    localisation geography(Point),
    nom varchar(40),
    prenom varchar(40),
    PRIMARY KEY (phone)
);

CREATE TABLE Messages (
    phone varchar(20),
    phone_emetteur varchar(20),
    messages varchar(500),
    time integer,
    FOREIGN KEY (phone) REFERENCES Users(phone)
);

--  1 rue des clercs
INSERT INTO Users (phone, localisation, nom, prenom) VALUES ('0630637680', 'POINT(45.192214 5.730174799999986)', 'RIFFARD', 'Nicolas'); 

-- ENSIMAG
INSERT INTO Users (phone, localisation, nom, prenom) VALUES ('0928492048', 'POINT(45.193457 5.768266)', 'IMAG', 'ENS'); 

-- Gare
INSERT INTO Users (phone, localisation, nom, prenom) VALUES ('0988776655', 'POINT(45.191507 5.714501)', 'Gare', 'Grenoble'); 

-- Gare
INSERT INTO Users (phone, localisation, nom, prenom) VALUES ('0123456789', 'POINT(45.191507 5.714501)', 'Gare', 'Grenoble'); 

insert into messages(phone, messages, time) VALUES ('1234567890', 'ON LE VIRE', 414961);


select * from users where st_dwithin(users.localisation, 'POINT(45.187481 5.715466)', 3000);