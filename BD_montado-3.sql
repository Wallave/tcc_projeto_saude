create database farmacia;
use farmacia;
 

 
create table tbl_posto(
	id_posto int not null auto_increment primary key,
    nome_unidade varchar(45) not null,
    endereco varchar(45) not null,
    cep varchar(10) not null,
    cnpj varchar(45) not null,
    enfermeira varchar(45) not null,
    telefone varchar (11) not null,
    email varchar (45) not null,
    senha varchar (45) not null
    
);

select * from tbl_posto;

create table tbl_medicamento(
	id_medicamento int not null auto_increment primary key,
    nome_medicamento varchar(45) not null
);

create table tbl_posto_medicamento(
	id_posto_medicamento int not null auto_increment primary key,
    cdg_medicamento varchar(45) not null,
    qtde int not null,
    vencimento date not null,
    data_entrada datetime not null,
    id_medicamentoFK int not null,
    id_postoFK int not null,
    constraint fk_medicamento foreign key (id_medicamentoFK) references tbl_medicamento(id_medicamento),
    constraint fk_posto foreign key (id_postoFK) references tbl_posto(id_posto)
);

select * from tbl_posto_medicamento;
create table tbl_cliente(
	id_cliente int not null auto_increment primary key,
    nome varchar(45) not null,
    rg varchar (20) not null,
    cpf varchar (20) not null,
    dt_nascimento date not null,
    endereco varchar(45) not null,
    telefone varchar(20) not null,
    n_sus varchar(45) not null,
    email varchar(45) not null,
    senha varchar(45) not null,
    id_posto_cliFK int not null default 1 ,
    constraint fk_posto_cli foreign key (id_posto_cliFK) references tbl_posto(id_posto)
);
select * from tbl_cliente;

create table agendamento(
	id_agendamento int not null auto_increment primary key,
    data_retirada date not null,
    hora time not null,
    qtde_retirada int not null,
    id_postofk int not null,
    id_clientefk int not null,
    id_medicamentofk int not null,
    constraint fk_postoAge foreign key (id_postofk) references tbl_posto(id_posto),
    foreign key (id_clientefk) references tbl_cliente(id_cliente),
    constraint fk_medicamentoAge foreign key (id_medicamentofk) references tbl_medicamento(id_medicamento)
);

insert into tbl_posto(nome_unidade,endereco,cep,cnpj,enfermeira,telefone,email,senha)values
('UBS Jardim Vista Alegre', 'Praca Cuiaba 100','06807-400','46523114000117','Cleide Aparecida  de Camargo','47047780','ubsvistaalegre@hotmail.com','123456789'),
('UBS Jardim São Marcos','Av.Augusto de A. Batista 350','06814-000','46523114000117','Dayane Jardim da Silva',' 42033689','ubsjosecgoncalves@embudasartes.sp.gov.br','123456789'),
('UBS Centro','Av. Eias Yazbek, 2500, Centro','06803-000','46523114000117','Márcia Rosilene Santos da Silva',' 47043311','ubsembu@embudasartes.sp.gov.br','123456789'),
('UBS Santo Eduardo','Rua Franca, 171','06823-350','46523114000117','Mariane Bonfante Cesário Lourenço','41495741','ubsstoeduardo@gmail.com','123456789');

insert into tbl_medicamento(nome_medicamento)
values ('Dipirona comprimido'),
('Dipirona liquida'),
('Amoxilina comprimido'),
('Amoxilina liquida'),
('Paracetamol comprimido'),
('Paracetamol liquida');

select * from tbl_posto;

create view agendados as
select a.id_agendamento as agendados, c.nome as nome, c.n_sus as sus, m.nome_medicamento as medicamento,  a.qtde_retirada, a.data_retirada, a.hora, tbl_posto.id_posto, c.id_cliente, tbl_posto.nome_unidade
from agendamento a, tbl_cliente c, tbl_posto, tbl_medicamento m
where a.id_clientefk = c.id_cliente
and a.id_medicamentofk = m.id_medicamento
and a.id_postofk = tbl_posto.id_posto;


create view postos as
SELECT id_posto, nome_unidade, nome_medicamento, id_medicamento, cep, qtde FROM tbl_medicamento
	JOIN tbl_posto_medicamento ON id_medicamentoFK = id_medicamento
		JOIN tbl_posto ON id_postoFK = id_posto;
			#where qtde <= 10
#			ORDER BY ABS(cep - 6805201);
        
        
select * from agendados;
select * from agendamento;

SELECT * FROM postos WHERE id_medicamento = 1 and qtde >= 3 ORDER BY ABS(cep - 09876-786);
        
/*SELECT * FROM postos Where id_medicamento = 1 and qtde <= 10 ORDER BY ABS(cep - 06805-210);

SELECT * FROM tbl_posto_medicamento;
Select * from tbl_medicamento;

insert into tbl_posto_medicamento (cdg_medicamento, qtde, vencimento, data_entrada, id_medicamentoFK, id_postoFK)
values ('123456', '7', '2024-10-10', '2022-06-15', '1', '1'),
('123456', '9', '2024-10-10', '2022-06-15', '2', '1'),
('123456', '7', '2024-10-10', '2022-06-15', '3', '1'),
('123456', '7', '2024-10-10', '2022-06-15', '4', '1'),
('123456', '7', '2024-10-10', '2022-06-15', '5', '1'),
('123456', '7', '2024-10-10', '2022-06-15', '6', '1');




insert into tbl_cliente (nome, rg,cpf,dt_nascimento,endereco,telefone,n_sus,email,senha,id_posto_cliFK)
value('Marcos', '376419167','41060715848','1999-07-17','rua augusta almeida','11974650970','23567841','teste@gmail.com','102030',1);

insert into tbl_posto_medicamento (cdg_medicamento, qtde, vencimento, data_entrada, id_medicamentoFK, id_postoFK)
values ('123456', '7', '2024-10-10', '2022-06-15', '1', '1'),
('123456', '9', '2024-10-10', '2022-06-15', '2', '1'),
('123456', '7', '2024-10-10', '2022-06-15', '3', '1'),
('123456', '7', '2024-10-10', '2022-06-15', '4', '1');

insert into tbl_posto_medicamento (cdg_medicamento, qtde, vencimento, data_entrada, id_medicamentoFK, id_postoFK)
value ('123456', '8', '2024-10-10', '2022-06-15', '1', '1');

insert into agendamento (data_retirada, hora, qtde_retirada, id_postofk, id_clientefk, id_posto_medicamentofk)
values('2022-06-17', '12:00', '2', '1', '1', '5');

insert into agendamento (data_retirada, hora, qtde_retirada, id_postofk, id_clientefk, id_posto_medicamentofk)
values('2022-07-17', '10:00', '5', '2', '1', '6');

insert into agendamento (data_retirada, hora, qtde_retirada, id_postofk, id_clientefk, id_posto_medicamentofk)
values('2022-06-17', '12:00', '2', '1', '1', '7');

insert into tbl_cliente (nome, rg,cpf,dt_nascimento,endereco,telefone,n_sus,email,senha,id_posto_cliFK)
value('william', '376419167','41060715848','1999-07-17','rua augusta almeida','11974650970','23567841','teste@gmail.com','102030',1);

insert into tbl_cliente (nome, rg,cpf,dt_nascimento,endereco,telefone,n_sus,email,senha,id_posto_cliFK)
value('Riclkemen', '376419167','41060715848','1999-07-17','rua augusta almeida','11974650970','23567841','teste@gmail.com','102030',1);

insert into tbl_posto_medicamento(nome_medicamento,unidade_medida,cdg_medicamento,qtde,vencimento,data_entrada,id_postoFK)
value('Amoxilina','500ml','5624186','70','2028-02-02','2023-05-17',1);

insert into tbl_posto_medicamento(nome_medicamento,unidade_medida,cdg_medicamento,qtde,vencimento,data_entrada,id_postoFK)
value('Dipirona','500ml','5624186','70','2028-02-02','2023-05-17',2);

insert into agendamento(data_retirada,hora,qtde_retirada,id_postofk,id_clientefk,id_posto_medicamentofk)
value('2023-07-07','15:05','7',1,1,1);
insert into agendamento(data_retirada,hora,qtde_retirada,id_postofk,id_clientefk,id_posto_medicamentofk)
value('2023-07-07','15:05','7',3,2,2)*/