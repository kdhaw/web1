-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS bank_db;
USE bank_db;

-- 사용자 생성 및 권한 부여
CREATE USER IF NOT EXISTS 'bank_user'@'localhost' IDENTIFIED BY 'bank_password';
GRANT ALL PRIVILEGES ON bank_db.* TO 'bank_user'@'localhost';
FLUSH PRIVILEGES; 