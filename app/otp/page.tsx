'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OTPPage() {
  const router = useRouter()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(180) // 3분
  const [error, setError] = useState('')

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

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // 자동으로 다음 입력칸으로 이동
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const otpValue = otp.join('')
    if (otpValue.length !== 6) {
      setError('OTP 6자리를 모두 입력해주세요.')
      return
    }

    try {
      // TODO: 실제 OTP 검증 API 연동
      router.push('/dashboard')
    } catch (err) {
      setError('OTP 인증에 실패했습니다. 다시 시도해주세요.')
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bank-primary to-bank-secondary">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8">OTP 인증</h1>
        
        <div className="text-center mb-8">
          <p className="text-bank-text-sub mb-2">휴대폰으로 전송된 6자리 인증번호를 입력해주세요.</p>
          <div className="text-bank-accent font-medium">
            남은 시간: {formatTime(timeLeft)}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-bank-primary rounded-input focus:outline-none focus:ring-2 focus:ring-bank-primary"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>

          {error && <p className="error-message text-center">{error}</p>}

          <button type="submit" className="btn-primary w-full">
            인증하기
          </button>

          <div className="text-center">
            <button
              type="button"
              className="text-bank-primary hover:underline"
              onClick={() => {
                // TODO: OTP 재전송 API 연동
                setTimeLeft(180)
                setOtp(['', '', '', '', '', ''])
              }}
            >
              인증번호 재전송
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 