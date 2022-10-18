create database totembd;

use totembd;

create table endereco (
    idEndereco int primary key auto_increment,
    cep char(8) not null,
    numero int not null
);

create table estacao(
	idEstacao int primary key auto_increment,
    fkEndereco int,
	nomeEstacao varchar(45),
    foreign key (fkEndereco) references endereco(idEndereco)
);

create table empresa(
    idEmpresa int primary key auto_increment,
    fkEstacao int,
    nomeEmpresa varchar(45),
    cnpj char(14),
    foreign key (fkEstacao) references estacao(idEstacao)
);

create table usuario(
    idUsuario int auto_increment,
    fkEmpresa int,
    primary key (idUsuario, fkEmpresa),
    nomeUsuario varchar(45),
    email varchar(60),
    senha varchar(50),
    tipoUsuario int,
    foreign key (fkEmpresa) references empresa(idEmpresa)
);

create table totem (
    idTotem int primary key auto_increment,
    fkEstacao int,
    marca varchar (45),
    so varchar (45),
    foreign key (fkEstacao) references estacao(idEstacao)
);

create table disco (
    idDisco int auto_increment,
    fkTotem int,
    primary key (idDisco, fkTotem),
    nome varchar (45),
    modelo varchar (45),
    volumeTotal double,
    foreign key (fkTotem) references totem(idTotem)
);

create table memoria (
    idMemoria int primary key auto_increment,
    fkTotem int,
    memoriaTotal double,
    foreign key (fkTotem) references totem(idTotem)
);

create table processador (
    idProcessador int primary key auto_increment,
    fkTotem int,
    fabricante varchar (45),
    nome varchar (10),
    microArq varchar (10),
    frequencia double,
    foreign key (fkTotem) references totem(idTotem)
);

create table processo (
    idProcesso int primary key auto_increment,
    fkTotem int,
    nome varchar(45),
    foreign key (fkTotem) references totem(idTotem)
);

create table dado (
    idDado int auto_increment,
    fkTotem int,
    primary key (idDado, fkTotem),
    memoriaUso double,
    memoriaDisponivel double,
    volumeUso double,
    volumeDisponivel double,
    memoriaUsoProcesso double,
    processadorUsoProcesso double,
    foreign key (fkTotem) references totem(idTotem)
);
