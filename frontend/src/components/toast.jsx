import { useToast } from "../hooks/toast-hook";

export default function Toast() {
  const { toast, setToast } = useToast();
  const className =
    toast?.type === "error" ? "toast toast-error" : "toast toast-success";
  return (
    <>
      {toast && toast.message && (
        <div className={className}>
          {toast.message}
          <button
            className="dismiss"
            onClick={() => setToast({ message: "", type: "" })}
          >
            X
          </button>
        </div>
      )}
    </>
  );
}
