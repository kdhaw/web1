"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Bell, Shield, CreditCard, Smartphone, Mail, Lock, Info, AlertTriangle } from "lucide-react"

export function AlertsPage() {
  const [notificationSettings, setNotificationSettings] = useState({
    loginAlert: true,
    transactionAlert: true,
    balanceAlert: true,
    marketingAlert: false,
    securityAlert: true,
    emailNotification: true,
    pushNotification: true,
    smsNotification: false,
  })

  const [transactionThreshold, setTransactionThreshold] = useState("100000")
  const [balanceThreshold, setBalanceThreshold] = useState("50000")
  const [notificationTime, setNotificationTime] = useState("instant")

  const handleToggleChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    })
  }

  return (
    <div className="min-h-screen bg-bank-background">
      {/* 헤더 */}
      <header className="bg-bank-card border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" size="icon" className="mr-4">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-bank-text">알림 설정</h1>
              <p className="text-sm text-bank-text-sub">알림 및 보안 설정 관리</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="mb-6 bg-bank-background">
            <TabsTrigger value="notifications">알림 설정</TabsTrigger>
            <TabsTrigger value="security">보안 설정</TabsTrigger>
            <TabsTrigger value="preferences">수신 환경설정</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-6">
            {/* 알림 유형 설정 - 흰색 + 박스 섀도우 */}
            <Card className="bg-bank-card shadow-lg border-0 rounded-card">
              <CardHeader>
                <CardTitle className="text-bank-text flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-bank-primary" />
                  알림 유형 설정
                </CardTitle>
                <CardDescription className="text-bank-text-sub">받고 싶은 알림 유형을 선택하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {/* 로그인 알림 */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium text-bank-text">로그인 알림</Label>
                      <p className="text-sm text-bank-text-sub">새로운 기기에서 로그인 시 알림을 받습니다</p>
                    </div>
                    {/* 토글 스위치: 청록색 ON / 회색 OFF */}
                    <Switch
                      checked={notificationSettings.loginAlert}
                      onCheckedChange={() => handleToggleChange("loginAlert")}
                      className="data-[state=checked]:bg-bank-accent data-[state=unchecked]:bg-gray-300"
                    />
                  </div>
                  <Separator />

                  {/* 거래 알림 */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base font-medium text-bank-text">거래 알림</Label>
                        <p className="text-sm text-bank-text-sub">계좌 거래 발생 시 알림을 받습니다</p>
                      </div>
                      <Switch
                        checked={notificationSettings.transactionAlert}
                        onCheckedChange={() => handleToggleChange("transactionAlert")}
                        className="data-[state=checked]:bg-bank-accent data-[state=unchecked]:bg-gray-300"
                      />
                    </div>

                    {notificationSettings.transactionAlert && (
                      <div className="ml-6 p-4 bg-bank-background rounded-lg">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-sm text-bank-text">최소 금액 설정</Label>
                            <Select value={transactionThreshold} onValueChange={setTransactionThreshold}>
                              <SelectTrigger className="border-2 border-gray-200 focus:border-bank-secondary">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="10000">10,000원 이상</SelectItem>
                                <SelectItem value="50000">50,000원 이상</SelectItem>
                                <SelectItem value="100000">100,000원 이상</SelectItem>
                                <SelectItem value="500000">500,000원 이상</SelectItem>
                                <SelectItem value="1000000">1,000,000원 이상</SelectItem>
                                <SelectItem value="all">모든 거래</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-bank-text-sub">
                              설정한 금액 이상의 거래에 대해서만 알림을 받습니다
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <Separator />

                  {/* 잔액 알림 */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base font-medium text-bank-text">잔액 알림</Label>
                        <p className="text-sm text-bank-text-sub">계좌 잔액이 특정 금액 이하일 때 알림을 받습니다</p>
                      </div>
                      <Switch
                        checked={notificationSettings.balanceAlert}
                        onCheckedChange={() => handleToggleChange("balanceAlert")}
                        className="data-[state=checked]:bg-bank-accent data-[state=unchecked]:bg-gray-300"
                      />
                    </div>

                    {notificationSettings.balanceAlert && (
                      <div className="ml-6 p-4 bg-bank-background rounded-lg">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-sm text-bank-text">잔액 기준 설정</Label>
                            <Select value={balanceThreshold} onValueChange={setBalanceThreshold}>
                              <SelectTrigger className="border-2 border-gray-200 focus:border-bank-secondary">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="10000">10,000원 이하</SelectItem>
                                <SelectItem value="50000">50,000원 이하</SelectItem>
                                <SelectItem value="100000">100,000원 이하</SelectItem>
                                <SelectItem value="500000">500,000원 이하</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-bank-text-sub">
                              계좌 잔액이 설정한 금액 이하로 떨어질 때 알림을 받습니다
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <Separator />

                  {/* 마케팅 알림 */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium text-bank-text">마케팅 알림</Label>
                      <p className="text-sm text-bank-text-sub">새로운 상품 및 프로모션 정보를 받습니다</p>
                    </div>
                    <Switch
                      checked={notificationSettings.marketingAlert}
                      onCheckedChange={() => handleToggleChange("marketingAlert")}
                      className="data-[state=checked]:bg-bank-accent data-[state=unchecked]:bg-gray-300"
                    />
                  </div>
                  <Separator />

                  {/* 보안 알림 */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium text-bank-text">보안 알림</Label>
                      <p className="text-sm text-bank-text-sub">
                        비밀번호 변경, 개인정보 업데이트 등 보안 관련 알림을 받습니다
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.securityAlert}
                      onCheckedChange={() => handleToggleChange("securityAlert")}
                      className="data-[state=checked]:bg-bank-accent data-[state=unchecked]:bg-gray-300"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 알림 수신 방법 */}
            <Card className="bg-bank-card shadow-lg border-0 rounded-card">
              <CardHeader>
                <CardTitle className="text-bank-text flex items-center">
                  <Smartphone className="w-5 h-5 mr-2 text-bank-primary" />
                  알림 수신 방법
                </CardTitle>
                <CardDescription className="text-bank-text-sub">알림을 받을 방법을 선택하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {/* 이메일 알림 */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium text-bank-text flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-bank-text-sub" />
                        이메일 알림
                      </Label>
                      <p className="text-sm text-bank-text-sub">user@example.com</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotification}
                      onCheckedChange={() => handleToggleChange("emailNotification")}
                      className="data-[state=checked]:bg-bank-accent data-[state=unchecked]:bg-gray-300"
                    />
                  </div>
                  <Separator />

                  {/* 푸시 알림 */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium text-bank-text flex items-center">
                        <Smartphone className="w-4 h-4 mr-2 text-bank-text-sub" />
                        푸시 알림
                      </Label>
                      <p className="text-sm text-bank-text-sub">모바일 앱으로 푸시 알림을 받습니다</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotification}
                      onCheckedChange={() => handleToggleChange("pushNotification")}
                      className="data-[state=checked]:bg-bank-accent data-[state=unchecked]:bg-gray-300"
                    />
                  </div>
                  <Separator />

                  {/* SMS 알림 */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium text-bank-text flex items-center">
                        <Smartphone className="w-4 h-4 mr-2 text-bank-text-sub" />
                        SMS 알림
                      </Label>
                      <p className="text-sm text-bank-text-sub">010-****-1234</p>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotification}
                      onCheckedChange={() => handleToggleChange("smsNotification")}
                      className="data-[state=checked]:bg-bank-accent data-[state=unchecked]:bg-gray-300"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 알림 시간 설정 */}
            <Card className="bg-bank-card shadow-lg border-0 rounded-card">
              <CardHeader>
                <CardTitle className="text-bank-text flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-bank-primary" />
                  알림 시간 설정
                </CardTitle>
                <CardDescription className="text-bank-text-sub">알림을 받을 시간을 설정하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-base font-medium text-bank-text">알림 수신 시간</Label>
                    <Select value={notificationTime} onValueChange={setNotificationTime}>
                      <SelectTrigger className="border-2 border-gray-200 focus:border-bank-secondary">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instant">즉시 알림</SelectItem>
                        <SelectItem value="hourly">시간별 요약</SelectItem>
                        <SelectItem value="daily">일일 요약</SelectItem>
                        <SelectItem value="weekly">주간 요약</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-bank-text-sub">중요 보안 알림은 설정과 관계없이 항상 즉시 전송됩니다</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-bank-card shadow-lg border-0 rounded-card">
              <CardHeader>
                <CardTitle className="text-bank-text flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-bank-primary" />
                  보안 설정
                </CardTitle>
                <CardDescription className="text-bank-text-sub">
                  계정 보안을 강화하기 위한 설정을 관리하세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {/* 2단계 인증 */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium text-bank-text">2단계 인증 (OTP)</Label>
                      <p className="text-sm text-bank-text-sub">Google Authenticator를 통한 추가 보안 인증</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-bank-accent font-medium">활성화됨</span>
                      <Button variant="outline" size="sm" className="border-bank-secondary text-bank-primary">
                        관리
                      </Button>
                    </div>
                  </div>
                  <Separator />

                  {/* 로그인 알림 */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium text-bank-text">의심스러운 로그인 감지</Label>
                      <p className="text-sm text-bank-text-sub">새로운 기기나 위치에서의 로그인을 감지합니다</p>
                    </div>
                    <Switch checked={true} disabled className="data-[state=checked]:bg-bank-accent" />
                  </div>
                  <Separator />

                  {/* 세션 관리 */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium text-bank-text">활성 세션 관리</Label>
                      <p className="text-sm text-bank-text-sub">현재 로그인된 모든 기기를 확인하고 관리합니다</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-bank-secondary text-bank-primary">
                      세션 보기
                    </Button>
                  </div>
                  <Separator />

                  {/* 비밀번호 변경 */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium text-bank-text">비밀번호 변경</Label>
                      <p className="text-sm text-bank-text-sub">마지막 변경: 2024년 1월 10일</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-bank-secondary text-bank-primary">
                      변경하기
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 보안 권장사항 */}
            <Card className="bg-gradient-to-r from-bank-accent/10 to-bank-secondary/10 border-bank-accent/20 rounded-card">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Info className="w-6 h-6 text-bank-accent mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-bank-text mb-2">보안 권장사항</h3>
                    <ul className="space-y-2 text-sm text-bank-text-sub">
                      <li>• 정기적으로 비밀번호를 변경하세요 (3개월마다 권장)</li>
                      <li>• 다른 사이트와 동일한 비밀번호를 사용하지 마세요</li>
                      <li>• 공용 컴퓨터에서는 로그인을 피하세요</li>
                      <li>• 의심스러운 이메일이나 링크를 클릭하지 마세요</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="bg-bank-card shadow-lg border-0 rounded-card">
              <CardHeader>
                <CardTitle className="text-bank-text flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-bank-primary" />
                  수신 환경설정
                </CardTitle>
                <CardDescription className="text-bank-text-sub">
                  개인정보 처리 및 마케팅 수신 동의를 관리하세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {/* 개인정보 수집 동의 */}
                  <div className="p-4 bg-bank-background rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-base font-medium text-bank-text">개인정보 수집 및 이용 동의</Label>
                      <span className="text-sm text-bank-accent font-medium">필수</span>
                    </div>
                    <p className="text-sm text-bank-text-sub mb-3">
                      서비스 제공을 위한 필수 개인정보 수집 및 이용에 대한 동의입니다.
                    </p>
                    <Button variant="outline" size="sm" className="border-bank-secondary text-bank-primary">
                      약관 전문 보기
                    </Button>
                  </div>

                  {/* 마케팅 수신 동의 */}
                  <div className="p-4 bg-bank-background rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-base font-medium text-bank-text">마케팅 정보 수신 동의</Label>
                      <Switch
                        checked={notificationSettings.marketingAlert}
                        onCheckedChange={() => handleToggleChange("marketingAlert")}
                        className="data-[state=checked]:bg-bank-accent data-[state=unchecked]:bg-gray-300"
                      />
                    </div>
                    <p className="text-sm text-bank-text-sub mb-3">
                      새로운 금융상품, 이벤트, 프로모션 정보를 받아보실 수 있습니다.
                    </p>
                    <Button variant="outline" size="sm" className="border-bank-secondary text-bank-primary">
                      약관 전문 보기
                    </Button>
                  </div>

                  {/* 제3자 정보 제공 동의 */}
                  <div className="p-4 bg-bank-background rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-base font-medium text-bank-text">제3자 정보 제공 동의</Label>
                      <Switch
                        checked={false}
                        className="data-[state=checked]:bg-bank-accent data-[state=unchecked]:bg-gray-300"
                      />
                    </div>
                    <p className="text-sm text-bank-text-sub mb-3">
                      제휴사 서비스 제공을 위한 개인정보 제3자 제공에 대한 동의입니다.
                    </p>
                    <Button variant="outline" size="sm" className="border-bank-secondary text-bank-primary">
                      약관 전문 보기
                    </Button>
                  </div>
                </div>

                {/* 주의사항 */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800">주의사항</p>
                    <p className="text-yellow-700 mt-1">
                      필수 동의 항목을 철회하시면 서비스 이용이 제한될 수 있습니다. 선택 동의 항목은 언제든지 변경
                      가능합니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 저장 버튼 */}
        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline" className="border-bank-secondary text-bank-primary rounded-button px-8">
            취소
          </Button>
          <Button className="bg-bank-primary hover:bg-bank-primary-hover text-white rounded-button px-8">
            설정 저장
          </Button>
        </div>
      </main>
    </div>
  )
}
