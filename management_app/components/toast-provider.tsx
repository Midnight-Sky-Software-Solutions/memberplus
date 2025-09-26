"use client";

import { createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";

type ToastContextType = {
  showToast: (options: Parameters<Toast["show"]>[0]) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toastRef = useRef<Toast>(null);

  const showToast: ToastContextType["showToast"] = (options) => {
    toastRef.current?.show(options);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {/* Toast container */}
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
}

// handy hook
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return ctx.showToast;
}