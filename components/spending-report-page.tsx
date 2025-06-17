"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  ArrowLeft,
  Download,
  TrendingUp,
  TrendingDown,
  Wallet,
  ShoppingBag,
  Home,
  Car,
  Utensils,
  Smartphone,
  HeartPulse,
  Briefcase,
} from "lucide-react"

export function SpendingReportPage() {
  const [period, setPeriod] = useState("month")
  const [month, setMonth] = useState("1")

  // 카테고리별 소비 데이터
  const categoryData = [
    { name: "식비", value: 580000, color: "#4BC0C0", icon: Utensils }, // 청록
    { name: "쇼핑", value: 420000, color: "#FF9F40", icon: ShoppingBag }, // 오렌지
    { name: "교통", value: 150000, color: "#9966FF", icon: Car }, // 보라
    { name: "주거", value: 650000, color: "#36A2EB", icon: Home }, // 파랑
    { name: "통신", value: 98000, color: "#FFCD56", icon: Smartphone }, // 노랑
    { name: "의료", value: 120000, color: "#FF6384", icon: HeartPulse }, // 핑크
    { name: "여가", value: 320000, color: "#4DA6FF", icon: Briefcase }, // 하늘색
    { name: "기타", value: 180000, color: "#C9CBCF", icon: Wallet }, // 회색
  ]

  // 월별 소비 추이 데이터
  const monthlyTrendData = [
    { month: "8월", amount: 2100000 },
    { month: "9월", amount: 2300000 },
    { month: "10월", amount: 1950000 },
    { month: "11월", amount: 2450000 },
    { month: "12월", amount: 2800000 },
    { month: "1월", amount: 2518000 },
  ]

  // 일별 소비 추이 데이터
  const dailyTrendData = [
    { day: "1", amount: 85000 },
    { day: "5", amount: 120000 },
    { day: "10", amount: 65000 },
    { day: "15", amount: 230000 },
    { day: "20", amount: 95000 },
    { day: "25", amount: 180000 },
    { day: "30", amount: 210000 },
  ]

  // 상위 소비 내역
  const topTransactions = [
    {
      id: 1,
      category: "쇼핑",
      description: "온라인 쇼핑 - 쿠팡",
      amount: 189000,
      date: "2024-01-15",
      icon: ShoppingBag,
      color: "#FF9F40",
    },
    { id: 2, category: "주거", description: "월세", amount: 650000, date: "2024-01-10", icon: Home, color: "#36A2EB" },
    {
      id: 3,
      category: "식비",
      description: "식료품 구매 - 이마트",
      amount: 125000,
      date: "2024-01-08",
      icon: Utensils,
      color: "#4BC0C0",
    },
    {
      id: 4,
      category: "여가",
      description: "영화 관람",
      amount: 45000,
      date: "2024-01-20",
      icon: Briefcase,
      color: "#4DA6FF",
    },
    {
      id: 5,
      category: "교통",
      description: "대중교통 이용",
      amount: 58000,
      date: "2024-01-25",
      icon: Car,
      color: "#9966FF",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount)
  }

  const getTotalSpending = () => {
    return categoryData.reduce((total, item) => total + item.value, 0)
  }

  const getTopCategory = () => {
    return categoryData.reduce((prev, current) => (prev.value > current.value ? prev : current))
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className="min-h-screen bg-bank-background">
      {/* 헤더 */}
      <header className="bg-bank-card border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-4">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-bank-text">소비 리포트</h1>
                <p className="text-sm text-bank-text-sub">소비 패턴 분석 및 통계</p>
              </div>
            </div>
            <Button variant="outline" className="border-bank-secondary text-bank-primary">
              <Download className="w-4 h-4 mr-2" />
              리포트 다운로드
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 기간 선택 */}
        <div className="flex flex-wrap items-center justify-between mb-6">
          <Tabs defaultValue="month" value={period} onValueChange={setPeriod} className="w-full md:w-auto">
            <TabsList className="bg-bank-background">
              <TabsTrigger value="week">주간</TabsTrigger>
              <TabsTrigger value="month">월간</TabsTrigger>
              <TabsTrigger value="quarter">분기</TabsTrigger>
              <TabsTrigger value="year">연간</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="w-full md:w-auto mt-4 md:mt-0">
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="w-[180px] border-2 border-gray-200 focus:border-bank-secondary">
                <SelectValue placeholder="월 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1월</SelectItem>
                <SelectItem value="2">2월</SelectItem>
                <SelectItem value="3">3월</SelectItem>
                <SelectItem value="4">4월</SelectItem>
                <SelectItem value="5">5월</SelectItem>
                <SelectItem value="6">6월</SelectItem>
                <SelectItem value="7">7월</SelectItem>
                <SelectItem value="8">8월</SelectItem>
                <SelectItem value="9">9월</SelectItem>
                <SelectItem value="10">10월</SelectItem>
                <SelectItem value="11">11월</SelectItem>
                <SelectItem value="12">12월</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 요약 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-bank-card shadow-lg border-0 rounded-card">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-bank-text">총 소비</h3>
                <div className="w-12 h-12 bg-bank-primary/10 rounded-full flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-bank-primary" />
                </div>
              </div>
              <p className="text-4xl font-bold text-bank-text mb-3">{formatCurrency(getTotalSpending())}원</p>
              <div className="flex items-center text-sm">
                <div className="w-6 h-6 bg-bank-accent/20 rounded-full flex items-center justify-center mr-2">
                  <TrendingUp className="w-4 h-4 text-bank-accent" />
                </div>
                <span className="text-bank-accent font-medium">전월 대비 8.5% 증가</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-bank-card shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-bank-text">최다 소비 카테고리</h3>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: getTopCategory().color }}
                >
                  {React.createElement(getTopCategory().icon, { className: "w-4 h-4 text-white" })}
                </div>
              </div>
              <p className="text-3xl font-bold text-bank-text">{getTopCategory().name}</p>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-bank-text-sub">
                  {formatCurrency(getTopCategory().value)}원 (
                  {((getTopCategory().value / getTotalSpending()) * 100).toFixed(1)}%)
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-bank-card shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-bank-text">일평균 소비</h3>
                <TrendingDown className="w-6 h-6 text-bank-danger" />
              </div>
              <p className="text-3xl font-bold text-bank-text">
                {formatCurrency(Math.round(getTotalSpending() / 30))}원
              </p>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-bank-danger">전월 대비 3.2% 감소</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 카테고리별 소비 & 소비 추이 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* 카테고리별 소비 */}
          <Card className="bg-bank-card shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-bank-text">카테고리별 소비</CardTitle>
              <CardDescription className="text-bank-text-sub">1월 소비 비율</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${formatCurrency(value)}원`, "금액"]}
                      labelFormatter={(name) => `${name}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* 범례 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 w-full">
                {categoryData.map((category) => (
                  <div key={category.name} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
                    <span className="text-sm text-bank-text-sub">{category.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 소비 추이 */}
          <Card className="bg-bank-card shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-bank-text">소비 추이</CardTitle>
              <CardDescription className="text-bank-text-sub">최근 6개월 소비 변화</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  amount: {
                    label: "소비금액",
                    color: "#4DA6FF",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#4DA6FF"
                      strokeWidth={3}
                      dot={{ fill: "#4DA6FF", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* 상위 소비 내역 */}
        <Card className="bg-bank-card shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-bank-text">상위 소비 내역</CardTitle>
            <CardDescription className="text-bank-text-sub">금액이 큰 순서대로 정렬</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-bank-background rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    {/* 카테고리 아이콘 */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: transaction.color + "30" }}
                    >
                      {React.createElement(transaction.icon, {
                        className: `w-6 h-6`,
                        style: { color: transaction.color },
                      })}
                    </div>

                    {/* 거래 정보 */}
                    <div>
                      <p className="font-medium text-bank-text">{transaction.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-bank-text-sub">
                        <span>{transaction.date}</span>
                        <span>{transaction.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* 금액 */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-bank-danger">-{formatCurrency(transaction.amount)}원</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 소비 분석 및 팁 */}
        <Card className="bg-gradient-to-r from-bank-primary/10 to-bank-secondary/10 border-bank-secondary/20 mt-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-bank-text mb-2">소비 분석 결과</h3>
                <p className="text-bank-text-sub mb-4">
                  이번 달은 주거 비용과 쇼핑 비용이 전체 소비의 약 42%를 차지했습니다.
                  <br />
                  식비는 전월 대비 12% 증가했으며, 교통비는 15% 감소했습니다.
                </p>
              </div>
              <Button className="bg-bank-primary hover:bg-bank-primary-hover text-white mt-4 md:mt-0">
                맞춤형 절약 팁 보기
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
