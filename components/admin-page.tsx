"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Users,
  CreditCard,
  Activity,
  Bell,
  Search,
  Settings,
  LogOut,
  ChevronDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Shield,
  Server,
} from "lucide-react"

export function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // 사용자 통계 데이터 (하늘색)
  const userStats = [
    { month: "8월", users: 1200 },
    { month: "9월", users: 1350 },
    { month: "10월", users: 1500 },
    { month: "11월", users: 1750 },
    { month: "12월", users: 2100 },
    { month: "1월", users: 2450 },
  ]

  // 거래 유형 데이터 (다색 구성)
  const transactionTypeData = [
    { name: "이체", value: 45, color: "#4DA6FF" }, // 하늘색
    { name: "출금", value: 30, color: "#FF6B6B" }, // 빨간색
    { name: "입금", value: 15, color: "#00C49F" }, // 청록색
    { name: "결제", value: 10, color: "#FFCD56" }, // 노란색
  ]

  // 시스템 상태 데이터
  const systemStatus = [
    { name: "API 서버", status: "정상", uptime: "99.99%", load: 42 },
    { name: "데이터베이스", status: "정상", uptime: "99.95%", load: 65 },
    { name: "인증 서버", status: "정상", uptime: "100%", load: 38 },
    { name: "결제 시스템", status: "주의", uptime: "99.85%", load: 78 },
    { name: "백업 서버", status: "정상", uptime: "99.99%", load: 25 },
  ]

  // 최근 활동 데이터
  const recentActivities = [
    {
      id: 1,
      user: "김철수",
      action: "로그인 시도 실패",
      time: "10분 전",
      status: "경고",
      ip: "123.456.789.0",
    },
    {
      id: 2,
      user: "관리자",
      action: "사용자 계정 잠금 해제",
      time: "25분 전",
      status: "정보",
      ip: "123.456.789.1",
    },
    {
      id: 3,
      user: "시스템",
      action: "데이터베이스 백업 완료",
      time: "1시간 전",
      status: "성공",
      ip: "내부",
    },
    {
      id: 4,
      user: "이영희",
      action: "비밀번호 변경",
      time: "2시간 전",
      status: "정보",
      ip: "123.456.789.2",
    },
    {
      id: 5,
      user: "시스템",
      action: "결제 시스템 지연 감지",
      time: "3시간 전",
      status: "주의",
      ip: "내부",
    },
  ]

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(num)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "경고":
        return "bg-bank-danger text-white"
      case "주의":
        return "bg-yellow-500 text-white"
      case "성공":
        return "bg-bank-accent text-white"
      case "정보":
        return "bg-bank-secondary text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getSystemStatusColor = (status: string, load: number) => {
    if (status === "주의" || load > 75) return "text-yellow-500"
    if (status === "경고" || load > 90) return "text-bank-danger"
    return "text-bank-accent"
  }

  return (
    <div className="min-h-screen bg-bank-background">
      {/* 사이드바 및 헤더 */}
      <div className="flex h-screen">
        {/* 사이드바 */}
        <div className="w-64 bg-bank-primary text-white flex flex-col">
          {/* 로고 */}
          <div className="p-6 flex items-center space-x-3 border-b border-white/10">
            <Shield className="w-8 h-8" />
            <div>
              <h1 className="font-bold text-lg">KB 관리자</h1>
              <p className="text-xs text-white/70">시스템 관리 콘솔</p>
            </div>
          </div>

          {/* 메뉴 */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-white hover:bg-white/10 ${
                    activeTab === "overview" ? "bg-white/10" : ""
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  <Activity className="w-5 h-5 mr-3" />
                  대시보드
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-white hover:bg-white/10 ${
                    activeTab === "users" ? "bg-white/10" : ""
                  }`}
                  onClick={() => setActiveTab("users")}
                >
                  <Users className="w-5 h-5 mr-3" />
                  사용자 관리
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-white hover:bg-white/10 ${
                    activeTab === "transactions" ? "bg-white/10" : ""
                  }`}
                  onClick={() => setActiveTab("transactions")}
                >
                  <CreditCard className="w-5 h-5 mr-3" />
                  거래 관리
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-white hover:bg-white/10 ${
                    activeTab === "system" ? "bg-white/10" : ""
                  }`}
                  onClick={() => setActiveTab("system")}
                >
                  <Server className="w-5 h-5 mr-3" />
                  시스템 상태
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-white hover:bg-white/10 ${
                    activeTab === "settings" ? "bg-white/10" : ""
                  }`}
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  설정
                </Button>
              </li>
            </ul>
          </nav>

          {/* 하단 메뉴 */}
          <div className="p-4 border-t border-white/10">
            <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
              <LogOut className="w-5 h-5 mr-3" />
              로그아웃
            </Button>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* 헤더 */}
          <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="px-6 py-4 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-bank-text">관리자 대시보드</h1>
                <p className="text-sm text-bank-text-sub">시스템 현황 및 통계</p>
              </div>

              <div className="flex items-center space-x-4">
                {/* 검색 */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-bank-text-sub" />
                  <Input
                    placeholder="검색..."
                    className="pl-10 w-64 border-2 border-gray-200 focus:border-bank-secondary"
                  />
                </div>

                {/* 알림 */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-bank-danger rounded-full"></span>
                </Button>

                {/* 사용자 */}
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-bank-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">관</span>
                  </div>
                  <span>관리자</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* 메인 콘텐츠 영역 */}
          <main className="flex-1 overflow-auto p-6">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 bg-bank-background">
                <TabsTrigger value="overview">개요</TabsTrigger>
                <TabsTrigger value="users">사용자</TabsTrigger>
                <TabsTrigger value="transactions">거래</TabsTrigger>
                <TabsTrigger value="system">시스템</TabsTrigger>
                <TabsTrigger value="settings">설정</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* 통계 카드 - 기획서 색상에 맞춤 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* 가입자: 하늘색 */}
                  <Card className="bg-gradient-to-br from-bank-secondary to-blue-500 text-white shadow-lg border-0 rounded-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">총 사용자</h3>
                        <Users className="w-6 h-6" />
                      </div>
                      <p className="text-3xl font-bold">{formatNumber(2450)}</p>
                      <div className="flex items-center mt-2 text-sm">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span>전월 대비 16.7% 증가</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 총 거래량: 청록 */}
                  <Card className="bg-gradient-to-br from-bank-accent to-emerald-500 text-white shadow-lg border-0 rounded-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">총 거래량</h3>
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <p className="text-3xl font-bold">{formatNumber(18543)}</p>
                      <div className="flex items-center mt-2 text-sm">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span>전월 대비 8.3% 증가</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 최근 활동: 보라색 계열 */}
                  <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg border-0 rounded-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">활성 세션</h3>
                        <Activity className="w-6 h-6" />
                      </div>
                      <p className="text-3xl font-bold">{formatNumber(342)}</p>
                      <div className="flex items-center mt-2 text-sm">
                        <span>현재 활성 사용자</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-lg border-0 rounded-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">시스템 알림</h3>
                        <Bell className="w-6 h-6" />
                      </div>
                      <p className="text-3xl font-bold">3</p>
                      <div className="flex items-center mt-2 text-sm">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        <span>주의 필요</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* 차트 섹션 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 사용자 추이 (하늘색) */}
                  <Card className="bg-bank-card shadow-lg border-0 rounded-card">
                    <CardHeader>
                      <CardTitle className="text-bank-text">사용자 추이</CardTitle>
                      <CardDescription className="text-bank-text-sub">최근 6개월 가입자 수</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          users: {
                            label: "가입자 수",
                            color: "#4DA6FF", // 하늘색
                          },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={userStats}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" stroke="#6B7280" />
                            <YAxis stroke="#6B7280" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                              type="monotone"
                              dataKey="users"
                              stroke="#4DA6FF"
                              strokeWidth={3}
                              dot={{ fill: "#4DA6FF", strokeWidth: 2, r: 4 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  {/* 거래 유형 (다색 구성) */}
                  <Card className="bg-bank-card shadow-lg border-0 rounded-card">
                    <CardHeader>
                      <CardTitle className="text-bank-text">거래 유형 비율</CardTitle>
                      <CardDescription className="text-bank-text-sub">거래 유형별 분포</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <div className="w-full h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={transactionTypeData}
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {transactionTypeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => [`${value}%`, "비율"]} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      {/* 범례 */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 w-full">
                        {transactionTypeData.map((type) => (
                          <div key={type.name} className="flex items-center">
                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: type.color }}></div>
                            <span className="text-sm text-bank-text-sub">
                              {type.name} ({type.value}%)
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* 시스템 상태 및 최근 활동 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 시스템 상태 */}
                  <Card className="bg-bank-card shadow-lg border-0 rounded-card">
                    <CardHeader>
                      <CardTitle className="text-bank-text">시스템 상태</CardTitle>
                      <CardDescription className="text-bank-text-sub">주요 시스템 상태 및 부하</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {systemStatus.map((system) => (
                          <div key={system.name} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {system.status === "정상" ? (
                                  <CheckCircle className="w-4 h-4 text-bank-accent mr-2" />
                                ) : (
                                  <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
                                )}
                                <span className="font-medium text-bank-text">{system.name}</span>
                              </div>
                              <Badge
                                className={
                                  system.status === "정상" ? "bg-bank-accent text-white" : "bg-yellow-500 text-white"
                                }
                              >
                                {system.status}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-bank-text-sub">가동률: {system.uptime}</span>
                              <span className={`font-medium ${getSystemStatusColor(system.status, system.load)}`}>
                                부하: {system.load}%
                              </span>
                            </div>
                            <Progress
                              value={system.load}
                              className={`h-2 ${
                                system.load > 75 ? "bg-yellow-100" : system.load > 90 ? "bg-red-100" : "bg-green-100"
                              }`}
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 최근 활동 */}
                  <Card className="bg-bank-card shadow-lg border-0 rounded-card">
                    <CardHeader>
                      <CardTitle className="text-bank-text">최근 활동</CardTitle>
                      <CardDescription className="text-bank-text-sub">시스템 및 사용자 활동 로그</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-center justify-between p-3 bg-bank-background rounded-lg"
                          >
                            <div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                                <p className="font-medium text-bank-text">{activity.action}</p>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-bank-text-sub mt-1">
                                <span>사용자: {activity.user}</span>
                                <span>IP: {activity.ip}</span>
                              </div>
                            </div>
                            <span className="text-sm text-bank-text-sub">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="users" className="space-y-6">
                <Card className="bg-bank-card shadow-lg border-0 rounded-card">
                  <CardHeader>
                    <CardTitle className="text-bank-text">사용자 관리</CardTitle>
                    <CardDescription className="text-bank-text-sub">
                      이 탭에서는 사용자 관리 기능을 제공합니다.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-bank-text-sub">사용자 관리 콘텐츠가 여기에 표시됩니다.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-6">
                <Card className="bg-bank-card shadow-lg border-0 rounded-card">
                  <CardHeader>
                    <CardTitle className="text-bank-text">거래 관리</CardTitle>
                    <CardDescription className="text-bank-text-sub">
                      이 탭에서는 거래 관리 기능을 제공합니다.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-bank-text-sub">거래 관리 콘텐츠가 여기에 표시됩니다.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="system" className="space-y-6">
                <Card className="bg-bank-card shadow-lg border-0 rounded-card">
                  <CardHeader>
                    <CardTitle className="text-bank-text">시스템 상태</CardTitle>
                    <CardDescription className="text-bank-text-sub">
                      이 탭에서는 시스템 상태 모니터링 기능을 제공합니다.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-bank-text-sub">시스템 상태 콘텐츠가 여기에 표시됩니다.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card className="bg-bank-card shadow-lg border-0 rounded-card">
                  <CardHeader>
                    <CardTitle className="text-bank-text">설정</CardTitle>
                    <CardDescription className="text-bank-text-sub">
                      이 탭에서는 시스템 설정 기능을 제공합니다.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-bank-text-sub">설정 콘텐츠가 여기에 표시됩니다.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}
