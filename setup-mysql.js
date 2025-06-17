// MySQL Shell JavaScript 스크립트
// 데이터베이스와 사용자 생성

const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');

async function setupDatabase() {
    try {
        // MySQL 연결
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'your_password' // 실제 비밀번호로 변경 필요
        });

        console.log('MySQL에 연결되었습니다.');

        // schema.sql 파일 읽기
        const schema = await fs.readFile(path.join(__dirname, 'schema.sql'), 'utf8');

        // SQL 명령어 실행
        const statements = schema.split(';').filter(stmt => stmt.trim());
        for (const statement of statements) {
            if (statement.trim()) {
                await connection.query(statement);
            }
        }

        console.log('데이터베이스가 성공적으로 초기화되었습니다.');
        await connection.end();
    } catch (error) {
        console.error('데이터베이스 초기화 중 오류 발생:', error);
        process.exit(1);
    }
}

setupDatabase(); 