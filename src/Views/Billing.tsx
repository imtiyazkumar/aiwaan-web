import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Download, Eye, Calendar, DollarSign, FileText, Filter, Search, Plus, Edit, Trash2 } from "lucide-react";
import { Div, Flex } from "../components/general/BaseComponents";
import { Button, Select, TextInput } from "../components/UiComponents";
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
    const toast = useToast();

    const { useGetDocuments, useDeleteDocument } = useInvoices();
    const { data: invoices = [], isLoading, error } = useGetDocuments();
    const deleteInvoice = useDeleteDocument();

    // Calculate stats from real data
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

    const billingStats = [
        { icon: <DollarSign size={24} />, number: `₹${totalRevenue}`, label: "Total Revenue", description: "This year" },
        { icon: <FileText size={24} />, number: invoices.length.toString(), label: "Total Invoices", description: "Generated" },
        { icon: <CreditCard size={24} />, number: `₹${pendingAmount}`, label: "Pending Amount", description: "Outstanding" },
        { icon: <Calendar size={24} />, number: thisMonthInvoices.toString(), label: "This Month", description: "New invoices" },
    ];

    const statusOptions = [
        { value: "", label: "All Status" },
        { value: "draft", label: "Draft" },
        { value: "sent", label: "Sent" },
        { value: "paid", label: "Paid" },
        { value: "overdue", label: "Overdue" },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "paid": return "bg-success-100 text-success-700";
            case "sent": return "bg-warning-100 text-warning-700";
            case "overdue": return "bg-error-100 text-error-700";
            case "draft": return "bg-neutral-100 text-neutral-700";
            default: return "bg-primary-100 text-primary-700";
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    const filteredInvoices = invoices.filter(invoice => {
        const matchesStatus = !filterStatus || invoice.status === filterStatus;
        const matchesSearch = !searchTerm ||
            invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.client_email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const handleDeleteInvoice = async (invoiceId: string, invoiceNumber: string) => {
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
                primaryButtonLink="/add-edit-project"
                secondaryButtonText="View Reports"
                secondaryButtonLink="#reports"
                height="md"
            />

            {/* Billing Stats */}
            <StatsSection stats={billingStats} columns={4} />

            {/* Filters and Search */}
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="py-8 px-4"
            >
                <GlassCard className="p-6 mb-8">
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
                        <Div className="w-full md:w-48">
                            <Select
                                id="filterStatus"
                                label="Status"
                                options={statusOptions}
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            />
                        </Div>
                        <Button
                            type="submit"
                            variant="outline"
                            label="More Filters"
                            icon={<Filter size={16} className="mr-2" />}
                            className="w-full md:w-auto"
                        />

                        <Button
                            type="submit"
                            variant="outline"
                            label=" New Invoice"
                            icon={<Plus size={16} className="mr-2" />}
                            className="w-full md:w-auto"
                        />
                    </Flex>
                </GlassCard>
            </motion.div>

            {/* Invoices List */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
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
                            type="submit"
                            variant="outline"
                            label="Create First Invoice"
                            icon={<FileText size={16} className="mr-2" />}
                            className="w-full md:w-auto"
                        />
                    </Div>
                ) : (
                    <Div className="space-y-4">
                        {filteredInvoices?.map((invoice, index) => (
                            <motion.div
                                key={invoice.$id}
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                                                {invoice.services?.map((service, i) => (
                                                    <span key={i} className="text-10 bg-primary-100 text-primary-700 px-2 py-1 rounded">
                                                        {service}
                                                    </span>
                                                ))}
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
                                            <span className={`text-12 px-3 py-1 rounded-full font-medium ${getStatusColor(invoice.status)}`}>
                                                {/* {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)} */}
                                            </span>
                                            <Div className="flex space-x-2">
                                                <button className="p-2 text-primary-base hover:bg-primary-100 rounded-lg transition-colors">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors">
                                                    <Edit size={16} />
                                                </button>
                                                <button className="p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors">
                                                    <Download size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteInvoice(invoice.$id!, invoice.invoice_number)}
                                                    className="p-2 text-error-600 hover:bg-error-100 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </Div>
                                        </Div>
                                    </Div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </Div>
                )}
            </motion.div>

            {/* CTA Section */}
            <CTASection
                title="Streamline Your Billing Process"
                description="Take control of your project finances with our comprehensive billing management system. Track payments, generate reports, and keep your business organized."
                primaryButtonText="Upgrade Billing"
                primaryButtonLink="/contact"
                backgroundGradient="accent"
            />
        </Div>
    );
};

export default Billing;
