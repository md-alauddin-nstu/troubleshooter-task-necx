import { createContext, useState } from "react";

export const ToastContext = createContext({
  toast: {
    message: "",
    type: "", // 'success', 'error'
  },
  setToast: () => {},
  clearToast: () => {},
});

export const ToastProvider = ({ children }) => {
  const initialToastState = { message: "", type: "" };
  const [toast, setToast] = useState(initialToastState);

  const clearToast = () => {
    setToast(initialToastState);
  };

  return (
    <ToastContext.Provider
      value={{
        toast,
        setToast,
        clearToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
