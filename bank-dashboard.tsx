"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Eye, EyeOff, Bell, Settings, User, ArrowUpRight, ArrowDownLeft, Building2 } from "lucide-react"

export default function Component() {
  const [showBalance, setShowBalance] = useState(true)
  const [transferAmount, setTransferAmount] = useState("")
  const [recipientAccount, setRecipientAccount] = useState("")

  const recentTransactions = [
    {
      id: "1",
      type: "입금",
      description: "급여 입금",
      amount: 3500000,
      date: "2024-01-15",
      time: "09:30",
      balance: 5420000,
      status: "완료",
    },
    {
      id: "2",
      type: "출금",
      description: "온라인 쇼핑",
      amount: -89000,
      date: "2024-01-14",
      time: "14:22",
      balance: 1920000,
      status: "완료",
    },
    {
      id: "3",
      type: "이체",
      description: "김철수님께 송금",
      amount: -500000,
      date: "2024-01-14",
      time: "11:15",
      balance: 2009000,
      status: "완료",
    },
    {
      id: "4",
      type: "입금",
      description: "이자 입금",
      amount: 12500,
      date: "2024-01-13",
      time: "00:01",
      balance: 2509000,
      status: "완료",
    },
    {
      id: "5",
      type: "출금",
      description: "ATM 출금",
      amount: -200000,
      date: "2024-01-12",
      time: "16:45",
      balance: 2496500,
      status: "완료",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(Math.abs(amount))
  }

  const handleTransfer = () => {
    if (transferAmount && recipientAccount) {
      alert(`${recipientAccount}번 계좌로 ${formatCurrency(Number.parseInt(transferAmount))}원 송금이 요청되었습니다.`)
      setTransferAmount("")
      setRecipientAccount("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">KB국민은행</h1>
                <p className="text-sm text-gray-500">개인뱅킹</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">안녕하세요, 홍길동님</h2>
          <p className="text-gray-600">오늘도 안전한 금융거래 되세요.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Account Balance Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">주거래 통장</CardTitle>
                  <CardDescription>KB Star 통장 • 123-456-789012</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowBalance(!showBalance)}>
                  {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">현재 잔액</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {showBalance ? `${formatCurrency(5420000)}원` : "••••••••원"}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">이번 달 입금</p>
                    <p className="text-lg font-semibold text-green-600">+{formatCurrency(3512500)}원</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">이번 달 출금</p>
                    <p className="text-lg font-semibold text-red-600">-{formatCurrency(1289000)}원</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Transfer Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="h-5 w-5" />
                <span>빠른 송금</span>
              </CardTitle>
              <CardDescription>간편하게 송금하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">받는 분 계좌번호</Label>
                <Input
                  id="recipient"
                  placeholder="계좌번호를 입력하세요"
                  value={recipientAccount}
                  onChange={(e) => setRecipientAccount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bank">은행 선택</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="은행을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kb">KB국민은행</SelectItem>
                    <SelectItem value="shinhan">신한은행</SelectItem>
                    <SelectItem value="woori">우리은행</SelectItem>
                    <SelectItem value="hana">하나은행</SelectItem>
                    <SelectItem value="nh">농협은행</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">송금 금액</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="금액을 입력하세요"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                />
              </div>
              <Button className="w-full" onClick={handleTransfer} disabled={!transferAmount || !recipientAccount}>
                송금하기
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>최근 거래 내역</CardTitle>
                <CardDescription>최근 5건의 거래 내역입니다</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                전체 보기
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>거래일시</TableHead>
                  <TableHead>거래구분</TableHead>
                  <TableHead>거래내용</TableHead>
                  <TableHead className="text-right">거래금액</TableHead>
                  <TableHead className="text-right">잔액</TableHead>
                  <TableHead>상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.date}</div>
                        <div className="text-sm text-gray-500">{transaction.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {transaction.type === "입금" ? (
                          <ArrowDownLeft className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-red-600" />
                        )}
                        <span>{transaction.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="text-right">
                      <span className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                        {transaction.amount > 0 ? "+" : ""}
                        {formatCurrency(transaction.amount)}원
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(transaction.balance)}원</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{transaction.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
