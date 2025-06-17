// DOM 요소
const transferForm = document.getElementById('transferForm');
const logoutBtn = document.querySelector('.logout-btn');

// 이체 폼 제출 처리
transferForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fromAccount = document.getElementById('fromAccount').value;
    const toAccount = document.getElementById('toAccount').value;
    const amount = document.getElementById('amount').value;

    try {
        const response = await fetch('/api/transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fromAccount,
                toAccount,
                amount: parseFloat(amount)
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('이체가 성공적으로 완료되었습니다.');
            transferForm.reset();
            // 거래 내역 새로고침
            loadTransactions();
        } else {
            alert(data.message || '이체 중 오류가 발생했습니다.');
        }
    } catch (error) {
        console.error('이체 처리 중 오류:', error);
        alert('이체 처리 중 오류가 발생했습니다.');
    }
});

// 거래 내역 로드
async function loadTransactions() {
    try {
        const response = await fetch('/api/transactions');
        const transactions = await response.json();
        
        const transactionList = document.querySelector('.transaction-list');
        transactionList.innerHTML = transactions.map(transaction => `
            <div class="transaction-item ${transaction.type}">
                <div class="transaction-info">
                    <span class="transaction-icon">${transaction.type === 'deposit' ? '↓' : '↑'}</span>
                    <div>
                        <p class="transaction-desc">${transaction.description}</p>
                        <p class="transaction-date">${new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                </div>
                <p class="transaction-amount ${transaction.type}">
                    ${transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}원
                </p>
            </div>
        `).join('');
    } catch (error) {
        console.error('거래 내역 로드 중 오류:', error);
    }
}

// 로그아웃 처리
logoutBtn.addEventListener('click', () => {
    if (confirm('로그아웃 하시겠습니까?')) {
        window.location.href = '/login.html';
    }
});

// 페이지 로드 시 거래 내역 로드
document.addEventListener('DOMContentLoaded', () => {
    loadTransactions();
}); 