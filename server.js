require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

const app = express();

// 미들웨어 설정
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));
app.use(compression());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rate limiting 설정
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15분
    max: 100 // IP당 최대 요청 수
});
app.use('/api/', limiter);

// 데이터베이스 연결
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// JWT 토큰 검증 미들웨어
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: '인증이 필요합니다.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
        }
        req.user = user;
        next();
    });
};

// 회원가입
app.post('/api/signup', async (req, res) => {
    const { username, password, name, email } = req.body;

    try {
        // 비밀번호 해시화
        const hashedPassword = await bcrypt.hash(password, 10);

        // 사용자 생성
        const [result] = await pool.query(
            'INSERT INTO users (username, password, name, email) VALUES (?, ?, ?, ?)',
            [username, hashedPassword, name, email]
        );

        res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    } catch (error) {
        console.error('회원가입 오류:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ message: '이미 사용 중인 아이디 또는 이메일입니다.' });
        } else {
            res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        }
    }
});

// 로그인
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        
        if (users.length === 0) {
            return res.status(401).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
        }

        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('로그인 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 사용자 정보 조회
app.get('/api/user/info', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT id, username, name, email FROM users WHERE id = ?',
            [req.user.id]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('사용자 정보 조회 중 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 로그아웃
app.post('/api/logout', (req, res) => {
    res.json({ message: '로그아웃되었습니다.' });
});

// 계좌 목록 조회
app.get('/api/accounts', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM accounts WHERE user_id = ?', [req.user.id]);
        res.json(rows);
    } catch (error) {
        console.error('계좌 목록 조회 중 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 새 계좌 생성
app.post('/api/accounts', authenticateToken, async (req, res) => {
    try {
        const accountNumber = generateAccountNumber();
        const [result] = await pool.query(
            'INSERT INTO accounts (user_id, account_number, account_type, balance) VALUES (?, ?, ?, ?)',
            [req.user.id, accountNumber, '입출금', 0]
        );
        
        res.json({
            success: true,
            accountId: result.insertId,
            accountNumber: accountNumber
        });
    } catch (error) {
        console.error('계좌 생성 중 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 입금
app.post('/api/accounts/deposit', authenticateToken, async (req, res) => {
    const { accountNumber, amount } = req.body;
    
    if (!accountNumber || !amount || amount <= 0) {
        return res.status(400).json({ message: '유효하지 않은 요청입니다.' });
    }

    try {
        // 계좌 존재 여부 확인
        const [accounts] = await pool.query(
            'SELECT * FROM accounts WHERE account_number = ? AND user_id = ?',
            [accountNumber, req.user.id]
        );

        if (accounts.length === 0) {
            return res.status(404).json({ message: '계좌를 찾을 수 없습니다.' });
        }

        // 입금 처리
        await pool.query(
            'UPDATE accounts SET balance = balance + ? WHERE account_number = ?',
            [amount, accountNumber]
        );

        // 거래 내역 기록
        await pool.query(
            'INSERT INTO transactions (account_id, type, amount, description) VALUES (?, ?, ?, ?)',
            [accounts[0].id, 'deposit', amount, '입금']
        );

        res.json({ success: true });
    } catch (error) {
        console.error('입금 처리 중 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 출금
app.post('/api/accounts/withdraw', authenticateToken, async (req, res) => {
    const { accountNumber, amount } = req.body;
    
    if (!accountNumber || !amount || amount <= 0) {
        return res.status(400).json({ message: '유효하지 않은 요청입니다.' });
    }

    try {
        // 계좌 존재 여부 확인
        const [accounts] = await pool.query(
            'SELECT * FROM accounts WHERE account_number = ? AND user_id = ?',
            [accountNumber, req.user.id]
        );

        if (accounts.length === 0) {
            return res.status(404).json({ message: '계좌를 찾을 수 없습니다.' });
        }

        // 잔액 확인
        if (accounts[0].balance < amount) {
            return res.status(400).json({ message: '잔액이 부족합니다.' });
        }

        // 출금 처리
        await pool.query(
            'UPDATE accounts SET balance = balance - ? WHERE account_number = ?',
            [amount, accountNumber]
        );

        // 거래 내역 기록
        await pool.query(
            'INSERT INTO transactions (account_id, type, amount, description) VALUES (?, ?, ?, ?)',
            [accounts[0].id, 'withdraw', amount, '출금']
        );

        res.json({ success: true });
    } catch (error) {
        console.error('출금 처리 중 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 계좌 이체
app.post('/api/transfer', authenticateToken, async (req, res) => {
    const { fromAccount, toAccount, amount, description } = req.body;
    
    if (!fromAccount || !toAccount || !amount || amount <= 0) {
        return res.status(400).json({ message: '유효하지 않은 요청입니다.' });
    }

    try {
        // 출금 계좌 확인
        const [fromAccounts] = await pool.query(
            'SELECT * FROM accounts WHERE account_number = ? AND user_id = ?',
            [fromAccount, req.user.id]
        );

        if (fromAccounts.length === 0) {
            return res.status(404).json({ message: '출금 계좌를 찾을 수 없습니다.' });
        }

        // 잔액 확인
        if (fromAccounts[0].balance < amount) {
            return res.status(400).json({ message: '잔액이 부족합니다.' });
        }

        // 입금 계좌 확인
        const [toAccounts] = await pool.query(
            'SELECT * FROM accounts WHERE account_number = ?',
            [toAccount]
        );

        if (toAccounts.length === 0) {
            return res.status(404).json({ message: '입금 계좌를 찾을 수 없습니다.' });
        }

        // 이체 처리
        await pool.query('START TRANSACTION');

        try {
            // 출금
            await pool.query(
                'UPDATE accounts SET balance = balance - ? WHERE account_number = ?',
                [amount, fromAccount]
            );

            // 입금
            await pool.query(
                'UPDATE accounts SET balance = balance + ? WHERE account_number = ?',
                [amount, toAccount]
            );

            // 거래 내역 기록 (출금)
            await pool.query(
                'INSERT INTO transactions (account_id, type, amount, description) VALUES (?, ?, ?, ?)',
                [fromAccounts[0].id, 'transfer_out', amount, description || '계좌 이체 출금']
            );

            // 거래 내역 기록 (입금)
            await pool.query(
                'INSERT INTO transactions (account_id, type, amount, description) VALUES (?, ?, ?, ?)',
                [toAccounts[0].id, 'transfer_in', amount, description || '계좌 이체 입금']
            );

            await pool.query('COMMIT');
            res.json({ success: true });
        } catch (error) {
            await pool.query('ROLLBACK');
            throw error;
        }
    } catch (error) {
        console.error('이체 처리 중 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 거래 내역 조회
app.get('/api/transactions', authenticateToken, async (req, res) => {
    const { account, type } = req.query;
    
    try {
        let query = `
            SELECT t.*, a.account_number 
            FROM transactions t
            JOIN accounts a ON t.account_id = a.id
            WHERE a.user_id = ?
        `;
        const params = [req.user.id];

        if (account) {
            query += ' AND a.account_number = ?';
            params.push(account);
        }

        if (type) {
            if (type === 'transfer') {
                query += ' AND (t.type = ? OR t.type = ?)';
                params.push('transfer_in', 'transfer_out');
            } else {
                query += ' AND t.type = ?';
                params.push(type);
            }
        }

        query += ' ORDER BY t.created_at DESC';

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error('거래 내역 조회 중 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 계좌번호 생성 함수
function generateAccountNumber() {
    const prefix = '1000';
    const random = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    return prefix + random;
}

// 404 에러 처리
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// 에러 핸들러
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
});

// 서버 시작
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';  // 모든 IP에서 접속 가능하도록 설정

app.listen(PORT, HOST, () => {
    const localIP = getLocalIP();
    console.log(`서버가 실행 중입니다:`);
    console.log(`- 로컬 접속: http://localhost:${PORT}`);
    console.log(`- 네트워크 접속: http://${localIP}:${PORT}`);
});

// 로컬 IP 주소 가져오기
function getLocalIP() {
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    const results = {};

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // IPv4이고 내부 주소가 아닌 경우만 선택
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }

    // 첫 번째 사용 가능한 IP 주소 반환
    for (const name of Object.keys(results)) {
        if (results[name].length > 0) {
            return results[name][0];
        }
    }

    return 'localhost';
} 