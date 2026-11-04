import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useAuth } from "~/contexts/AuthContext";
import { useConfirmation } from "~/contexts/ConfirmationContext";
import { api } from "~/lib/api";

const keys = {
  projects: "project",
  services: "service",
  orders: "orders",
  bills: "billing",
  testimonials: "TESTIMONIAL",
  users: "user",
  contact: "contact",
};
interface Props {
  resource: keyof typeof keys;
  id: string;
  name?: string;
  editPath?: string;
  onEdit?: () => void;
  ownerId?: string | null;
  deleteRedirect?: string;
}

export default function EntityActionsMenu({
  resource,
  id,
  name,
  editPath,
  onEdit,
  ownerId,
  deleteRedirect,
}: Props) {
  const { profile } = useAuth();
  const confirm = useConfirmation();
  const client = useQueryClient();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const label = resource === "contact" ? "message" : resource.replace(/s$/, "");
  const allowed =
    !!profile?.is_admin ||
    (resource === "testimonials" && !!profile && ownerId === profile.id);
  const canDelete = resource !== "users";
  const canEdit = !!editPath || !!onEdit;
  const remove = useMutation({
    mutationFn: () => api.delete(`/${resource}/${id}`),
    onSuccess: async () => {
      if (deleteRedirect) navigate(deleteRedirect, { replace: true });
      await Promise.all([
        client.invalidateQueries({ queryKey: [keys[resource]] }),
        ...(resource === "testimonials"
          ? [client.invalidateQueries({ queryKey: ["TESTIMONIAL_FEATURED"] })]
          : []),
      ]);
    },
  });
  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };
  const show = () => {
    const bounds = trigger.current?.getBoundingClientRect();
    if (!bounds) return;
    const height = (Number(canEdit) + Number(canDelete)) * 44 + 8;
    setPosition({
      top:
        bounds.bottom + height + 12 <= window.innerHeight
          ? bounds.bottom + 6
          : Math.max(8, bounds.top - height - 6),
      left: Math.max(8, Math.min(bounds.right - 192, window.innerWidth - 200)),
    });
    setOpen(true);
  };
  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !menu.current?.contains(event.target) &&
        !trigger.current?.contains(event.target)
      )
        setOpen(false);
    };
    const reposition = () => setOpen(false);
    document.addEventListener("pointerdown", outside);
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [open]);

  if (!allowed || (!canEdit && !canDelete)) return null;
  return (
    <>
      <button
        ref={trigger}
        type="button"
        title="More actions"
        aria-label={`Actions for ${name || label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        disabled={remove.isPending}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50"
        onClick={(event) => {
          event.stopPropagation();
          if (open) close();
          else show();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            event.stopPropagation();
            show();
          }
        }}
      >
        <MoreVertical size={20} />
      </button>
      {open &&
        createPortal(
          <div
            ref={menu}
            id={menuId}
            role="menu"
            aria-label={`${label} actions`}
            className="fixed z-[80] w-48 rounded-xl border border-slate-200 bg-white p-1 shadow-xl"
            style={position}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              event.stopPropagation();
              const items = Array.from(
                menu.current?.querySelectorAll<HTMLElement>(
                  '[role="menuitem"]',
                ) || [],
              );
              const index = items.indexOf(
                document.activeElement as HTMLElement,
              );
              if (event.key === "Escape" || event.key === "Tab") {
                if (event.key === "Escape") event.preventDefault();
                close();
              } else if (
                ["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)
              ) {
                event.preventDefault();
                const next =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? items.length - 1
                      : (index +
                          (event.key === "ArrowDown" ? 1 : -1) +
                          items.length) %
                        items.length;
                items[next]?.focus();
              }
            }}
          >
            {onEdit ? (
              <button
                role="menuitem"
                tabIndex={-1}
                type="button"
                onClick={() => {
                  close();
                  onEdit();
                }}
                className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none hover:bg-slate-50 focus:bg-slate-100"
              >
                <Pencil size={16} />
                Edit
              </button>
            ) : (
              editPath && (
                <Link
                  role="menuitem"
                  tabIndex={-1}
                  to={editPath}
                  onClick={close}
                  className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none hover:bg-slate-50 focus:bg-slate-100"
                >
                  <Pencil size={16} />
                  Edit
                </Link>
              )
            )}
            {canDelete && (
              <button
                role="menuitem"
                tabIndex={-1}
                type="button"
                className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 outline-none hover:bg-red-50 focus:bg-red-50"
                onClick={() => {
                  close();
                  confirm({
                    title: `Delete ${label}?`,
                    description: `${name ? `“${name}”` : `This ${label}`} will be permanently deleted. This action cannot be undone.`,
                    onConfirm: () => remove.mutateAsync(),
                  });
                }}
              >
                <Trash2 size={16} />
                Delete
              </button>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
