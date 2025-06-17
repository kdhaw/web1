import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // 은행 서비스 전용 색상 테마 (기획서 기준)
        bank: {
          primary: "#2A5D9F", // 메인 색상 (진한 블루) - 신뢰, 안정감
          "primary-hover": "#1F4A80", // 메인 색상 hover
          secondary: "#4DA6FF", // 서브 색상 (밝은 하늘색) - 버튼 hover, 그래프 강조
          accent: "#00C49F", // 포인트 색상 (청록색) - 성공/진행 상황 강조
          danger: "#FF6B6B", // 경고 색상 (레드) - 에러, 실패, 주의 메시지
          background: "#F8FAFC", // 배경색 (아주 밝은 회색)
          card: "#FFFFFF", // 카드 배경 (흰색)
          text: "#1A1A1A", // 기본 텍스트 (검정 계열)
          "text-sub": "#6B7280", // 서브 텍스트 (회색)
          inactive: "#B0BEC5", // 비활성 상태
        },
        // 카테고리별 색상 (소비 리포트용)
        category: {
          food: "#4BC0C0", // 식비 - 청록
          shopping: "#FF9F40", // 쇼핑 - 오렌지
          transport: "#9966FF", // 교통 - 보라
          housing: "#36A2EB", // 주거 - 파랑
          communication: "#FFCD56", // 통신 - 노랑
          medical: "#FF6384", // 의료 - 핑크
          leisure: "#4DA6FF", // 여가 - 하늘색
          etc: "#C9CBCF", // 기타 - 회색
        },
        // 기존 shadcn 색상들...
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // 기획서 기준 추가
        button: "8px", // 버튼 전용
        card: "10px", // 카드 전용
        input: "6px", // 입력 폼 전용
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-2px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(2px)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-success": {
          "0%, 100%": { backgroundColor: "#00C49F" },
          "50%": { backgroundColor: "#00E5B5" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shake: "shake 0.5s ease-in-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
        "pulse-success": "pulse-success 2s ease-in-out infinite",
        "gradient-shift": "gradient-shift 3s ease infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
