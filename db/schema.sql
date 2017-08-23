DROP DATABASE IF EXISTS build_tracker;

CREATE DATABASE build_tracker;

USE build_tracker;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    user_name VARCHAR(40) NOT NULL,
    email VARCHAR(75) NOT NULL,
    password VARCHAR(75) NOT NULL,
    street VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code INT NOT NULL,
    phone_number BIGINT NOT NULL,
    type int(10) NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);


DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    station_completed int NOT NULL,
    shipped_flag BOOLEAN NOT NULL,
    date_created DATE NOT NULL,
    sku VARCHAR(15),
    serial_id VARCHAR(15),
    createdAt TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS kits;

CREATE TABLE kits (
    id int NOT NULL AUTO_INCREMENT,
    serial_id int NOT NULL,
    sku VARCHAR(15) NOT NULL,
    used BOOLEAN default false,
    createdAt TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS stations;

CREATE TABLE stations (
    id int NOT NULL AUTO_INCREMENT,
    station_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE products(
    id int NOT NULL AUTO_INCREMENT,
    sku VARCHAR(10)  NOT NULL,
    product_name  VARCHAR(25) NOT NULL,
    description VARCHAR(255),
    createdAt TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE quality (
    id int NOT NULL AUTO_INCREMENT,
    serial_id VARCHAR(15)NOT NULL,
    sku VARCHAR(15) NOT NULL,
    passed BOOLEAN NOT NULL,
    date_created DATE NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
    );