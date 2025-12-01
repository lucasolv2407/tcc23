CREATE DATABASE grc;
USE grc;

CREATE TABLE login (
ID INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(255),
email VARCHAR(255),
senha VARCHAR(255),
datacad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE funcionario (
ID INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(255),
email VARCHAR(255),
cpf_cnpj VARCHAR(14),
crm VARCHAR(6),
cargo_ID INT,
datacad timestamp default current_timestamp 
);

CREATE TABLE cargo (
ID INT auto_increment primary key,
nome VARCHAR(255),
datacad timestamp default current_timestamp
);

CREATE TABLE paciente (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(255) NOT NULL,
cpf VARCHAR(14) NOT NULL UNIQUE,
idade INT,
telefone VARCHAR(20),
genero ENUM('M', 'F', 'Outro') NOT NULL,
senha VARCHAR(255) NOT NULL,
datacad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE medico (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(255) NOT NULL,
crm VARCHAR(20) NOT NULL UNIQUE,
endereco VARCHAR(255),
funcao ENUM('admin', 'medico', 'enfermeiro', 'outro') DEFAULT 'medico',
senha VARCHAR(255) NOT NULL,
datacad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE prontuario(
	id_prontuario INT AUTO_INCREMENT PRIMARY KEY,
	id_paciente INT NOT NULL,
	id_medico INT NOT NULL,
	texto TEXT NOT NULL,
	data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_paciente) REFERENCES paciente(id)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (id_medico) REFERENCES medico(id)
		ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE vacinas(
id_vacina INT AUTO_INCREMENT PRIMARY KEY,
nome_vacina VARCHAR(100) NOT NULL,
fabricante VARCHAR(100),
doses_totais INT DEFAULT 1,
intervalo_dias INT DEFAULT NULL,
data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE consultas(
	id_consulta INT AUTO_INCREMENT PRIMARY KEY,
	cpf_paciente VARCHAR(14) NOT NULL,
	especialidade VARCHAR(255) NOT NULL,
	medico VARCHAR(255) NOT NULL,
	data_consulta DATE NOT NULL,
	hora_consulta TIME NOT NULL,
	local_sala VARCHAR(255) NOT NULL,
	motivo VARCHAR(255),
	diagnostico TEXT,
	prescricao TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	expires_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE info_add (
id_info INT AUTO_INCREMENT PRIMARY KEY,
id_prontuario INT NOT NULL,
email VARCHAR(100),
telefone_secundario VARCHAR(20),
contato_emergencia VARCHAR(100),
telefone_emergencia VARCHAR(20),
tipo_sanguineo ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
convenio VARCHAR(100),
observacoes TEXT,
FOREIGN KEY (id_prontuario) REFERENCES prontuario(id_prontuario)
ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE vacinacoes (
id_vacinacao INT AUTO_INCREMENT PRIMARY KEY,
id_prontuario INT NOT NULL,
id_vacina INT NOT NULL,
data_aplicacao DATE NOT NULL,
dose_numero INT DEFAULT 1,
profissional_aplicador VARCHAR(100),
FOREIGN KEY (id_prontuario) REFERENCES prontuario(id_prontuario)
ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_vacina) REFERENCES vacinas(id_vacina)
ON DELETE CASCADE ON UPDATE CASCADE
);