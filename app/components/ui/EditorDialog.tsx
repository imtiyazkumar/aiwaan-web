import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

export default function EditorDialog({
  open,
  title,
  busy = false,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  busy?: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();
  useEffect(() => {
    if (open) {
      previousFocus.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      dialog.current?.showModal();
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        dialog.current?.close();
        document.body.style.overflow = previousOverflow;
        if (previousFocus.current?.isConnected) previousFocus.current.focus();
      };
    }
  }, [open]);
  return (
    <dialog
      ref={dialog}
      className="confirmation-dialog entity-editor-dialog"
      aria-labelledby={titleId}
      aria-busy={busy}
      onCancel={(event) => {
        event.preventDefault();
        if (!busy) onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && !busy) onClose();
      }}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-7">
        <h2 id={titleId} className="text-xl font-semibold text-slate-900">
          {title}
        </h2>
        <button
          type="button"
          aria-label="Close editor"
          disabled={busy}
          onClick={onClose}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 disabled:opacity-40"
        >
          <X size={20} />
        </button>
      </div>
      <div className="p-5 sm:p-7">{open && children}</div>
    </dialog>
  );
}
