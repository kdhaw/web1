"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Bell,
  Settings,
  User,
  CreditCard,
  Send,
  Receipt,
} from "lucide-react"

export function DashboardPage() {
  const [showBalance, setShowBalance] = useState(true)

  // 샘플 데이터
  const spendingData = [
    { month: "1월", amount: 2400000 },
    { month: "2월", amount: 1800000 },
    { month: "3월", amount: 2200000 },
    { month: "4월", amount: 2800000 },
    { month: "5월", amount: 2100000 },
    { month: "6월", amount: 2600000 },
  ]

  const recentTransactions = [
    { id: 1, type: "입금", description: "급여 입금", amount: 3500000, date: "2024-01-15", status: "완료" },
    { id: 2, type: "출금", description: "온라인 쇼핑", amount: -89000, date: "2024-01-14", status: "완료" },
    { id: 3, type: "이체", description: "김철수님께 송금", amount: -500000, date: "2024-01-14", status: "완료" },
    { id: 4, type: "입금", description: "이자 입금", amount: 12500, date: "2024-01-13", status: "완료" },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(Math.abs(amount))
  }

  return (
    <div className="min-h-screen bg-bank-background">
      {/* 헤더 */}
      <header className="bg-bank-card border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-bank-primary rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-bank-text">KB 디지털뱅킹</h1>
                <p className="text-sm text-bank-text-sub">개인뱅킹</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-bank-text-sub hover:text-bank-primary">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-bank-text-sub hover:text-bank-primary">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-bank-text-sub hover:text-bank-primary">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 환영 메시지 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-bank-text mb-2">안녕하세요, 홍길동님</h2>
          <p className="text-bank-text-sub">오늘도 안전한 금융거래 되세요.</p>
        </div>

        {/* 계좌 정보 및 빠른 액션 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 주계좌 정보 */}
          <Card className="lg:col-span-2 bg-bank-card shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-bank-primary to-bank-secondary text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">KB Star 통장</CardTitle>
                  <CardDescription className="text-white/80">123-456-789012</CardDescription>
                </div>
                <CreditCard className="w-8 h-8" />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-bank-text-sub mb-1">현재 잔액</p>
                  <p className="text-3xl font-bold text-bank-text">
                    {showBalance ? `${formatCurrency(5420000)}원` : "••••••••원"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-bank-background rounded-lg p-4">
                    <p className="text-sm text-bank-text-sub">이번 달 입금</p>
                    <p className="text-lg font-semibold text-bank-accent">+{formatCurrency(3512500)}원</p>
                  </div>
                  <div className="bg-bank-background rounded-lg p-4">
                    <p className="text-sm text-bank-text-sub">이번 달 출금</p>
                    <p className="text-lg font-semibold text-bank-danger">-{formatCurrency(1289000)}원</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 빠른 액션 */}
          <Card className="bg-bank-card shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-bank-text">빠른 서비스</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-bank-primary hover:bg-bank-primary-hover text-white justify-start">
                <Send className="w-4 h-4 mr-2" />
                송금하기
              </Button>
              <Button
                variant="outline"
                className="w-full border-bank-secondary text-bank-primary hover:bg-bank-secondary/10 justify-start"
              >
                <Receipt className="w-4 h-4 mr-2" />
                거래내역
              </Button>
              <Button
                variant="outline"
                className="w-full border-bank-accent text-bank-accent hover:bg-bank-accent/10 justify-start"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                소비분석
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 소비 추이 */}
          <Card className="bg-bank-card shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-bank-text">월별 소비 추이</CardTitle>
              <CardDescription className="text-bank-text-sub">최근 6개월 소비 패턴</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  amount: {
                    label: "소비금액",
                    color: "#00C49F",
                  },
                }}
                className="h-[200px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spendingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#00C49F"
                      strokeWidth={3}
                      dot={{ fill: "#00C49F", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* 최근 이체 */}
          <Card className="bg-bank-card shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-bank-text">최근 이체 현황</CardTitle>
              <CardDescription className="text-bank-text-sub">일별 이체 금액</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  amount: {
                    label: "이체금액",
                    color: "#2A5D9F",
                  },
                }}
                className="h-[200px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={spendingData.slice(0, 4)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="amount" fill="#2A5D9F" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* 최근 거래 내역 */}
        <Card className="bg-bank-card shadow-lg border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-bank-text">최근 거래 내역</CardTitle>
                <CardDescription className="text-bank-text-sub">최근 4건의 거래 내역입니다</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-bank-secondary text-bank-primary hover:bg-bank-secondary/10"
              >
                전체 보기
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-bank-background rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "입금" ? "bg-bank-accent/20" : "bg-bank-danger/20"
                      }`}
                    >
                      {transaction.type === "입금" ? (
                        <ArrowDownLeft
                          className={`w-5 h-5 ${transaction.type === "입금" ? "text-bank-accent" : "text-bank-danger"}`}
                        />
                      ) : (
                        <ArrowUpRight
                          className={`w-5 h-5 ${transaction.type === "입금" ? "text-bank-accent" : "text-bank-danger"}`}
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-bank-text">{transaction.description}</p>
                      <p className="text-sm text-bank-text-sub">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.amount > 0 ? "text-bank-accent" : "text-bank-danger"}`}>
                      {transaction.amount > 0 ? "+" : ""}
                      {formatCurrency(transaction.amount)}원
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
