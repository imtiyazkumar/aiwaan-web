import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Download, Eye, Calendar, DollarSign, FileText, Filter, Search } from "lucide-react";
import { Div, Flex } from "../components/general/BaseComponents";
import { Button, Select, TextInput } from "../components/UiComponents";
import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import CTASection from "../components/sections/CTASection";
import GlassCard from "../components/ui/GlassCard";
import GradientText from "../components/ui/GradientText";

const Billing: React.FC = () => {
    const [filterStatus, setFilterStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // Mock billing data - in real app, this would come from API
    const billingStats = [
        { icon: <DollarSign size={24} />, number: "₹2,45,000", label: "Total Revenue", description: "This year" },
        { icon: <FileText size={24} />, number: "23", label: "Total Invoices", description: "Generated" },
        { icon: <CreditCard size={24} />, number: "₹45,000", label: "Pending Amount", description: "Outstanding" },
        { icon: <Calendar size={24} />, number: "5", label: "This Month", description: "New invoices" },
    ];

    const invoices = [
        {
            id: "INV-001",
            projectName: "Modern Kashmiri Villa",
            clientName: "Rajesh Kumar",
            amount: 75000,
            status: "paid",
            date: "2024-01-15",
            dueDate: "2024-01-30",
            services: ["3D Modeling", "Interior Design"]
        },
        {
            id: "INV-002",
            projectName: "Sopore Business Hub",
            clientName: "Priya Sharma",
            amount: 120000,
            status: "pending",
            date: "2024-01-20",
            dueDate: "2024-02-05",
            services: ["Architectural Design", "3D Rendering"]
        },
        {
            id: "INV-003",
            projectName: "Traditional Houseboat",
            clientName: "Mohammed Ali",
            amount: 45000,
            status: "overdue",
            date: "2024-01-10",
            dueDate: "2024-01-25",
            services: ["Interior Design", "2D Floor Plans"]
        },
        {
            id: "INV-004",
            projectName: "Dal Lake Pavilion",
            clientName: "Sunita Devi",
            amount: 85000,
            status: "draft",
            date: "2024-01-25",
            dueDate: "2024-02-10",
            services: ["Landscape Design", "3D Modeling"]
        },
        {
            id: "INV-005",
            projectName: "Heritage Hotel Design",
            clientName: "Arun Gupta",
            amount: 150000,
            status: "paid",
            date: "2024-01-12",
            dueDate: "2024-01-27",
            services: ["Complete Design Package"]
        }
    ];

    const statusOptions = [
        { value: "", label: "All Status" },
        { value: "paid", label: "Paid" },
        { value: "pending", label: "Pending" },
        { value: "overdue", label: "Overdue" },
        { value: "draft", label: "Draft" },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return 'bg-success-100 text-success-700';
            case 'pending': return 'bg-warning-100 text-warning-700';
            case 'overdue': return 'bg-error-100 text-error-700';
            case 'draft': return 'bg-neutral-100 text-neutral-700';
            default: return 'bg-primary-100 text-primary-700';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const filteredInvoices = invoices.filter(invoice => {
        const matchesStatus = !filterStatus || invoice.status === filterStatus;
        const matchesSearch = !searchTerm ||
            invoice.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

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
                <Div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <Flex className="flex-col md:flex-row gap-4 items-start md:items-end">
                        <Div className="flex-1">
                            <TextInput
                                id="search"
                                label="Search Invoices"
                                placeholder="Search by invoice ID, project, or client..."
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
                        <Button variant="outline" className="w-full md:w-auto">
                            <Filter size={16} className="mr-2" />
                            More Filters
                        </Button>
                    </Flex>
                </Div>
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
                            {filteredInvoices.length} invoice{filteredInvoices.length !== 1 ? 's' : ''} found
                        </p>
                    </Div>
                    <Button variant="primary">
                        <FileText size={16} className="mr-2" />
                        New Invoice
                    </Button>
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
                        <Button variant="primary">
                            <FileText size={16} className="mr-2" />
                            Create First Invoice
                        </Button>
                    </Div>
                ) : (
                    <Div className="space-y-4">
                        {filteredInvoices.map((invoice, index) => (
                            <motion.div
                                key={invoice.id}
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <GlassCard className="p-6 hover:shadow-lg transition-all duration-300">
                                    <Div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                        {/* Invoice Info */}
                                        <Div className="md:col-span-3">
                                            <h3 className="text-16 font-bold text-secondary-800 mb-1">
                                                {invoice.id}
                                            </h3>
                                            <p className="text-14 text-secondary-600 mb-2">
                                                {invoice.projectName}
                                            </p>
                                            <p className="text-12 text-secondary-500">
                                                Client: {invoice.clientName}
                                            </p>
                                        </Div>

                                        {/* Services */}
                                        <Div className="md:col-span-3">
                                            <p className="text-12 text-secondary-500 mb-1">Services</p>
                                            <Div className="flex flex-wrap gap-1">
                                                {invoice.services.map((service, i) => (
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
                                                ₹{invoice.amount.toLocaleString()}
                                            </p>
                                        </Div>

                                        {/* Dates */}
                                        <Div className="md:col-span-2 text-center">
                                            <p className="text-12 text-secondary-500 mb-1">Due Date</p>
                                            <p className="text-12 text-secondary-600">
                                                {formatDate(invoice.dueDate)}
                                            </p>
                                            <p className="text-10 text-secondary-500">
                                                Created: {formatDate(invoice.date)}
                                            </p>
                                        </Div>

                                        {/* Status & Actions */}
                                        <Div className="md:col-span-2 flex flex-col items-center space-y-2">
                                            <span className={`text-12 px-3 py-1 rounded-full font-medium ${getStatusColor(invoice.status)}`}>
                                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                            </span>
                                            <Div className="flex space-x-2">
                                                <button className="p-2 text-primary-base hover:bg-primary-100 rounded-lg transition-colors">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors">
                                                    <Download size={16} />
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
