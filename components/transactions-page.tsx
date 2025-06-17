"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ArrowLeft, Search, Filter, Download, ArrowUpRight, ArrowDownLeft, CalendarIcon } from "lucide-react"

export function TransactionsPage() {
  const [selectedAccount, setSelectedAccount] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})

  // 샘플 거래 데이터
  const transactions = [
    {
      id: "1",
      date: "2024-01-15",
      time: "14:30",
      type: "입금",
      description: "급여 입금",
      amount: 3500000,
      balance: 5420000,
      account: "KB Star 통장",
      category: "급여",
      status: "완료",
    },
    {
      id: "2",
      date: "2024-01-14",
      time: "16:22",
      type: "출금",
      description: "온라인 쇼핑 - 쿠팡",
      amount: -89000,
      balance: 1920000,
      account: "KB Star 통장",
      category: "쇼핑",
      status: "완료",
    },
    {
      id: "3",
      date: "2024-01-14",
      time: "11:15",
      type: "이체",
      description: "김철수님께 송금",
      amount: -500000,
      balance: 2009000,
      account: "KB Star 통장",
      category: "이체",
      status: "완료",
    },
    {
      id: "4",
      date: "2024-01-13",
      time: "09:45",
      type: "출금",
      description: "ATM 출금 - 강남역",
      amount: -200000,
      balance: 2509000,
      account: "KB Star 통장",
      category: "현금인출",
      status: "완료",
    },
    {
      id: "5",
      date: "2024-01-12",
      time: "18:30",
      type: "출금",
      description: "카페 결제 - 스타벅스",
      amount: -6500,
      balance: 2709000,
      account: "KB Star 통장",
      category: "식음료",
      status: "완료",
    },
    {
      id: "6",
      date: "2024-01-12",
      time: "12:00",
      type: "입금",
      description: "이자 입금",
      amount: 12500,
      balance: 2715500,
      account: "KB Star 통장",
      category: "이자",
      status: "완료",
    },
  ]

  // 일별 거래 통계 데이터 (기본 블루 → hover 시 포인트 컬러)
  const dailyStats = [
    { date: "1/10", income: 0, expense: 45000 },
    { date: "1/11", income: 12500, expense: 120000 },
    { date: "1/12", income: 0, expense: 206500 },
    { date: "1/13", income: 0, expense: 200000 },
    { date: "1/14", income: 0, expense: 589000 },
    { date: "1/15", income: 3500000, expense: 0 },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(Math.abs(amount))
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      급여: "bg-bank-accent text-white", // 청록색
      이자: "bg-bank-accent text-white", // 청록색 (입금 계열)
      쇼핑: "bg-purple-500 text-white",
      식음료: "bg-orange-500 text-white",
      이체: "bg-bank-secondary text-white", // 하늘색
      현금인출: "bg-gray-500 text-white",
    }
    return colors[category] || "bg-gray-400 text-white"
  }

  const getTransactionBadgeColor = (type: string) => {
    return type === "입금" ? "bg-bank-accent text-white" : "bg-bank-danger text-white"
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesAccount = selectedAccount === "all" || transaction.account.includes(selectedAccount)
    const matchesType = selectedType === "all" || transaction.type === selectedType
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesAccount && matchesType && matchesSearch
  })

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
                <h1 className="text-xl font-bold text-bank-text">거래 내역</h1>
                <p className="text-sm text-bank-text-sub">계좌별 거래 현황 및 분석</p>
              </div>
            </div>
            <Button variant="outline" className="border-bank-secondary text-bank-primary hover:bg-bank-secondary/10">
              <Download className="w-4 h-4 mr-2" />
              내역 다운로드
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 거래 통계 차트 */}
        <Card className="bg-bank-card shadow-lg border-0 rounded-card mb-8">
          <CardHeader>
            <CardTitle className="text-bank-text">일별 거래 현황</CardTitle>
            <CardDescription className="text-bank-text-sub">최근 7일간 입출금 현황</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                income: {
                  label: "입금",
                  color: "#00C49F", // 청록색
                },
                expense: {
                  label: "출금",
                  color: "#2A5D9F", // 기본 블루
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="income"
                    fill="#00C49F"
                    radius={[4, 4, 0, 0]}
                    className="hover:fill-bank-accent/80 transition-colors"
                  />
                  <Bar
                    dataKey="expense"
                    fill="#2A5D9F"
                    radius={[4, 4, 0, 0]}
                    className="hover:fill-bank-secondary transition-colors"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* 필터 및 검색 - 라운드 모양 개선 */}
        <Card className="bg-bank-card shadow-lg border-0 rounded-card mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* 계좌 선택 - 라운드 셀렉트 박스 */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-bank-text">계좌</label>
                <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                  <SelectTrigger className="border-2 border-gray-200 focus:border-bank-secondary rounded-full h-12 px-4">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 계좌</SelectItem>
                    <SelectItem value="KB Star">KB Star 통장</SelectItem>
                    <SelectItem value="KB 적금">KB 적금통장</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 거래 유형 - 라운드 셀렉트 박스 */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-bank-text">거래 유형</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="border-2 border-gray-200 focus:border-bank-secondary rounded-full h-12 px-4">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="입금">입금</SelectItem>
                    <SelectItem value="출금">출금</SelectItem>
                    <SelectItem value="이체">이체</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 기간 선택 - 라운드 버튼 */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-bank-text">기간</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal border-2 border-gray-200 hover:border-bank-secondary rounded-full h-12 px-4"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      기간 선택
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="range" numberOfMonths={2} />
                  </PopoverContent>
                </Popover>
              </div>

              {/* 검색 - 라운드 입력창 */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-bank-text">검색</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-bank-text-sub" />
                  <Input
                    placeholder="거래 내용 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 border-gray-200 focus:border-bank-secondary rounded-full h-12"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 거래 내역 목록 */}
        <Card className="bg-bank-card shadow-lg border-0 rounded-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-bank-text">거래 내역</CardTitle>
                <CardDescription className="text-bank-text-sub">
                  총 {filteredTransactions.length}건의 거래 내역
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="border-bank-secondary text-bank-primary rounded-full">
                <Filter className="w-4 h-4 mr-2" />
                상세 필터
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-6 bg-bank-background rounded-card hover:shadow-md transition-all duration-200 border border-transparent hover:border-bank-secondary/20"
                >
                  <div className="flex items-center space-x-4">
                    {/* 거래 아이콘 */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        transaction.amount > 0 ? "bg-bank-accent/20" : "bg-bank-danger/20"
                      }`}
                    >
                      {transaction.amount > 0 ? (
                        <ArrowDownLeft className="w-6 h-6 text-bank-accent" />
                      ) : (
                        <ArrowUpRight className="w-6 h-6 text-bank-danger" />
                      )}
                    </div>

                    {/* 거래 정보 */}
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <p className="font-semibold text-bank-text text-base">{transaction.description}</p>
                        <Badge className={`text-xs rounded-full ${getCategoryColor(transaction.category)}`}>
                          {transaction.category}
                        </Badge>
                        <Badge className={`text-xs rounded-full ${getTransactionBadgeColor(transaction.type)}`}>
                          {transaction.type}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-bank-text-sub">
                        <span className="font-medium">{transaction.date}</span>
                        <span>{transaction.time}</span>
                        <span>{transaction.account}</span>
                      </div>
                    </div>
                  </div>

                  {/* 금액 및 잔액 */}
                  <div className="text-right">
                    <p
                      className={`text-xl font-bold mb-1 ${transaction.amount > 0 ? "text-bank-accent" : "text-bank-danger"}`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {formatCurrency(transaction.amount)}원
                    </p>
                    <p className="text-sm text-bank-text-sub">잔액 {formatCurrency(transaction.balance)}원</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 더 보기 버튼 */}
            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="border-bank-secondary text-bank-primary hover:bg-bank-secondary/10 rounded-full px-8 py-3"
              >
                더 많은 내역 보기
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
