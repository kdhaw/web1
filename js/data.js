
const userData = {
  name: "홍길동",
  email: "hong@example.com",
  phone: "010-1234-5678",
  userType: "VIP",
  joinDate: "2020-03-15",
  lastLogin: "2024-01-15 14:30",
}

const accountsData = [
  {
    id: "1",
    type: "주거래",
    name: "KB Star 통장",
    number: "123-456-789012",
    balance: 5420000,
    color: "linear-gradient(135deg, #2A5D9F 0%, #4DA6FF 100%)",
    icon: "fas fa-wallet",
    isPrimary: true,
    interestRate: 0.5,
    openDate: "2020-03-15",
  },
  {
    id: "2",
    type: "적금",
    name: "KB 정기적금",
    number: "987-654-321098",
    balance: 12000000,
    color: "linear-gradient(135deg, #00C49F 0%, #10B981 100%)",
    icon: "fas fa-piggy-bank",
    isPrimary: false,
    interestRate: 3.5,
    maturityDate: "2024-12-31",
  },
  {
    id: "3",
    type: "예금",
    name: "KB 정기예금",
    number: "555-777-888999",
    balance: 25000000,
    color: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
    icon: "fas fa-chart-line",
    isPrimary: false,
    interestRate: 4.2,
    maturityDate: "2025-06-15",
  },
  {
    id: "4",
    type: "카드",
    name: "KB 체크카드",
    number: "1234-****-****-5678",
    balance: 0,
    color: "linear-gradient(135deg, #6B7280 0%, #374151 100%)",
    icon: "fas fa-credit-card",
    isPrimary: false,
    monthlyUsage: 1250000,
    paymentDate: "매월 15일",
  },
]

const transactionsData = [
  {
    id: "1",
    date: "2024-01-15",
    time: "14:30",
    type: "입금",
    description: "급여 입금",
    amount: 3500000,
    balance: 5420000,
    account: "KB Star 통장",
    accountId: "1",
    category: "급여",
    status: "완료",
    memo: "1월 급여",
  },
  {
    id: "2",
    date: "2024-01-14",
    time: "16:22",
    type: "출금",
    description: "온라인 쇼핑 - 쿠팡",
    amount: -89000,
    balance: 1920000,
    account: "KB Star 통장",
    accountId: "1",
    category: "쇼핑",
    status: "완료",
    memo: "생활용품 구매",
  },
  {
    id: "3",
    date: "2024-01-14",
    time: "11:15",
    type: "이체",
    description: "김철수님께 송금",
    amount: -500000,
    balance: 2009000,
    account: "KB Star 통장",
    accountId: "1",
    category: "이체",
    status: "완료",
    recipient: "김철수",
    recipientAccount: "111-222-333444",
  },
  {
    id: "4",
    date: "2024-01-13",
    time: "09:45",
    type: "출금",
    description: "ATM 출금 - 강남역",
    amount: -200000,
    balance: 2509000,
    account: "KB Star 통장",
    accountId: "1",
    category: "현금인출",
    status: "완료",
    location: "강남역 ATM",
  },
  {
    id: "5",
    date: "2024-01-12",
    time: "18:30",
    type: "출금",
    description: "카페 결제 - 스타벅스",
    amount: -6500,
    balance: 2709000,
    account: "KB Star 통장",
    accountId: "1",
    category: "식음료",
    status: "완료",
    merchant: "스타벅스 강남점",
  },
  {
    id: "6",
    date: "2024-01-12",
    time: "12:00",
    type: "입금",
    description: "이자 입금",
    amount: 12500,
    balance: 2715500,
    account: "KB Star 통장",
    accountId: "1",
    category: "이자",
    status: "완료",
    memo: "예금 이자",
  },
]

const monthlySpendingData = [
  { month: "8월", amount: 2100000, income: 3200000, expense: 2100000 },
  { month: "9월", amount: 2300000, income: 3200000, expense: 2300000 },
  { month: "10월", amount: 1950000, income: 3200000, expense: 1950000 },
  { month: "11월", amount: 2450000, income: 3200000, expense: 2450000 },
  { month: "12월", amount: 2800000, income: 3200000, expense: 2800000 },
  { month: "1월", amount: 2518000, income: 3500000, expense: 2518000 },
]

const categorySpendingData = [
  { name: "식비", value: 580000, color: "#4BC0C0", icon: "fas fa-utensils" },
  { name: "쇼핑", value: 420000, color: "#FF9F40", icon: "fas fa-shopping-bag" },
  { name: "교통", value: 150000, color: "#9966FF", icon: "fas fa-car" },
  { name: "주거", value: 650000, color: "#36A2EB", icon: "fas fa-home" },
  { name: "통신", value: 98000, color: "#FFCD56", icon: "fas fa-mobile-alt" },
  { name: "의료", value: 120000, color: "#FF6384", icon: "fas fa-heartbeat" },
  { name: "여가", value: 320000, color: "#4DA6FF", icon: "fas fa-gamepad" },
  { name: "기타", value: 180000, color: "#C9CBCF", icon: "fas fa-ellipsis-h" },
]

const notificationsData = [
  {
    id: "1",
    title: "새로운 로그인",
    message: "새로운 기기에서 로그인했습니다",
    time: "5분 전",
    unread: true,
    type: "security",
    icon: "fas fa-shield-alt",
  },
  {
    id: "2",
    title: "이체 완료",
    message: "김철수님께 500,000원 이체가 완료되었습니다",
    time: "1시간 전",
    unread: true,
    type: "transaction",
    icon: "fas fa-paper-plane",
  },
  {
    id: "3",
    title: "카드 결제",
    message: "온라인 쇼핑 89,000원 결제되었습니다",
    time: "3시간 전",
    unread: false,
    type: "payment",
    icon: "fas fa-credit-card",
  },
  {
    id: "4",
    title: "잔액 부족 알림",
    message: "계좌 잔액이 설정한 금액 이하입니다",
    time: "1일 전",
    unread: false,
    type: "alert",
    icon: "fas fa-exclamation-triangle",
  },
]

const banksData = [
  { code: "kb", name: "KB국민은행" },
  { code: "shinhan", name: "신한은행" },
  { code: "woori", name: "우리은행" },
  { code: "hana", name: "하나은행" },
  { code: "nh", name: "농협은행" },
  { code: "ibk", name: "IBK기업은행" },
  { code: "keb", name: "KEB하나은행" },
  { code: "sc", name: "SC제일은행" },
  { code: "citi", name: "한국씨티은행" },
  { code: "kakao", name: "카카오뱅크" },
  { code: "toss", name: "토스뱅크" },
]

const adminStatsData = {
  totalUsers: 15420,
  activeUsers: 12350,
  totalTransactions: 89650,
  totalAmount: 125000000000,
  newUsersToday: 45,
  transactionsToday: 1250,
  systemStatus: "normal",
  serverLoad: 65,
}

const settingsData = {
  theme: "light",
  language: "ko",
  currency: "KRW",
  notifications: {
    email: true,
    push: true,
    sms: false,
    marketing: false,
  },
  security: {
    twoFactor: true,
    biometric: true,
    sessionTimeout: 30,
  },
  privacy: {
    showBalance: true,
    dataSharing: false,
    analytics: true,
  },
}

const helpData = [
  {
    category: "계좌 관리",
    items: [
      { title: "계좌 개설 방법", content: "온라인으로 간편하게 계좌를 개설하는 방법을 안내합니다." },
      { title: "계좌 해지 방법", content: "계좌 해지 절차와 필요한 서류를 안내합니다." },
      { title: "잔액 조회", content: "실시간 잔액 조회 방법을 설명합니다." },
    ],
  },
  {
    category: "이체 서비스",
    items: [
      { title: "계좌 이체 방법", content: "안전하고 빠른 계좌 이체 방법을 안내합니다." },
      { title: "이체 한도 설정", content: "일일 이체 한도 설정 및 변경 방법입니다." },
      { title: "예약 이체", content: "원하는 날짜에 자동으로 이체되는 예약 이체 서비스입니다." },
    ],
  },
  {
    category: "보안",
    items: [
      { title: "OTP 설정", content: "2단계 인증을 위한 OTP 설정 방법입니다." },
      { title: "비밀번호 변경", content: "안전한 비밀번호 설정 및 변경 방법입니다." },
      { title: "보안 카드", content: "보안 카드 발급 및 사용 방법을 안내합니다." },
    ],
  },
]

const productsData = [
  {
    id: "1",
    name: "KB Star 적금",
    type: "적금",
    interestRate: 3.5,
    minAmount: 100000,
    maxAmount: 50000000,
    period: "12개월",
    description: "매월 일정 금액을 적립하여 목돈을 만드는 적금 상품입니다.",
    features: ["자유적립", "중도해지 가능", "우대금리 적용"],
  },
  {
    id: "2",
    name: "KB 정기예금",
    type: "예금",
    interestRate: 4.2,
    minAmount: 1000000,
    maxAmount: 100000000,
    period: "24개월",
    description: "목돈을 안전하게 불려주는 정기예금 상품입니다.",
    features: ["고금리", "원금보장", "만기자동연장"],
  },
  {
    id: "3",
    name: "KB 체크카드",
    type: "카드",
    annualFee: 0,
    cashback: 0.5,
    description: "연회비 없이 사용할 수 있는 체크카드입니다.",
    features: ["연회비 무료", "캐시백 적립", "해외사용 가능"],
  },
]

window.userData = userData
window.accountsData = accountsData
window.transactionsData = transactionsData
window.monthlySpendingData = monthlySpendingData
window.categorySpendingData = categorySpendingData
window.notificationsData = notificationsData
window.banksData = banksData
window.adminStatsData = adminStatsData
