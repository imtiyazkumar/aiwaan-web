import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/lib/api";
import { Loader2, Trash2 } from "lucide-react";
import { useConfirmation } from "~/contexts/ConfirmationContext";

export default function DeleteRecordButton({
  resource,
  id,
  queryKey,
}: {
  resource: string;
  id: string;
  queryKey: string;
}) {
  const client = useQueryClient();
  const confirm = useConfirmation();
  const remove = useMutation({
    mutationFn: () => api.delete(`/${resource}/${id}`),
    onSuccess: () => client.invalidateQueries({ queryKey: [queryKey] }),
  });
  const label = `Delete ${resource === "contact" ? "message" : resource.replace(/s$/, "")}`;
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50"
      disabled={remove.isPending}
      aria-busy={remove.isPending}
      onClick={(event) => {
        event.stopPropagation();
        confirm({
          title: `${label}?`,
          description:
            "This record will be permanently deleted. This action cannot be undone.",
          onConfirm: () => remove.mutateAsync(),
        });
      }}
    >
      {remove.isPending ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Trash2 size={18} />
      )}
    </button>
  );
}
