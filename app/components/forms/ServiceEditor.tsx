import { useEffect, useState } from "react";
import { Plus, Upload, X } from "lucide-react";
import ServiceQuery from "~/apiService/service/serviceQuery";
import { api } from "~/lib/api";
import type { IService } from "~/types/service";
import Button from "~/components/buttons/Button";
import TextInput from "~/components/general/TextInput";

export default function ServiceEditor({
  service,
  onSaved,
  onCancel,
  onBusyChange,
}: {
  service?: IService;
  onSaved: (id: string) => void;
  onCancel: () => void;
  onBusyChange?: (busy: boolean) => void;
}) {
  const create = ServiceQuery.useMutationCreateService();
  const update = ServiceQuery.useMutationUpdateService();
  const [form, setForm] = useState({
    title: service?.title || "",
    description: service?.description || "",
    tag: service?.tag || "",
    icon: service?.icon || "",
    button_title: service?.button_title || "Explore",
    image_url: service?.image_url || "",
    features: service?.features || [],
    is_featured: service?.isFeatured || false,
  });
  const [feature, setFeature] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const busy = uploading || create.isPending || update.isPending;
  useEffect(() => {
    onBusyChange?.(busy);
  }, [busy, onBusyChange]);
  const addFeature = () => {
    if (feature.trim()) {
      setForm((previous) => ({
        ...previous,
        features: [...previous.features, feature.trim()],
      }));
      setFeature("");
    }
  };
  return (
    <form
      className="space-y-5"
      onSubmit={async (event) => {
        event.preventDefault();
        if (busy) return;
        setError("");
        try {
          const saved = service
            ? await update.mutateAsync({
                ...form,
                title: form.title.trim(),
                id: service.id,
              })
            : await create.mutateAsync({ ...form, title: form.title.trim() });
          onSaved(saved.id);
        } catch (cause) {
          setError(
            cause instanceof Error ? cause.message : "Unable to save service.",
          );
        }
      }}
    >
      {error && (
        <p
          role="alert"
          className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}
      <fieldset disabled={busy} className="space-y-5 disabled:opacity-60">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            label="Title"
            value={form.title}
            required
            onChange={(event) =>
              setForm({ ...form, title: event.target.value })
            }
          />
          <TextInput
            label="Tag"
            value={form.tag}
            onChange={(event) => setForm({ ...form, tag: event.target.value })}
          />
        </div>
        <div>
          <label
            htmlFor="service-description"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Description
          </label>
          <textarea
            id="service-description"
            rows={4}
            required
            value={form.description}
            onChange={(event) =>
              setForm({ ...form, description: event.target.value })
            }
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextInput
            label="Button title"
            value={form.button_title}
            onChange={(event) =>
              setForm({ ...form, button_title: event.target.value })
            }
          />
          <TextInput
            label="Icon"
            value={form.icon}
            onChange={(event) => setForm({ ...form, icon: event.target.value })}
          />
        </div>
        <TextInput
          label="Image URL"
          type="url"
          value={form.image_url}
          onChange={(event) =>
            setForm({ ...form, image_url: event.target.value })
          }
        />
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700">
          <Upload size={16} />
          {uploading ? "Uploading..." : "Upload image"}
          <input
            type="file"
            className="sr-only"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={async (event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              setUploading(true);
              setError("");
              try {
                const body = new FormData();
                body.set("bucket", "service-images");
                body.set("file", file);
                const image = await api.upload(body);
                setForm((previous) => ({
                  ...previous,
                  image_url: image.publicUrl,
                }));
              } catch (cause) {
                setError(
                  cause instanceof Error
                    ? cause.message
                    : "Unable to upload image.",
                );
              } finally {
                setUploading(false);
              }
            }}
          />
        </label>
        {form.image_url && (
          <img
            src={form.image_url}
            alt="Service preview"
            className="h-28 w-44 rounded-xl object-cover"
          />
        )}
        <div className="border-t border-slate-100 pt-4">
          <label
            htmlFor="service-feature"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Features
          </label>
          <div className="flex gap-2">
            <input
              id="service-feature"
              value={feature}
              onChange={(event) => setFeature(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addFeature();
                }
              }}
              placeholder="Add a feature"
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm"
            />
            <button
              type="button"
              disabled={!feature.trim()}
              onClick={addFeature}
              className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-3 text-sm disabled:opacity-40"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
          <ul className="mt-3 space-y-2">
            {form.features.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600"
              >
                {item}
                <button
                  type="button"
                  aria-label={`Remove ${item}`}
                  onClick={() =>
                    setForm({
                      ...form,
                      features: form.features.filter(
                        (_, position) => position !== index,
                      ),
                    })
                  }
                  className="rounded p-1 text-slate-400 hover:text-red-600"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={form.is_featured}
            onChange={(event) =>
              setForm({ ...form, is_featured: event.target.checked })
            }
          />
          Feature on homepage
        </label>
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
          <Button type="button" variant="dark_outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" loading={busy} disabled={!form.title.trim()}>
            {service ? "Save Changes" : "Create Service"}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
