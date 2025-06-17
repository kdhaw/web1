'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Wallet, 
  Send, 
  History, 
  BarChart2, 
  Bell, 
  LogOut 
} from 'lucide-react'

const menuItems = [
  { href: '/dashboard', icon: Home, label: '대시보드' },
  { href: '/account', icon: Wallet, label: '계좌조회' },
  { href: '/transfer', icon: Send, label: '이체' },
  { href: '/transactions', icon: History, label: '거래내역' },
  { href: '/spending-report', icon: BarChart2, label: '소비리포트' },
  { href: '/alerts', icon: Bell, label: '알림설정' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-bank-card border-r border-gray-200 p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-bank-primary">온라인 뱅킹</h1>
      </div>

      <ul className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-bank-primary text-white'
                    : 'text-bank-text-sub hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={() => {
            // TODO: 로그아웃 처리
          }}
          className="flex items-center space-x-3 px-4 py-2 rounded-lg text-bank-danger hover:bg-red-50 w-full"
        >
          <LogOut className="w-5 h-5" />
          <span>로그아웃</span>
        </button>
      </div>
    </nav>
  )
} 