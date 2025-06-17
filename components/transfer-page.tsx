"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send, AlertCircle, CheckCircle, Wallet } from "lucide-react"

export function TransferPage() {
  const [transferData, setTransferData] = useState({
    fromAccount: "",
    toBank: "",
    toAccount: "",
    amount: "",
    memo: "",
    recipientName: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [step, setStep] = useState(1) // 1: 입력, 2: 확인, 3: 완료
  const [isLoading, setIsLoading] = useState(false)

  const myAccounts = [
    { id: "123-456-789012", name: "KB Star 통장", balance: 5420000 },
    { id: "987-654-321098", name: "KB 적금통장", balance: 12000000 },
  ]

  const banks = [
    { code: "kb", name: "KB국민은행" },
    { code: "shinhan", name: "신한은행" },
    { code: "woori", name: "우리은행" },
    { code: "hana", name: "하나은행" },
    { code: "nh", name: "농협은행" },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount)
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!transferData.fromAccount) newErrors.fromAccount = "출금 계좌를 선택해주세요"
    if (!transferData.toBank) newErrors.toBank = "입금 은행을 선택해주세요"
    if (!transferData.toAccount) newErrors.toAccount = "입금 계좌번호를 입력해주세요"
    if (!transferData.amount) newErrors.amount = "이체 금액을 입력해주세요"
    if (!transferData.recipientName) newErrors.recipientName = "받는 분 성함을 입력해주세요"

    const amount = Number.parseInt(transferData.amount.replace(/,/g, ""))
    if (amount <= 0) newErrors.amount = "올바른 금액을 입력해주세요"
    if (amount > 5420000) newErrors.amount = "잔액이 부족합니다"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      setStep(2)
    }
  }

  const handleTransfer = () => {
    setIsLoading(true)
    // 이체 처리 시뮬레이션
    setTimeout(() => {
      setIsLoading(false)
      setStep(3)
    }, 2000)
  }

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "")
    const formattedValue = numericValue ? formatCurrency(Number.parseInt(numericValue)) : ""
    setTransferData({ ...transferData, amount: formattedValue })
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-bank-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-bank-card shadow-lg border-0">
          <CardContent className="text-center py-8">
            <div className="w-16 h-16 bg-bank-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-bank-text mb-2">이체 완료</h2>
            <p className="text-bank-text-sub mb-6">
              {transferData.recipientName}님께
              <br />
              {transferData.amount}원이 성공적으로 이체되었습니다.
            </p>
            <div className="space-y-2 mb-6">
              <Button className="w-full bg-bank-primary hover:bg-bank-primary-hover text-white">거래내역 확인</Button>
              <Button variant="outline" className="w-full border-bank-secondary text-bank-primary">
                대시보드로 돌아가기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const transferAmount = transferData.amount
  const recipientAccount = transferData.toAccount

  return (
    <div className="min-h-screen bg-bank-background">
      {/* 헤더 */}
      <header className="bg-bank-card border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" size="icon" className="mr-4">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-bank-text">계좌이체</h1>
              <p className="text-sm text-bank-text-sub">{step === 1 ? "이체 정보 입력" : "이체 정보 확인"}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 1 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 이체 정보 입력 */}
            <Card className="lg:col-span-2 bg-bank-card shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-bank-text flex items-center">
                  <Send className="w-5 h-5 mr-2" />
                  이체 정보 입력
                </CardTitle>
                <CardDescription className="text-bank-text-sub">정확한 정보를 입력해주세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 출금 계좌 */}
                <div className="space-y-3">
                  <Label className="text-bank-text font-semibold text-base">출금 계좌</Label>
                  <Select
                    value={transferData.fromAccount}
                    onValueChange={(value) => setTransferData({ ...transferData, fromAccount: value })}
                  >
                    <SelectTrigger
                      className={`border-3 py-4 rounded-input transition-all duration-200 ${
                        errors.fromAccount
                          ? "border-bank-danger animate-shake bg-red-50"
                          : transferData.fromAccount
                            ? "border-bank-primary bg-bank-primary/5 shadow-md" // 선택된 경우 강조
                            : "border-gray-200 focus:border-bank-secondary"
                      }`}
                    >
                      <SelectValue placeholder="출금할 계좌를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {myAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          <div className="flex justify-between items-center w-full">
                            <span className="font-medium">{account.name}</span>
                            <span className="text-bank-text-sub ml-4">{formatCurrency(account.balance)}원</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.fromAccount && (
                    <p className="text-bank-danger text-sm font-medium animate-fade-in bg-red-50 py-2 px-3 rounded-input">
                      {errors.fromAccount}
                    </p>
                  )}
                </div>

                {/* 입금 은행 */}
                <div className="space-y-2">
                  <Label className="text-bank-text font-medium">입금 은행</Label>
                  <Select
                    value={transferData.toBank}
                    onValueChange={(value) => setTransferData({ ...transferData, toBank: value })}
                  >
                    <SelectTrigger
                      className={`border-2 ${errors.toBank ? "border-bank-danger" : "border-gray-200"} focus:border-bank-secondary`}
                    >
                      <SelectValue placeholder="은행을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank.code} value={bank.code}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.toBank && <p className="text-bank-danger text-sm">{errors.toBank}</p>}
                </div>

                {/* 입금 계좌번호 */}
                <div className="space-y-2">
                  <Label className="text-bank-text font-medium">입금 계좌번호</Label>
                  <Input
                    placeholder="계좌번호를 입력하세요"
                    value={transferData.toAccount}
                    onChange={(e) => setTransferData({ ...transferData, toAccount: e.target.value })}
                    className={`border-2 ${errors.toAccount ? "border-bank-danger" : "border-gray-200"} focus:border-bank-secondary`}
                  />
                  {errors.toAccount && <p className="text-bank-danger text-sm">{errors.toAccount}</p>}
                </div>

                {/* 받는 분 성함 */}
                <div className="space-y-2">
                  <Label className="text-bank-text font-medium">받는 분 성함</Label>
                  <Input
                    placeholder="받는 분의 성함을 입력하세요"
                    value={transferData.recipientName}
                    onChange={(e) => setTransferData({ ...transferData, recipientName: e.target.value })}
                    className={`border-2 ${errors.recipientName ? "border-bank-danger" : "border-gray-200"} focus:border-bank-secondary`}
                  />
                  {errors.recipientName && <p className="text-bank-danger text-sm">{errors.recipientName}</p>}
                </div>

                {/* 이체 금액 */}
                <div className="space-y-2">
                  <Label className="text-bank-text font-medium">이체 금액</Label>
                  <Input
                    placeholder="이체할 금액을 입력하세요"
                    value={transferData.amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className={`border-2 ${errors.amount ? "border-bank-danger" : "border-gray-200"} focus:border-bank-secondary text-right text-lg font-semibold`}
                  />
                  {errors.amount && <p className="text-bank-danger text-sm">{errors.amount}</p>}
                </div>

                {/* 메모 */}
                <div className="space-y-2">
                  <Label className="text-bank-text font-medium">메모 (선택사항)</Label>
                  <Textarea
                    placeholder="메모를 입력하세요"
                    value={transferData.memo}
                    onChange={(e) => setTransferData({ ...transferData, memo: e.target.value })}
                    className="border-2 border-gray-200 focus:border-bank-secondary"
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleNext}
                  className={`w-full py-4 text-lg font-semibold rounded-button transition-all duration-200 ${
                    !transferAmount || !recipientAccount
                      ? "bg-bank-inactive text-gray-500 cursor-not-allowed" // 비활성 상태
                      : "bg-bank-primary hover:bg-bank-primary-hover text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" // 활성 상태
                  }`}
                  disabled={!transferAmount || !recipientAccount}
                >
                  다음 단계
                </Button>
              </CardContent>
            </Card>

            {/* 계좌 정보 */}
            <Card className="bg-bank-card shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-bank-text flex items-center">
                  <Wallet className="w-5 h-5 mr-2" />내 계좌 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {myAccounts.map((account) => (
                  <div
                    key={account.id}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      transferData.fromAccount === account.id
                        ? "border-bank-primary bg-bank-primary/5"
                        : "border-gray-200 bg-bank-background"
                    }`}
                  >
                    <p className="font-medium text-bank-text">{account.name}</p>
                    <p className="text-sm text-bank-text-sub">{account.id}</p>
                    <p className="text-lg font-bold text-bank-primary mt-2">{formatCurrency(account.balance)}원</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ) : (
          /* 이체 확인 */
          <div className="max-w-2xl mx-auto">
            <Card className="bg-bank-card shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-bank-text">이체 정보 확인</CardTitle>
                <CardDescription className="text-bank-text-sub">
                  아래 정보를 확인하고 이체를 진행해주세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-bank-background rounded-lg p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-bank-text-sub">출금 계좌</span>
                    <span className="text-bank-text font-medium">{transferData.fromAccount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bank-text-sub">입금 은행</span>
                    <span className="text-bank-text font-medium">
                      {banks.find((b) => b.code === transferData.toBank)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bank-text-sub">입금 계좌</span>
                    <span className="text-bank-text font-medium">{transferData.toAccount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bank-text-sub">받는 분</span>
                    <span className="text-bank-text font-medium">{transferData.recipientName}</span>
                  </div>
                  <div className="flex justify-between border-t pt-4">
                    <span className="text-bank-text-sub">이체 금액</span>
                    <span className="text-2xl font-bold text-bank-primary">{transferData.amount}원</span>
                  </div>
                  {transferData.memo && (
                    <div className="flex justify-between">
                      <span className="text-bank-text-sub">메모</span>
                      <span className="text-bank-text font-medium">{transferData.memo}</span>
                    </div>
                  )}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800">이체 전 확인사항</p>
                    <p className="text-yellow-700 mt-1">
                      이체 후에는 취소가 불가능합니다. 계좌번호와 받는 분 성함을 다시 한 번 확인해주세요.
                    </p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 border-bank-secondary text-bank-primary hover:bg-bank-secondary/10"
                  >
                    이전
                  </Button>
                  <Button
                    onClick={handleTransfer}
                    disabled={isLoading}
                    className={`flex-1 py-4 text-lg font-semibold rounded-button transition-all duration-200 ${
                      isLoading
                        ? "bg-bank-inactive text-gray-500 cursor-not-allowed"
                        : "bg-bank-primary hover:bg-bank-primary-hover text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>이체 중...</span>
                      </div>
                    ) : (
                      "이체하기"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
