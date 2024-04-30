create table Billett(
                        id int auto_increment not null ,
                        fornavn varchar(255) not null ,
                        etternavn varchar(255) not null,
                        film varchar(255) not null ,
                        antall int not null,
                        telefon int not null,
                        epost varchar(255) not null,
                        primary key (id)
);

