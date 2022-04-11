drop database if exists pricelist;

create database pricelist;
use pricelist;

CREATE TABLE IF NOT EXISTS item (
    name       VARCHAR(128)  NOT NULL,
    price      INT NOT NULL,
    PRIMARY KEY(name)
);

INSERT INTO item (name, price) VALUES ('Alan Faux Leather Storage Divan', 1880.90);
INSERT INTO item (name, price) VALUES ('Alan Pine Bunk Bed (Single, Grey)', 2880.90);
INSERT INTO item (name, price) VALUES ('Alan Lounge Sofa Bed', 588);
INSERT INTO item (name, price) VALUES ('Alan 4 Seater Sofa', 1228);
INSERT INTO item (name, price) VALUES ('Alan 4 Seater Sofa With Ottoman', 1428);
INSERT INTO item (name, price) VALUES ('Alan Teal Green 2 Seater Sofa', 1080);
INSERT INTO item (name, price) VALUES ('Alan Grey L Shape Sofa', 1880);
INSERT INTO item (name, price) VALUES ('Alan 8 Seater Dining Table', 1019.99);
INSERT INTO item (name, price) VALUES ('Alan 4 Seater Dining Table', 589);


