import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/api';
import { Table } from '~/components/ui/Table';
interface Message { id: string; name: string; email: string; phone: string | null; message: string; created_at: string; }
export default function ContactInbox() {
 const client = useQueryClient();
 const { data, isLoading, error } = useQuery({ queryKey: ['contact'], queryFn: () => api.get<{ data: Message[] }>('/contact') });
 const remove = useMutation({ mutationFn: (id: string) => api.delete(`/contact/${id}`), onSuccess: () => client.invalidateQueries({ queryKey: ['contact'] }) });
 return <div className="w-full p-6 bg-white rounded-2xl"><h1 className="text-2xl font-bold mb-6">Contact Messages</h1>
 {error && <p role="alert">{error.message}</p>}{remove.error && <p role="alert">{remove.error.message}</p>}
 <Table data={data?.data || []} isLoading={isLoading} columns={[
 { header: 'Name', accessor: m => m.name }, { header: 'Email', accessor: m => m.email },
 { header: 'Phone', accessor: m => m.phone || '-' }, { header: 'Message', accessor: m => m.message },
 { header: 'Actions', accessor: m => <button disabled={remove.isPending} onClick={() => { if (confirm('Delete this message?')) remove.mutate(m.id); }}>Delete</button> }
 ]} /></div>;
}
