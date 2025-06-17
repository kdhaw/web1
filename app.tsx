"use client"

import { useState } from "react"
import { ToastProvider } from "./components/ui/toast"
import { LoginPage } from "./components/login-page"
import { SignupPage } from "./components/signup-page"
import { OTPPage } from "./components/otp-page"
import { DashboardPage } from "./components/dashboard-page"
import { TransferPage } from "./components/transfer-page"
import { AccountPage } from "./components/account-page"
import { TransactionsPage } from "./components/transactions-page"
import { SpendingReportPage } from "./components/spending-report-page"
import { AdminPage } from "./components/admin-page"
import { AlertsPage } from "./components/alerts-page"

type PageType =
  | "login"
  | "signup"
  | "otp"
  | "dashboard"
  | "transfer"
  | "account"
  | "transactions"
  | "spending"
  | "admin"
  | "alerts"

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("login")

  const renderPage = () => {
    switch (currentPage) {
      case "login":
        return <LoginPage />
      case "signup":
        return <SignupPage />
      case "otp":
        return <OTPPage />
      case "dashboard":
        return <DashboardPage />
      case "transfer":
        return <TransferPage />
      case "account":
        return <AccountPage />
      case "transactions":
        return <TransactionsPage />
      case "spending":
        return <SpendingReportPage />
      case "admin":
        return <AdminPage />
      case "alerts":
        return <AlertsPage />
      default:
        return <LoginPage />
    }
  }

  return (
    <ToastProvider>
      <div className="min-h-screen">
        {renderPage()}

        {/* 개발용 네비게이션 */}
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border max-w-xs">
          <p className="text-sm font-medium mb-3">페이지 전환 (개발용)</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setCurrentPage("login")}
              className="px-2 py-1 text-xs bg-bank-primary text-white rounded-button hover:bg-bank-primary-hover transition-colors"
            >
              로그인
            </button>
            <button
              onClick={() => setCurrentPage("signup")}
              className="px-2 py-1 text-xs bg-bank-secondary text-white rounded-button hover:bg-bank-secondary/90 transition-colors"
            >
              회원가입
            </button>
            <button
              onClick={() => setCurrentPage("otp")}
              className="px-2 py-1 text-xs bg-bank-accent text-white rounded-button hover:bg-bank-accent/90 transition-colors"
            >
              OTP
            </button>
            <button
              onClick={() => setCurrentPage("dashboard")}
              className="px-2 py-1 text-xs bg-purple-500 text-white rounded-button hover:bg-purple-600 transition-colors"
            >
              대시보드
            </button>
            <button
              onClick={() => setCurrentPage("transfer")}
              className="px-2 py-1 text-xs bg-green-500 text-white rounded-button hover:bg-green-600 transition-colors"
            >
              이체
            </button>
            <button
              onClick={() => setCurrentPage("account")}
              className="px-2 py-1 text-xs bg-orange-500 text-white rounded-button hover:bg-orange-600 transition-colors"
            >
              계좌조회
            </button>
            <button
              onClick={() => setCurrentPage("transactions")}
              className="px-2 py-1 text-xs bg-pink-500 text-white rounded-button hover:bg-pink-600 transition-colors"
            >
              거래내역
            </button>
            <button
              onClick={() => setCurrentPage("spending")}
              className="px-2 py-1 text-xs bg-indigo-500 text-white rounded-button hover:bg-indigo-600 transition-colors"
            >
              소비리포트
            </button>
            <button
              onClick={() => setCurrentPage("admin")}
              className="px-2 py-1 text-xs bg-red-500 text-white rounded-button hover:bg-red-600 transition-colors"
            >
              관리자
            </button>
            <button
              onClick={() => setCurrentPage("alerts")}
              className="px-2 py-1 text-xs bg-teal-500 text-white rounded-button hover:bg-teal-600 transition-colors"
            >
              알림설정
            </button>
          </div>
        </div>
      </div>
    </ToastProvider>
  )
}
