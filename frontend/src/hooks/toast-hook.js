import { useContext } from "react";
import { ToastContext } from "../providers/toast-provider.jsx";
import { useEffect } from "react";

export function useToast() {
  const { toast, setToast, clearToast } = useContext(ToastContext);
  useEffect(() => {
    if (toast && toast.message) {
      const timer = setTimeout(() => {
        clearToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  return { toast, setToast, clearToast };
}
