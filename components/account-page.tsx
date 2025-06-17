"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Eye, EyeOff, CreditCard, Wallet, PiggyBank, TrendingUp } from "lucide-react"

export function AccountPage() {
  const [showBalances, setShowBalances] = useState(true)

  const accounts = [
    {
      id: "1",
      type: "주거래",
      name: "KB Star 통장",
      number: "123-456-789012",
      balance: 5420000,
      color: "bg-gradient-to-r from-bank-primary to-bank-secondary",
      icon: Wallet,
    },
    {
      id: "2",
      type: "적금",
      name: "KB 정기적금",
      number: "987-654-321098",
      balance: 12000000,
      color: "bg-gradient-to-r from-bank-accent to-emerald-500",
      icon: PiggyBank,
    },
    {
      id: "3",
      type: "예금",
      name: "KB 정기예금",
      number: "555-777-888999",
      balance: 25000000,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      icon: TrendingUp,
    },
    {
      id: "4",
      type: "카드",
      name: "KB 체크카드",
      number: "1234-****-****-5678",
      balance: 0,
      color: "bg-gradient-to-r from-gray-600 to-gray-800",
      icon: CreditCard,
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount)
  }

  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + account.balance, 0)
  }

  return (
    <div className="min-h-screen bg-bank-background">
      {/* 헤더 */}
      <header className="bg-bank-card border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-4">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-bank-text">내 계좌</h1>
                <p className="text-sm text-bank-text-sub">계좌 현황 및 관리</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBalances(!showBalances)}
                className="text-bank-text-sub hover:text-bank-primary"
              >
                {showBalances ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </Button>
              <Button className="bg-bank-accent hover:bg-bank-accent/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                계좌 개설
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 총 자산 요약 */}
        <Card className="bg-bank-card shadow-lg border-0 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-bank-text-sub mb-1">총 보유 자산</p>
                <p className="text-3xl font-bold text-bank-text">
                  {showBalances ? `${formatCurrency(getTotalBalance())}원` : "••••••••원"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-bank-text-sub mb-1">보유 계좌</p>
                <p className="text-2xl font-bold text-bank-primary">{accounts.length}개</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 계좌 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accounts.map((account) => {
            const IconComponent = account.icon
            return (
              <Card
                key={account.id}
                className="bg-bank-card shadow-lg border-0 overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* 계좌 헤더 */}
                <div className={`${account.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <IconComponent className="w-full h-full" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="bg-white/20 text-white border-0">
                        {account.type}
                      </Badge>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{account.name}</h3>
                    <p className="text-white/80 text-sm font-mono">{account.number}</p>
                  </div>
                </div>

                {/* 계좌 정보 */}
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-bank-text-sub text-sm mb-1">{account.type === "카드" ? "한도" : "잔액"}</p>
                      <p className="text-2xl font-bold text-bank-text">
                        {showBalances ? `${formatCurrency(account.balance)}원` : "••••••••원"}
                      </p>
                    </div>

                    {/* 빠른 액션 */}
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-bank-secondary text-bank-primary hover:bg-bank-secondary/10"
                      >
                        거래내역
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-bank-accent text-bank-accent hover:bg-bank-accent/10"
                      >
                        {account.type === "카드" ? "사용내역" : "이체"}
                      </Button>
                    </div>

                    {/* 추가 정보 */}
                    {account.type === "적금" && (
                      <div className="bg-bank-background rounded-lg p-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-bank-text-sub">만기일</span>
                          <span className="text-bank-text font-medium">2024-12-31</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-bank-text-sub">금리</span>
                          <span className="text-bank-accent font-medium">3.5%</span>
                        </div>
                      </div>
                    )}

                    {account.type === "예금" && (
                      <div className="bg-bank-background rounded-lg p-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-bank-text-sub">만기일</span>
                          <span className="text-bank-text font-medium">2025-06-15</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-bank-text-sub">금리</span>
                          <span className="text-bank-accent font-medium">4.2%</span>
                        </div>
                      </div>
                    )}

                    {account.type === "카드" && (
                      <div className="bg-bank-background rounded-lg p-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-bank-text-sub">이번 달 사용</span>
                          <span className="text-bank-text font-medium">
                            {showBalances ? "1,250,000원" : "••••••원"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-bank-text-sub">결제일</span>
                          <span className="text-bank-text font-medium">매월 15일</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* 계좌 개설 안내 */}
        <Card className="bg-gradient-to-r from-bank-accent/10 to-bank-secondary/10 border-bank-accent/20 mt-8">
          <CardContent className="p-6 text-center">
            <Plus className="w-12 h-12 text-bank-accent mx-auto mb-4" />
            <h3 className="text-xl font-bold text-bank-text mb-2">새로운 계좌가 필요하신가요?</h3>
            <p className="text-bank-text-sub mb-4">다양한 금융 상품으로 더 나은 금융 생활을 시작하세요</p>
            <Button className="bg-bank-accent hover:bg-bank-accent/90 text-white">계좌 개설 상담 신청</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
