import { createContext, useState, ReactNode } from "react";
import { Toast, ToastContextType } from "../types";

const initialToastState: Toast = { message: "", type: "" };

export const ToastContext = createContext<ToastContextType>({
  toast: initialToastState,
  setToast: () => {},
  clearToast: () => {}
});

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<Toast>(initialToastState);

  const clearToast = () => setToast(initialToastState);

  return (
    <ToastContext.Provider
      value={{
        toast,
        setToast: (newToast: Toast) => setToast(newToast),
        clearToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
