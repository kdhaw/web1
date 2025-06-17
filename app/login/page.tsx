'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      // TODO: 실제 로그인 API 연동
      router.push('/dashboard')
    } catch (err) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8">온라인 뱅킹 로그인</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-bank-text-sub mb-1">
              아이디
            </label>
            <input
              type="text"
              id="username"
              className="input-field"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-bank-text-sub mb-1">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="input-field"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-primary w-full">
            로그인
          </button>

          <div className="text-center space-x-4">
            <Link href="/signup" className="text-bank-primary hover:underline">
              회원가입
            </Link>
            <span className="text-bank-text-sub">|</span>
            <Link href="/forgot-password" className="text-bank-primary hover:underline">
              비밀번호 찾기
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
} 