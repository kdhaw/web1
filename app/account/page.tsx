'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import { 
  CreditCard, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft,
  ChevronRight
} from 'lucide-react'

// 더미 데이터
const accounts = [
  {
    id: 1,
    name: '입출금통장',
    number: '123-456-789',
    balance: 5000000,
    type: 'checking',
    interest: 0.1,
    transactions: [
      { id: 1, type: 'deposit', amount: 500000, description: '급여', date: '2024-03-15' },
      { id: 2, type: 'withdrawal', amount: 150000, description: '카드결제', date: '2024-03-14' },
    ]
  },
  {
    id: 2,
    name: '저축예금',
    number: '987-654-321',
    balance: 10000000,
    type: 'savings',
    interest: 3.5,
    transactions: [
      { id: 1, type: 'deposit', amount: 1000000, description: '이체입금', date: '2024-03-15' },
    ]
  },
]

export default function AccountPage() {
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null)

  const getAccountTypeLabel = (type: string) => {
    switch (type) {
      case 'checking':
        return '입출금통장'
      case 'savings':
        return '저축예금'
      default:
        return '기타'
    }
  }

  return (
    <div className="flex min-h-screen bg-bank-background">
      <Navigation />
      
      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">계좌조회</h1>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>계좌개설</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 계좌 목록 */}
          <section className="lg:col-span-1">
            <div className="card">
              <h2 className="text-xl font-bold mb-4">보유계좌</h2>
              <div className="space-y-4">
                {accounts.map((account) => (
                  <button
                    key={account.id}
                    onClick={() => setSelectedAccount(account.id)}
                    className={`w-full p-4 rounded-lg transition-colors ${
                      selectedAccount === account.id
                        ? 'bg-bank-primary text-white'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="text-left">
                        <h3 className="font-medium">{account.name}</h3>
                        <p className={`text-sm ${
                          selectedAccount === account.id ? 'text-white/80' : 'text-bank-text-sub'
                        }`}>
                          {account.number}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                    <p className={`text-right mt-2 font-bold ${
                      selectedAccount === account.id ? 'text-white' : 'text-bank-text'
                    }`}>
                      {account.balance.toLocaleString()}원
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* 계좌 상세 정보 */}
          <section className="lg:col-span-2">
            {selectedAccount ? (
              <div className="space-y-6">
                {/* 계좌 정보 카드 */}
                <div className="card">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-bold">
                        {accounts.find(a => a.id === selectedAccount)?.name}
                      </h2>
                      <p className="text-bank-text-sub">
                        {accounts.find(a => a.id === selectedAccount)?.number}
                      </p>
                    </div>
                    <CreditCard className="w-8 h-8 text-bank-primary" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-bank-text-sub mb-1">계좌종류</p>
                      <p className="font-medium">
                        {getAccountTypeLabel(accounts.find(a => a.id === selectedAccount)?.type || '')}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-bank-text-sub mb-1">이자율</p>
                      <p className="font-medium">
                        {accounts.find(a => a.id === selectedAccount)?.interest}%
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-bank-primary/5 rounded-lg">
                    <p className="text-sm text-bank-text-sub mb-1">현재 잔액</p>
                    <p className="text-2xl font-bold text-bank-primary">
                      {accounts.find(a => a.id === selectedAccount)?.balance.toLocaleString()}원
                    </p>
                  </div>
                </div>

                {/* 최근 거래 내역 */}
                <div className="card">
                  <h3 className="text-lg font-bold mb-4">최근 거래 내역</h3>
                  <div className="space-y-4">
                    {accounts
                      .find(a => a.id === selectedAccount)
                      ?.transactions.map((transaction) => (
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
              </div>
            ) : (
              <div className="card h-full flex items-center justify-center">
                <p className="text-bank-text-sub">계좌를 선택해주세요</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
} 