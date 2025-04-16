"use client"

import { createContext, useContext } from "react"
import { Toaster as SonnerToaster, toast } from "sonner"

const ToastContext = createContext()

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export const Toaster = ({ children }) => {
  const showToast = (message, type = "default", duration = 3000) => {
    switch (type) {
      case "success":
        toast.success(message, { duration })
        break
      case "error":
        toast.error(message, { duration })
        break
      case "warning":
        toast.warning(message, { duration })
        break
      default:
        toast(message, { duration })
    }
  }

  return (
    <ToastContext.Provider value={{ toast: showToast }}>
      {children}
      <SonnerToaster position="bottom-right" />
    </ToastContext.Provider>
  )
}
