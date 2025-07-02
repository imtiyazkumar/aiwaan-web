import React, { useState, useMemo } from "react";
import { CreditCard, Download, Eye, Calendar, DollarSign, FileText, Filter, Search, Plus, Edit, Trash2, Send, CheckCircle } from "lucide-react";
import { Div, Flex } from "../components/general/BaseComponents";
import { Button, Select, TextInput, FormGroup, TextArea } from "../components/UiComponents";
import { useInvoices } from "../hooks/useInvoices";
import { useToast } from "../root/providers/ToastProvider";
import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import CTASection from "../components/sections/CTASection";
import GlassCard from "../components/ui/GlassCard";
import GradientText from "../components/ui/GradientText";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const Billing: React.FC = () => {
    const [filterStatus, setFilterStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingInvoice, setEditingInvoice] = useState<string | null>(null);
    const toast = useToast();

    const { useGetDocuments, useCreateDocument, useUpdateDocument, useDeleteDocument } = useInvoices();
    const { data: invoices = [], isLoading, error } = useGetDocuments();
    const createInvoice = useCreateDocument();
    const updateInvoice = useUpdateDocument();
    const deleteInvoice = useDeleteDocument();

    // Form state for creating/editing invoices
    const [formData, setFormData] = useState({
        invoice_number: "",
        client_name: "",
        client_email: "",
        amount: 0,
        status: "draft",
        due_date: "",
        services: [] as string[],
        notes: "",
        project_id: ""
    });

    // Calculate stats from real data
    const stats = useMemo(() => {
        const totalRevenue = invoices
            .filter(invoice => invoice.status === "paid")
            .reduce((sum, invoice) => sum + invoice.amount, 0);

        const pendingAmount = invoices
            .filter(invoice => invoice.status === "sent" || invoice.status === "overdue")
            .reduce((sum, invoice) => sum + invoice.amount, 0);

        const thisMonthInvoices = invoices.filter(invoice => {
            const invoiceDate = new Date(invoice.$createdAt || "");
            const now = new Date();
            return invoiceDate.getMonth() === now.getMonth() &&
                invoiceDate.getFullYear() === now.getFullYear();
        }).length;

        return [
            { icon: <DollarSign size={24} />, number: `₹${totalRevenue}`, label: "Total Revenue", description: "This year" },
            { icon: <FileText size={24} />, number: invoices.length.toString(), label: "Total Invoices", description: "Generated" },
            { icon: <CreditCard size={24} />, number: `₹${pendingAmount}`, label: "Pending Amount", description: "Outstanding" },
            { icon: <Calendar size={24} />, number: thisMonthInvoices.toString(), label: "This Month", description: "New invoices" },
        ];
    }, [invoices]);

    const statusOptions = [
        { value: "", label: "All Status" },
        { value: "draft", label: "Draft" },
        { value: "sent", label: "Sent" },
        { value: "paid", label: "Paid" },
        { value: "overdue", label: "Overdue" },
    ];

    const serviceOptions = [
        "2D Floor Plans",
        "3D Modeling",
        "Interior Design",
        "Exterior Renders",
        "Landscape Design",
        "Architectural Consultation"
    ];

    // Memoized filtered invoices
    const filteredInvoices = useMemo(() => {
        return invoices.filter(invoice => {
            const matchesStatus = !filterStatus || invoice.status === filterStatus;
            const matchesSearch = !searchTerm ||
                invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                invoice.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                invoice.client_email.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [invoices, filterStatus, searchTerm]);

    // const getStatusColor = (status: string) => {
    //     switch (status) {
    //         case "paid": return "bg-success-100 text-success-700";
    //         case "sent": return "bg-warning-100 text-warning-700";
    //         case "overdue": return "bg-error-100 text-error-700";
    //         case "draft": return "bg-neutral-100 text-neutral-700";
    //         default: return "bg-primary-100 text-primary-700";
    //     }
    // };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    const generateInvoiceNumber = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
        return `INV-${year}${month}-${random}`;
    };

    const resetForm = () => {
        setFormData({
            invoice_number: generateInvoiceNumber(),
            client_name: "",
            client_email: "",
            amount: 0,
            status: "draft",
            due_date: "",
            services: [],
            notes: "",
            project_id: ""
        });
        setEditingInvoice(null);
        setShowCreateForm(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: id === "amount" ? Number(value) : value
        }));
    };

    const handleServiceToggle = (service: string) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter(s => s !== service)
                : [...prev.services, service]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingInvoice) {
                await updateInvoice.mutateAsync({ documentId: editingInvoice, data: formData });
                toast.success("Invoice updated successfully!");
            } else {
                await createInvoice.mutateAsync(formData);
                toast.success("Invoice created successfully!");
            }
            resetForm();
        } catch (error) {
            console.error("Error saving invoice:", error);
            toast.error("Failed to save invoice");
        }
    };

    const handleEdit = (invoice: any) => {
        setFormData({
            invoice_number: invoice.invoice_number,
            client_name: invoice.client_name,
            client_email: invoice.client_email,
            amount: invoice.amount,
            status: invoice.status,
            due_date: invoice.due_date,
            services: invoice.services || [],
            notes: invoice.notes || "",
            project_id: invoice.project_id || ""
        });
        setEditingInvoice(invoice.$id);
        setShowCreateForm(true);
    };

    const handleDelete = async (invoiceId: string, invoiceNumber: string) => {
        if (!window.confirm(`Are you sure you want to delete invoice "${invoiceNumber}"?`)) {
            return;
        }

        try {
            await deleteInvoice.mutateAsync(invoiceId);
            toast.success("Invoice deleted successfully!");
        } catch (error) {
            console.error("Error deleting invoice:", error);
            toast.error("Failed to delete invoice");
        }
    };

    const handleStatusChange = async (invoiceId: string, newStatus: string) => {
        try {
            await updateInvoice.mutateAsync({
                documentId: invoiceId,
                data: { status: newStatus }
            });
            toast.success(`Invoice status updated to ${newStatus}`);
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    if (isLoading) {
        return (
            <Div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </Div>
        );
    }

    if (error) {
        return (
            <Div className="min-h-screen flex items-center justify-center">
                <Div className="text-center">
                    <h2 className="text-24 font-bold text-error-600 mb-4">Error Loading Invoices</h2>
                    <p className="text-secondary-600">Please try again later.</p>
                </Div>
            </Div>
        );
    }

    return (
        <Div className="max-w-[1200px] mx-auto overflow-hidden">
            {/* Hero Section */}
            <HeroSection
                title="Billing &"
                subtitle="Invoices"
                description="Manage your project invoices, track payments, and monitor your business revenue. Keep your financial records organized and accessible."
                backgroundImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                primaryButtonText="Create Invoice"
                primaryButtonLink="#"
                secondaryButtonText="View Reports"
                secondaryButtonLink="#reports"
                height="md"
            />

            {/* Billing Stats */}
            <StatsSection stats={stats} columns={4} />

            {/* Create/Edit Invoice Form */}
            {showCreateForm && (
                <Div

                    className="py-8 px-4"
                >
                    <GlassCard className="p-8">
                        <Div className="flex justify-between items-center mb-6">
                            <h3 className="text-24 font-bold text-secondary-800">
                                {editingInvoice ? "Edit" : "Create New"} Invoice
                            </h3>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={resetForm}
                                label="Cancel"
                            />
                        </Div>

                        <form onSubmit={handleSubmit}>
                            <FormGroup>
                                <TextInput
                                    id="invoice_number"
                                    label="Invoice Number"
                                    value={formData.invoice_number}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Select
                                    id="status"
                                    label="Status"
                                    options={statusOptions.slice(1)}
                                    value={formData.status}
                                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                                />
                            </FormGroup>

                            <FormGroup className="mt-6">
                                <TextInput
                                    id="client_name"
                                    label="Client Name"
                                    value={formData.client_name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <TextInput
                                    id="client_email"
                                    type="email"
                                    label="Client Email"
                                    value={formData.client_email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>

                            <FormGroup className="mt-6">
                                <TextInput
                                    id="amount"
                                    type="number"
                                    label="Amount (₹)"
                                    value={formData.amount.toString()}
                                    onChange={handleInputChange}
                                    required
                                />
                                <TextInput
                                    id="due_date"
                                    type="date"
                                    label="Due Date"
                                    value={formData.due_date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </FormGroup>

                            <Div className="mt-6">
                                <label className="block text-secondary-700 mb-2">Services</label>
                                <Div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {serviceOptions.map(service => (
                                        <label key={service} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.services.includes(service)}
                                                onChange={() => handleServiceToggle(service)}
                                                className="mr-2"
                                            />
                                            <span className="text-14">{service}</span>
                                        </label>
                                    ))}
                                </Div>
                            </Div>

                            <Div className="mt-6">
                                <TextArea
                                    id="notes"
                                    label="Notes (Optional)"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    rows={3}
                                />
                            </Div>

                            <Div className="mt-8 flex justify-end space-x-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={resetForm}
                                    label="Cancel"
                                />
                                <Button
                                    type="submit"
                                    variant="primary"
                                    label={editingInvoice ? "Update Invoice" : "Create Invoice"}
                                    isLoading={createInvoice.isPending || updateInvoice.isPending}
                                />
                            </Div>
                        </form>
                    </GlassCard>
                </Div>
            )}

            {/* Filters and Search */}
            <Div

                className="py-8 px-4"
            >
                <GlassCard className="p-6 mb-8">
                    <Flex className="flex-col gap-4">
                        <Flex className="flex-col md:flex-row gap-4 items-start md:items-end">
                            <Div className="flex-1">
                                <TextInput
                                    id="search"
                                    label="Search Invoices"
                                    placeholder="Search by invoice ID, client name, or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    icon={<Search size={20} className="text-neutral-400" />}
                                />
                            </Div>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowFilters(!showFilters)}
                                label="Filters"
                                icon={<Filter size={16} className="mr-2" />}
                                className="w-full md:w-auto"
                            />
                            <Button
                                type="button"
                                variant="primary"
                                onClick={() => {
                                    setFormData(prev => ({ ...prev, invoice_number: generateInvoiceNumber() }));
                                    setShowCreateForm(true);
                                }}
                                label="New Invoice"
                                icon={<Plus size={16} className="mr-2" />}
                                className="w-full md:w-auto"
                            />
                        </Flex>

                        {showFilters && (
                            <Div

                                className="overflow-hidden"
                            >
                                <Flex className="pt-4 border-t border-neutral-200">
                                    <Div className="w-full md:w-48">
                                        <Select
                                            id="filterStatus"
                                            label="Status"
                                            options={statusOptions}
                                            value={filterStatus}
                                            onChange={(e) => setFilterStatus(e.target.value)}
                                        />
                                    </Div>
                                </Flex>
                            </Div>
                        )}
                    </Flex>
                </GlassCard>
            </Div>

            {/* Invoices List */}
            <Div

                className="py-8 px-4"
            >
                <Div className="flex justify-between items-center mb-8">
                    <Div>
                        <h2 className="text-24 md:text-32 font-bold text-secondary-800 font-display">
                            <GradientText>Invoice</GradientText> Management
                        </h2>
                        <p className="text-secondary-600 mt-2">
                            {filteredInvoices.length} invoice{filteredInvoices.length !== 1 ? "s" : ""} found
                        </p>
                    </Div>
                </Div>

                {filteredInvoices.length === 0 ? (
                    <Div className="text-center py-16">
                        <Div className="text-64 mb-4">📄</Div>
                        <h3 className="text-24 font-bold text-secondary-700 mb-2">No Invoices Found</h3>
                        <p className="text-secondary-600 mb-6">
                            {invoices.length === 0
                                ? "Start by creating your first invoice for a project."
                                : "Try adjusting your search criteria or filters."
                            }
                        </p>
                        <Button
                            type="button"
                            variant="primary"
                            onClick={() => {
                                setFormData(prev => ({ ...prev, invoice_number: generateInvoiceNumber() }));
                                setShowCreateForm(true);
                            }}
                            label="Create First Invoice"
                            icon={<FileText size={16} className="mr-2" />}
                        />
                    </Div>
                ) : (
                    <Div className="space-y-4">
                        {filteredInvoices.map((invoice) => (
                            <Div
                                key={invoice.$id}

                            >
                                <GlassCard className="p-6 hover:shadow-lg transition-all duration-300">
                                    <Div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                        {/* Invoice Info */}
                                        <Div className="md:col-span-3">
                                            <h3 className="text-16 font-bold text-secondary-800 mb-1">
                                                {invoice.invoice_number}
                                            </h3>
                                            <p className="text-14 text-secondary-600 mb-2">
                                                {invoice.client_name}
                                            </p>
                                            <p className="text-12 text-secondary-500">
                                                {invoice.client_email}
                                            </p>
                                        </Div>

                                        {/* Services */}
                                        <Div className="md:col-span-3">
                                            <p className="text-12 text-secondary-500 mb-1">Services</p>
                                            <Div className="flex flex-wrap gap-1">
                                                {invoice.services?.slice(0, 2).map((service, i) => (
                                                    <span key={i} className="text-10 bg-primary-100 text-primary-700 px-2 py-1 rounded">
                                                        {service}
                                                    </span>
                                                ))}
                                                {invoice.services?.length > 2 && (
                                                    <span className="text-10 bg-neutral-100 text-neutral-600 px-2 py-1 rounded">
                                                        +{invoice.services.length - 2} more
                                                    </span>
                                                )}
                                            </Div>
                                        </Div>

                                        {/* Amount */}
                                        <Div className="md:col-span-2 text-center">
                                            <p className="text-12 text-secondary-500 mb-1">Amount</p>
                                            <p className="text-18 font-bold text-secondary-800">
                                                ₹{invoice.amount}
                                            </p>
                                        </Div>

                                        {/* Dates */}
                                        <Div className="md:col-span-2 text-center">
                                            <p className="text-12 text-secondary-500 mb-1">Due Date</p>
                                            <p className="text-12 text-secondary-600">
                                                {formatDate(invoice.due_date)}
                                            </p>
                                            {invoice.$createdAt && (
                                                <p className="text-10 text-secondary-500">
                                                    Created: {formatDate(invoice.$createdAt)}
                                                </p>
                                            )}
                                        </Div>

                                        {/* Status & Actions */}
                                        <Div className="md:col-span-2 flex flex-col items-center space-y-2">
                                            <Select
                                                id={`status-${invoice.$id}`}
                                                options={statusOptions.slice(1)}
                                                value={invoice.status}
                                                onChange={(e) => handleStatusChange(invoice.$id!, e.target.value)}
                                                className="text-12"
                                            />
                                            <Div className="flex space-x-2">
                                                <button
                                                    className="p-2 text-primary-base hover:bg-primary-100 rounded-lg transition-colors"
                                                    title="View Invoice"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(invoice)}
                                                    className="p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                                                    title="Edit Invoice"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    className="p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
                                                    title="Download Invoice"
                                                >
                                                    <Download size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(invoice.$id!, invoice.invoice_number)}
                                                    className="p-2 text-error-600 hover:bg-error-100 rounded-lg transition-colors"
                                                    title="Delete Invoice"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </Div>
                                        </Div>
                                    </Div>
                                </GlassCard>
                            </Div>
                        ))}
                    </Div>
                )}
            </Div>

            {/* CTA Section */}
            <CTASection
                title="Streamline Your Billing Process"
                description="Take control of your project finances with our comprehensive billing management system. Track payments, generate reports, and keep your business organized."
                primaryButtonText="Create Invoice"
                primaryButtonLink="#"
                backgroundGradient="accent"
            />
        </Div>
    );
};

export default Billing;
