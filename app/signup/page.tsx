'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    name: '',
    email: '',
    phone: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (formData.password !== formData.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      // TODO: 실제 회원가입 API 연동
      setSuccess('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.')
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (err) {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8">회원가입</h1>
        
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

          <div>
            <label htmlFor="passwordConfirm" className="block text-sm font-medium text-bank-text-sub mb-1">
              비밀번호 확인
            </label>
            <input
              type="password"
              id="passwordConfirm"
              className="input-field"
              value={formData.passwordConfirm}
              onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-bank-text-sub mb-1">
              이름
            </label>
            <input
              type="text"
              id="name"
              className="input-field"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-bank-text-sub mb-1">
              이메일
            </label>
            <input
              type="email"
              id="email"
              className="input-field"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-bank-text-sub mb-1">
              휴대폰 번호
            </label>
            <input
              type="tel"
              id="phone"
              className="input-field"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit" className="btn-primary w-full">
            회원가입
          </button>

          <div className="text-center">
            <Link href="/login" className="text-bank-primary hover:underline">
              이미 계정이 있으신가요? 로그인
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
} 