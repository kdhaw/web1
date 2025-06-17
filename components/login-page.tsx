"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Shield, Lock, User } from "lucide-react"

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({
    userId: "",
    password: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    setErrors({})

    // 간단한 유효성 검사
    const newErrors: { [key: string]: string } = {}
    if (!loginData.userId) newErrors.userId = "사용자 ID를 입력해주세요"
    if (!loginData.password) newErrors.password = "비밀번호를 입력해주세요"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    // 로그인 시뮬레이션
    setTimeout(() => {
      setIsLoading(false)
      alert("로그인 성공! OTP 인증 페이지로 이동합니다.")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative">
      {/* 블루 엣지 테두리 */}
      <div className="absolute inset-0 bg-gradient-to-r from-bank-primary/5 via-transparent to-bank-secondary/5"></div>
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-bank-primary to-bank-secondary"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-bank-secondary to-bank-primary"></div>

      <div className="w-full max-w-md relative z-10">
        {/* 로고 및 헤더 */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-bank-primary rounded-full mb-6 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-bank-text mb-3">KB 디지털뱅킹</h1>
          <p className="text-bank-text-sub text-lg">안전하고 편리한 온라인 뱅킹 서비스</p>
        </div>

        {/* 로그인 카드 */}
        <Card className="bg-bank-card shadow-2xl border-0 rounded-card">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-bank-text text-2xl">로그인</CardTitle>
            <CardDescription className="text-bank-text-sub text-base">계정 정보를 입력해주세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-8 pb-8">
            {/* 사용자 ID 입력 */}
            <div className="space-y-3">
              <Label htmlFor="userId" className="text-bank-text font-semibold text-base">
                사용자 ID
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-bank-text-sub" />
                <Input
                  id="userId"
                  type="text"
                  placeholder="사용자 ID를 입력하세요"
                  value={loginData.userId}
                  onChange={(e) => setLoginData({ ...loginData, userId: e.target.value })}
                  className={`pl-12 py-4 text-base border-2 rounded-input transition-all duration-200 ${
                    errors.userId
                      ? "border-bank-danger animate-shake bg-red-50 focus:border-bank-danger"
                      : "border-gray-200 focus:border-bank-secondary focus:ring-bank-secondary/20"
                  }`}
                />
              </div>
              {errors.userId && (
                <p className="text-bank-danger text-sm font-medium animate-fade-in bg-red-50 py-2 px-3 rounded-input">
                  {errors.userId}
                </p>
              )}
            </div>

            {/* 비밀번호 입력 */}
            <div className="space-y-3">
              <Label htmlFor="password" className="text-bank-text font-semibold text-base">
                비밀번호
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-bank-text-sub" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력하세요"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className={`pl-12 pr-12 py-4 text-base border-2 rounded-input transition-all duration-200 ${
                    errors.password
                      ? "border-bank-danger animate-shake bg-red-50 focus:border-bank-danger"
                      : "border-gray-200 focus:border-bank-secondary focus:ring-bank-secondary/20"
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-gray-100 rounded-full"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </Button>
              </div>
              {errors.password && (
                <p className="text-bank-danger text-sm font-medium animate-fade-in bg-red-50 py-2 px-3 rounded-input">
                  {errors.password}
                </p>
              )}
            </div>

            {/* 로그인 버튼 */}
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full py-4 text-lg font-semibold rounded-button transition-all duration-200 ${
                isLoading
                  ? "bg-bank-inactive text-gray-500 cursor-not-allowed"
                  : "bg-bank-primary hover:bg-bank-primary-hover text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>로그인 중...</span>
                </div>
              ) : (
                "로그인"
              )}
            </Button>

            {/* 추가 옵션 */}
            <div className="flex justify-between text-base pt-4">
              <button className="text-bank-secondary hover:text-bank-primary transition-colors font-medium">
                ID/비밀번호 찾기
              </button>
              <button className="text-bank-secondary hover:text-bank-primary transition-colors font-medium">
                회원가입
              </button>
            </div>
          </CardContent>
        </Card>

        {/* 보안 안내 */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-bank-background rounded-full px-6 py-3 shadow-sm">
            <Shield className="w-4 h-4 text-bank-accent" />
            <p className="text-sm text-bank-text-sub font-medium">SSL 보안 연결로 안전하게 보호됩니다</p>
          </div>
        </div>
      </div>
    </div>
  )
}
