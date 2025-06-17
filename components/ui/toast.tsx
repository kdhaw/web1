"use client"

import * as React from "react"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ToastProps {
  id: string
  title?: string
  description?: string
  type?: "success" | "error" | "warning" | "info"
  duration?: number
  onClose?: () => void
}

export interface ToastContextType {
  toasts: ToastProps[]
  addToast: (toast: Omit<ToastProps, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const addToast = React.useCallback((toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }

    setToasts((prev) => [...prev, newToast])

    // 자동 제거
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration || 5000)
    }
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

function ToastContainer() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}

function Toast({ id, title, description, type = "info", onClose }: ToastProps) {
  const { removeToast } = useToast()

  const handleClose = () => {
    removeToast(id)
    onClose?.()
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-bank-accent" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-bank-danger" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      default:
        return <Info className="w-5 h-5 text-bank-secondary" />
    }
  }

  const getStyles = () => {
    switch (type) {
      case "success":
        return "border-bank-accent/20 bg-bank-accent/5"
      case "error":
        return "border-bank-danger/20 bg-red-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      default:
        return "border-bank-secondary/20 bg-bank-secondary/5"
    }
  }

  return (
    <div
      className={cn(
        "relative flex items-start space-x-3 rounded-card border-2 bg-bank-card p-4 shadow-lg animate-fade-in min-w-[320px] max-w-md",
        getStyles(),
      )}
    >
      <div className="flex-shrink-0">{getIcon()}</div>

      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-semibold text-bank-text">{title}</p>}
        {description && <p className="text-sm text-bank-text-sub mt-1">{description}</p>}
      </div>

      <button onClick={handleClose} className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors">
        <X className="w-4 h-4 text-bank-text-sub" />
      </button>
    </div>
  )
}
