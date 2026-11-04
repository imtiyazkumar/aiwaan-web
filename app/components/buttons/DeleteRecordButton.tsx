import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';

export default function DeleteRecordButton({ resource, id, queryKey }: { resource: string; id: string; queryKey: string }) {
    const client = useQueryClient();
    const remove = useMutation({
        mutationFn: () => api.delete(`/${resource}/${id}`),
        onSuccess: () => client.invalidateQueries({ queryKey: [queryKey] }),
        onError: (error: Error) => alert(error.message),
    });
    return <button type="button" className="text-red-700 hover:underline disabled:opacity-50" disabled={remove.isPending} onClick={event => {
        event.stopPropagation();
        if (confirm('Delete this record?')) remove.mutate();
    }}>{remove.isPending ? 'Deleting...' : 'Delete'}</button>;
}
