import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, Loader2, Trash2, X } from "lucide-react";

interface ConfirmationOptions {
  title: string;
  description: string;
  confirmLabel?: string;
  pendingLabel?: string;
  variant?: "danger" | "primary";
  onConfirm: () => Promise<unknown>;
}
const ConfirmationContext = createContext<
  ((options: ConfirmationOptions) => void) | null
>(null);

export function ConfirmationProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<ConfirmationOptions | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const busy = useRef(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const cancel = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!options) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [options]);

  useEffect(() => {
    if (options && !dialog.current?.open) {
      dialog.current?.showModal();
      cancel.current?.focus();
    } else if (!options && dialog.current?.open) {
      dialog.current.close();
      if (trigger.current?.isConnected) trigger.current.focus();
    }
  }, [options]);

  const dismiss = () => {
    if (busy.current) return;
    setOptions(null);
    setError("");
  };
  const confirm = async () => {
    if (!options || busy.current) return;
    busy.current = true;
    setPending(true);
    setError("");
    try {
      await options.onConfirm();
      setOptions(null);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to complete this action. Please try again.",
      );
    } finally {
      busy.current = false;
      setPending(false);
    }
  };

  return (
    <ConfirmationContext.Provider
      value={(next) => {
        if (options || busy.current) return;
        trigger.current =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;
        setError("");
        setOptions(next);
      }}
    >
      {children}
      <dialog
        ref={dialog}
        className="confirmation-dialog"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        aria-busy={pending}
        onCancel={(event) => {
          event.preventDefault();
          dismiss();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dismiss();
        }}
      >
        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            aria-label="Close confirmation"
            disabled={pending}
            onClick={dismiss}
            className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40"
          >
            <X size={18} />
          </button>
          <div
            className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${options?.variant === "primary" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}
          >
            {options?.variant === "primary" ? (
              <CheckCircle2 size={23} aria-hidden="true" />
            ) : (
              <Trash2 size={23} aria-hidden="true" />
            )}
          </div>
          <h2
            id={titleId}
            className="pr-5 text-xl font-semibold tracking-tight text-slate-900"
          >
            {options?.title}
          </h2>
          <p
            id={descriptionId}
            className="mt-2 text-sm leading-6 text-slate-500"
          >
            {options?.description}
          </p>
          {error && (
            <p
              role="alert"
              className="mt-4 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}
          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              ref={cancel}
              type="button"
              disabled={pending}
              onClick={dismiss}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => {
                void confirm();
              }}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-wait disabled:opacity-60 ${options?.variant === "primary" ? "bg-emerald-600 hover:bg-emerald-700 focus-visible:outline-emerald-600" : "bg-red-600 hover:bg-red-700 focus-visible:outline-red-600"}`}
            >
              {pending && <Loader2 size={16} className="animate-spin" />}
              {pending
                ? options?.pendingLabel || "Deleting..."
                : options?.confirmLabel || "Delete"}
            </button>
          </div>
        </div>
      </dialog>
    </ConfirmationContext.Provider>
  );
}

export function useConfirmation() {
  const confirm = useContext(ConfirmationContext);
  if (!confirm)
    throw new Error("useConfirmation must be used within ConfirmationProvider");
  return confirm;
}
