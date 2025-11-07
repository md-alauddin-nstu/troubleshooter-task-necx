import { useToast } from "../hooks/toast-hook";
import { Toast as ToastType, ToastContextType } from "../types";

export default function Toast() {
  const { toast, setToast } = useToast() as ToastContextType;

  const className = `toast ${toast.type === "error" ? "toast-error" : "toast-success"}`;

  const handleDismiss = () => {
    const emptyToast: ToastType = { message: "", type: "" };
    setToast(emptyToast);
  };

  return (
    <>
      {toast.message && (
        <div className={className}>
          {toast.message}
          <button
            className="dismiss"
            onClick={handleDismiss}
            type="button"
          >
            X
          </button>
        </div>
      )}
    </>
  );
}
