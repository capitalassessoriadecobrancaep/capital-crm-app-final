
-- Script inicial MySQL para criar DB e tabela de usuários
CREATE DATABASE IF NOT EXISTS capital_crm;
USE capital_crm;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO users (name, email, password) VALUES ('Administrador', 'admin@capital.com.br', '123456');
