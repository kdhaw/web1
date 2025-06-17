"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Shield, Clock, RefreshCw, CheckCircle } from "lucide-react"

export function OTPPage() {
  const [otpCode, setOtpCode] = useState("")
  const [timeLeft, setTimeLeft] = useState(180) // 3분
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progressValue = (timeLeft / 180) * 100

  const handleVerify = () => {
    setError("")
    if (otpCode.length !== 6) {
      setError("6자리 코드를 입력해주세요")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      if (otpCode === "123456") {
        setIsSuccess(true)
        setTimeout(() => {
          alert("인증 성공! 대시보드로 이동합니다.")
        }, 1500)
      } else {
        setError("잘못된 인증 코드입니다. 다시 시도해주세요.")
        setOtpCode("")
      }
    }, 1500)
  }

  const handleResend = () => {
    setTimeLeft(180)
    setOtpCode("")
    setError("")
    alert("새로운 인증 코드가 발송되었습니다.")
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bank-primary via-bank-secondary to-bank-accent flex items-center justify-center p-4 animate-gradient-shift bg-[length:400%_400%]">
        <Card className="w-full max-w-md bg-bank-card shadow-2xl border-0 animate-slide-up">
          <CardContent className="text-center py-12">
            <div className="w-20 h-20 bg-bank-accent rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-success">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-bank-text mb-4">인증 완료!</h2>
            <p className="text-bank-text-sub text-lg">
              OTP 인증이 성공적으로 완료되었습니다.
              <br />
              잠시 후 대시보드로 이동합니다.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bank-primary via-bank-secondary to-bank-accent flex items-center justify-center p-4 animate-gradient-shift bg-[length:400%_400%]">
      <div className="w-full max-w-md">
        {/* 헤더 */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">OTP 인증</h1>
          <p className="text-white/90 text-lg">보안을 위해 OTP 인증을 완료해주세요</p>
        </div>

        {/* OTP 카드 */}
        <Card className="bg-bank-card shadow-2xl border-0 rounded-card animate-slide-up">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-bank-text text-xl">인증 코드 입력</CardTitle>
            <CardDescription className="text-bank-text-sub text-base">
              Google Authenticator 앱에서 생성된 6자리 코드를 입력하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 px-8 pb-8">
            {/* 타이머 */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 bg-bank-accent/20 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-bank-accent" />
                </div>
                <span className="text-4xl font-bold text-bank-accent tabular-nums">{formatTime(timeLeft)}</span>
              </div>
              <div className="space-y-2">
                <Progress
                  value={progressValue}
                  className="h-3 bg-gray-100"
                  style={{
                    background: progressValue < 30 ? "#FFE5E5" : progressValue < 60 ? "#FFF3CD" : "#E8F5E8",
                  }}
                />
                <p className="text-sm text-bank-text-sub font-medium">남은 시간</p>
              </div>
            </div>

            {/* OTP 입력 */}
            <div className="space-y-6">
              <div className="flex justify-center">
                <Input
                  value={otpCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                    setOtpCode(value)
                    setError("")
                  }}
                  placeholder="000000"
                  className={`w-56 text-center text-4xl font-mono tracking-[0.8em] border-3 ${
                    error ? "border-bank-danger animate-shake bg-red-50" : "border-gray-200 focus:border-bank-accent"
                  } rounded-input py-6 transition-all duration-200`}
                  maxLength={6}
                />
              </div>
              {error && (
                <div className="text-center">
                  <p className="text-bank-danger text-sm font-medium animate-fade-in bg-red-50 py-2 px-4 rounded-input">
                    {error}
                  </p>
                </div>
              )}
            </div>

            {/* 버튼들 */}
            <div className="space-y-4">
              <Button
                onClick={handleVerify}
                disabled={isLoading || timeLeft === 0 || otpCode.length !== 6}
                className={`w-full py-4 text-lg font-semibold rounded-button transition-all duration-200 ${
                  isLoading || timeLeft === 0 || otpCode.length !== 6
                    ? "bg-bank-inactive text-gray-500 cursor-not-allowed"
                    : "bg-bank-primary hover:bg-bank-primary-hover text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>인증 중...</span>
                  </div>
                ) : (
                  "인증하기"
                )}
              </Button>

              <Button
                onClick={handleResend}
                variant="outline"
                disabled={timeLeft > 0}
                className={`w-full py-4 text-base font-medium rounded-button transition-all duration-200 ${
                  timeLeft > 0
                    ? "border-bank-inactive text-bank-inactive cursor-not-allowed"
                    : "border-bank-secondary text-bank-primary hover:bg-bank-secondary/10 hover:border-bank-primary"
                }`}
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                인증 코드 재발송
              </Button>
            </div>

            {/* 도움말 */}
            <div className="bg-bank-background rounded-card p-6 text-center border-l-4 border-bank-accent">
              <p className="text-sm text-bank-text-sub leading-relaxed">
                <span className="font-medium text-bank-text">인증 코드가 보이지 않나요?</span>
                <br />
                Google Authenticator 앱을 확인하거나 시간을 동기화해보세요.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 보안 안내 */}
        <div className="mt-8 text-center animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Shield className="w-4 h-4 text-white" />
            <p className="text-sm text-white/90 font-medium">SSL 보안 연결로 안전하게 보호됩니다</p>
          </div>
        </div>
      </div>
    </div>
  )
}
