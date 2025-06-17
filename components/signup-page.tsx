"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Shield, User, Mail, Phone, Lock, Eye, EyeOff, QrCode, CheckCircle } from "lucide-react"

export function SignupPage() {
  const [step, setStep] = useState(1) // 1: 정보입력, 2: OTP설정, 3: 완료
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    userId: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreePrivacy: false,
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {}

    if (!signupData.name) newErrors.name = "이름을 입력해주세요"
    if (!signupData.email) newErrors.email = "이메일을 입력해주세요"
    if (!signupData.phone) newErrors.phone = "휴대폰 번호를 입력해주세요"
    if (!signupData.userId) newErrors.userId = "사용자 ID를 입력해주세요"
    if (!signupData.password) newErrors.password = "비밀번호를 입력해주세요"
    if (signupData.password !== signupData.confirmPassword) newErrors.confirmPassword = "비밀번호가 일치하지 않습니다"
    if (!signupData.agreeTerms) newErrors.agreeTerms = "이용약관에 동의해주세요"
    if (!signupData.agreePrivacy) newErrors.agreePrivacy = "개인정보처리방침에 동의해주세요"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleOTPSetup = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep(3)
    }, 2000)
  }

  const progressValue = (step / 3) * 100

  if (step === 3) {
    return (
      <div className="min-h-screen bg-bank-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-bank-card shadow-lg border-0">
          <CardContent className="text-center py-8">
            <div className="w-16 h-16 bg-bank-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-bank-text mb-2">가입 완료!</h2>
            <p className="text-bank-text-sub mb-6">
              {signupData.name}님, KB 디지털뱅킹에
              <br />
              성공적으로 가입되었습니다.
            </p>
            <Button
              className="w-full bg-bank-primary hover:bg-bank-primary-hover text-white"
              style={{ backgroundColor: "#2A5D9F", "&:hover": { backgroundColor: "#1F4A80" } }}
            >
              로그인하러 가기
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bank-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-bank-primary rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-bank-text">KB 디지털뱅킹 회원가입</h1>
          <p className="text-bank-text-sub mt-2">안전하고 편리한 온라인 뱅킹을 시작하세요</p>
        </div>

        {/* 진행률 */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-bank-text-sub mb-2">
            <span>진행률</span>
            <span>{step}/3 단계</span>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>

        {step === 1 ? (
          <Card className="bg-bank-card shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-bank-text">기본 정보 입력</CardTitle>
              <CardDescription className="text-bank-text-sub">회원가입을 위한 기본 정보를 입력해주세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 이름 */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-bank-text font-medium">
                    이름 *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-bank-text-sub" />
                    <Input
                      id="name"
                      placeholder="이름을 입력하세요"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      className={`pl-10 border-2 rounded-lg rounded-input ${
                        errors.name ? "border-bank-danger" : "border-gray-200"
                      } focus:border-bank-secondary`}
                    />
                  </div>
                  {errors.name && <p className="text-bank-danger text-sm">{errors.name}</p>}
                </div>

                {/* 이메일 */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-bank-text font-medium">
                    이메일 *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-bank-text-sub" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="이메일을 입력하세요"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      className={`pl-10 border-2 rounded-lg rounded-input ${
                        errors.email ? "border-bank-danger" : "border-gray-200"
                      } focus:border-bank-secondary`}
                    />
                  </div>
                  {errors.email && <p className="text-bank-danger text-sm">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 휴대폰 */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-bank-text font-medium">
                    휴대폰 번호 *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-bank-text-sub" />
                    <Input
                      id="phone"
                      placeholder="010-0000-0000"
                      value={signupData.phone}
                      onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                      className={`pl-10 border-2 rounded-lg rounded-input ${
                        errors.phone ? "border-bank-danger" : "border-gray-200"
                      } focus:border-bank-secondary`}
                    />
                  </div>
                  {errors.phone && <p className="text-bank-danger text-sm">{errors.phone}</p>}
                </div>

                {/* 사용자 ID */}
                <div className="space-y-2">
                  <Label htmlFor="userId" className="text-bank-text font-medium">
                    사용자 ID *
                  </Label>
                  <Input
                    id="userId"
                    placeholder="사용자 ID를 입력하세요"
                    value={signupData.userId}
                    onChange={(e) => setSignupData({ ...signupData, userId: e.target.value })}
                    className={`border-2 rounded-lg rounded-input ${
                      errors.userId ? "border-bank-danger" : "border-gray-200"
                    } focus:border-bank-secondary`}
                  />
                  {errors.userId && <p className="text-bank-danger text-sm">{errors.userId}</p>}
                </div>
              </div>

              {/* 비밀번호 */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-bank-text font-medium">
                  비밀번호 *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-bank-text-sub" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력하세요"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    className={`pl-10 pr-10 border-2 rounded-lg rounded-input ${
                      errors.password ? "border-bank-danger" : "border-gray-200"
                    } focus:border-bank-secondary`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.password && <p className="text-bank-danger text-sm">{errors.password}</p>}
              </div>

              {/* 비밀번호 확인 */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-bank-text font-medium">
                  비밀번호 확인 *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-bank-text-sub" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="비밀번호를 다시 입력하세요"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    className={`pl-10 pr-10 border-2 rounded-lg rounded-input ${
                      errors.confirmPassword ? "border-bank-danger" : "border-gray-200"
                    } focus:border-bank-secondary`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && <p className="text-bank-danger text-sm">{errors.confirmPassword}</p>}
              </div>

              {/* 약관 동의 */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={signupData.agreeTerms}
                    onCheckedChange={(checked) => setSignupData({ ...signupData, agreeTerms: checked as boolean })}
                  />
                  <Label htmlFor="agreeTerms" className="text-sm text-bank-text">
                    이용약관에 동의합니다 *
                  </Label>
                </div>
                {errors.agreeTerms && <p className="text-bank-danger text-sm">{errors.agreeTerms}</p>}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreePrivacy"
                    checked={signupData.agreePrivacy}
                    onCheckedChange={(checked) => setSignupData({ ...signupData, agreePrivacy: checked as boolean })}
                  />
                  <Label htmlFor="agreePrivacy" className="text-sm text-bank-text">
                    개인정보처리방침에 동의합니다 *
                  </Label>
                </div>
                {errors.agreePrivacy && <p className="text-bank-danger text-sm">{errors.agreePrivacy}</p>}
              </div>

              <Button
                onClick={handleNext}
                className="w-full bg-bank-primary hover:bg-bank-primary-hover text-white py-3 text-lg font-medium mt-6"
              >
                다음 단계
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* OTP 설정 */
          <Card className="bg-bank-card shadow-2xl border-0 rounded-card">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-bank-text text-2xl">OTP 인증 설정</CardTitle>
              <CardDescription className="text-bank-text-sub text-base">
                보안을 위해 OTP 인증을 설정해주세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 px-8 pb-8">
              {/* QR 코드 - 중앙 카드로 강조 */}
              <div className="flex justify-center">
                <div className="bg-white p-10 rounded-card shadow-2xl border-4 border-bank-secondary/20 transform hover:scale-105 transition-transform duration-200">
                  <div className="w-56 h-56 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center shadow-inner">
                    <QrCode className="w-32 h-32 text-bank-text-sub" />
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <h3 className="font-bold text-xl text-bank-text">Google Authenticator로 QR 코드를 스캔하세요</h3>
                <p className="text-base text-bank-text-sub leading-relaxed">
                  앱에서 QR 코드를 스캔한 후, 생성된 6자리 코드를 입력해주세요
                </p>
              </div>

              {/* OTP 입력 */}
              <div className="space-y-4">
                <Label className="text-bank-text font-semibold text-base">OTP 코드 입력</Label>
                <div className="flex justify-center">
                  <Input
                    placeholder="6자리 코드를 입력하세요"
                    className="w-64 text-center text-3xl font-mono tracking-widest py-4 border-2 border-gray-200 focus:border-bank-secondary rounded-input"
                    maxLength={6}
                  />
                </div>
              </div>

              <Button
                onClick={handleOTPSetup}
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
                    <span>설정 중...</span>
                  </div>
                ) : (
                  "OTP 설정 완료"
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
