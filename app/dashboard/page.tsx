'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  TrendingUp 
} from 'lucide-react'

// 더미 데이터
const accounts = [
  { id: 1, name: '입출금통장', number: '123-456-789', balance: 5000000 },
  { id: 2, name: '저축예금', number: '987-654-321', balance: 10000000 },
]

const recentTransactions = [
  { id: 1, type: 'deposit', amount: 500000, description: '급여', date: '2024-03-15' },
  { id: 2, type: 'withdrawal', amount: 150000, description: '카드결제', date: '2024-03-14' },
  { id: 3, type: 'deposit', amount: 300000, description: '이체입금', date: '2024-03-13' },
]

export default function DashboardPage() {
  const [quickTransfer, setQuickTransfer] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
  })

  const handleQuickTransfer = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 실제 이체 API 연동
    alert('이체가 완료되었습니다.')
    setQuickTransfer({ fromAccount: '', toAccount: '', amount: '' })
  }

  return (
    <div className="flex min-h-screen bg-bank-background">
      <Navigation />
      
      <main className="flex-1 ml-64 p-8">
        <h1 className="text-2xl font-bold mb-8">대시보드</h1>

        {/* 계좌 잔액 섹션 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {accounts.map((account) => (
            <div key={account.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium">{account.name}</h3>
                  <p className="text-bank-text-sub">{account.number}</p>
                </div>
                <CreditCard className="w-6 h-6 text-bank-primary" />
              </div>
              <p className="text-2xl font-bold">
                {account.balance.toLocaleString()}원
              </p>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 최근 거래 내역 */}
          <section className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-bold mb-4">최근 거래 내역</h2>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      {transaction.type === 'deposit' ? (
                        <ArrowDownLeft className="w-6 h-6 text-bank-accent" />
                      ) : (
                        <ArrowUpRight className="w-6 h-6 text-bank-danger" />
                      )}
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-bank-text-sub">{transaction.date}</p>
                      </div>
                    </div>
                    <p
                      className={`font-medium ${
                        transaction.type === 'deposit'
                          ? 'text-bank-accent'
                          : 'text-bank-danger'
                      }`}
                    >
                      {transaction.type === 'deposit' ? '+' : '-'}
                      {transaction.amount.toLocaleString()}원
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 빠른 송금 */}
          <section>
            <div className="card">
              <h2 className="text-xl font-bold mb-4">빠른 송금</h2>
              <form onSubmit={handleQuickTransfer} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-bank-text-sub mb-1">
                    출금계좌
                  </label>
                  <select
                    className="input-field"
                    value={quickTransfer.fromAccount}
                    onChange={(e) =>
                      setQuickTransfer({ ...quickTransfer, fromAccount: e.target.value })
                    }
                    required
                  >
                    <option value="">계좌 선택</option>
                    {accounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.name} ({account.number})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-bank-text-sub mb-1">
                    입금계좌
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="계좌번호 입력"
                    value={quickTransfer.toAccount}
                    onChange={(e) =>
                      setQuickTransfer({ ...quickTransfer, toAccount: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-bank-text-sub mb-1">
                    이체금액
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="금액 입력"
                    value={quickTransfer.amount}
                    onChange={(e) =>
                      setQuickTransfer({ ...quickTransfer, amount: e.target.value })
                    }
                    required
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  이체하기
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
} 