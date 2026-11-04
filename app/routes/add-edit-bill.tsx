import { ProtectedRoute } from "~/components/ProtectedRoute";
import { useSearchParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Div, Flex } from "~/components/general/BaseComponents";
import TextInput from "~/components/general/TextInput";
import Button from "~/components/buttons/Button";
import TitleCard from "~/components/cards/TitleCard";
import SelectInput from "~/components/general/Select";

import BillingQuery from "~/apiService/billing/billingQuery";
import ProjectQuery from "~/apiService/project/projectQuery";
import OrderQuery from "~/apiService/order/orderQuery";
import UserQuery from "~/apiService/user/userQuery";

function generateInvoiceId() {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `INV-${year}-${rand}`;
}

function AddEditBillContent() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const billId = searchParams.get("id");
  const isEditMode = !!billId;
  const {
    data: existingBill,
    isLoading: billLoading,
    error: billError,
    refetch: reloadBill,
  } = BillingQuery.useQueryGetBill(billId || undefined);
  const [formError, setFormError] = useState("");

  const { data: projectData } = ProjectQuery.useQueryGetAdminProjects();

  const { data: orderData } = OrderQuery.useQueryGetAdminOrders();

  const projects = projectData?.projects || [];
  const orders = orderData?.orders || [];

  const { data: users = [] } = UserQuery.useQueryGetAdminUsers();

  const createMutation = BillingQuery.useMutationCreateBill();
  const updateMutation = BillingQuery.useMutationUpdateBill();

  const [formData, setFormData] = useState({
    user_id: "",
    project_id: "",
    order_id: "",
    amount: 0,
    discount: 0,
    final_amount: 0,
    status: "pending",
    due_date: "",
    invoice_id: generateInvoiceId(),
  });

  useEffect(() => {
    const finalAmount = Math.max(
      Number(formData.amount) - Number(formData.discount),
      0,
    );
    setFormData((prev) => ({ ...prev, final_amount: finalAmount }));
  }, [formData.amount, formData.discount]);

  useEffect(() => {
    if (!existingBill) return;
    setFormData({
      user_id: existingBill.user_id || "",
      project_id: existingBill.project_id || "",
      order_id: existingBill.order_id || "",
      amount: existingBill.amount || 0,
      discount: existingBill.discount || 0,
      final_amount: existingBill.final_amount ?? existingBill.amount,
      status: existingBill.status || "pending",
      due_date: existingBill.due_date?.slice(0, 10) || "",
      invoice_id: existingBill.invoice_id || generateInvoiceId(),
    });
  }, [existingBill]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderChange = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    setFormData((prev) => ({
      ...prev,
      order_id: orderId,
      amount: order?.amount || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const payload = {
      user_id: formData.user_id,
      project_id: formData.project_id || null,
      order_id: formData.order_id || null,
      invoice_id: formData.invoice_id,
      amount: Number(formData.amount),
      discount: Number(formData.discount),
      final_amount: Number(formData.final_amount),
      status: formData.status,
      due_date: formData.due_date || null,
    };

    const mutation = billId ? updateMutation : createMutation;
    mutation.mutate({ ...payload, ...(billId ? { id: billId } : {}) } as any, {
      onSuccess: (saved) => {
        navigate(`/billing/${saved.id}`);
      },
      onError: (err: any) => {
        setFormError(err.message || "Unable to save the bill.");
      },
    });
  };

  if (isEditMode && billLoading)
    return (
      <Div
        role="status"
        className="w-full rounded-2xl bg-white p-10 text-center text-slate-500"
      >
        Loading invoice...
      </Div>
    );
  if (isEditMode && billError)
    return (
      <Div role="alert" className="w-full rounded-2xl bg-white p-8">
        <p className="mb-4 text-red-700">{billError.message}</p>
        <Button onClick={() => reloadBill()}>Try Again</Button>
      </Div>
    );
  return (
    <Div className="w-full rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100"
      >
        {formError && (
          <p
            role="alert"
            className="rounded-xl bg-red-50 p-4 text-sm text-red-700"
          >
            {formError}
          </p>
        )}
        <div className="mb-6 flex items-center justify-between gap-4">
          <TitleCard
            title={isEditMode ? "Edit Bill" : "Create New Bill"}
            className="mx-0 mb-0 sm:mb-0"
          />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectInput
            label="User / Client"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            options={[
              { label: "Select User", value: "" },
              ...users.map((u) => ({
                label: u.full_name || u.email || u.id,
                value: u.id,
              })),
            ]}
          />

          <TextInput
            label="Invoice ID"
            name="invoice_id"
            value={formData.invoice_id}
            disabled
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectInput
            label="Project"
            name="project_id"
            value={formData.project_id}
            onChange={handleChange}
            options={[
              { label: "Select Project (optional)", value: "" },
              ...projects.map((p) => ({ label: p.title, value: p.id })),
            ]}
          />

          <SelectInput
            label="Order"
            name="order_id"
            value={formData.order_id}
            onChange={(e) => handleOrderChange(e.target.value)}
            options={[
              { label: "Select Order (optional)", value: "" },
              ...orders.map((o) => ({ label: o.id, value: o.id })),
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TextInput
            label="Amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            required
          />

          <TextInput
            label="Discount"
            name="discount"
            type="number"
            value={formData.discount}
            onChange={handleChange}
          />

          <TextInput
            label="Final Payable Amount"
            name="final_amount"
            type="number"
            value={formData.final_amount}
            disabled
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectInput
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={[
              { label: "Pending", value: "pending" },
              { label: "Paid", value: "paid" },
              { label: "Overdue", value: "overdue" },
            ]}
          />

          <TextInput
            label="Due Date"
            name="due_date"
            type="date"
            value={formData.due_date}
            onChange={handleChange}
          />
        </div>

        <Flex className="gap-4 pt-4 justify-end">
          <Button
            type="button"
            onClick={() =>
              navigate(billId ? `/billing/${billId}` : "/admin/bills")
            }
            variant="dark_outlined"
            height="medium"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary_filled"
            height="medium"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {createMutation.isPending
              ? "Saving..."
              : isEditMode
                ? "Update Bill"
                : "Create Bill"}
          </Button>
        </Flex>
      </form>
    </Div>
  );
}

export default function AddEditBill() {
  return (
    <ProtectedRoute>
      <AddEditBillContent />
    </ProtectedRoute>
  );
}
