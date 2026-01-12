import { ProtectedRoute } from '~/components/ProtectedRoute';

import { CreditCard, Check } from "lucide-react";
import { Div, Flex, FlexColumn } from "~/components/general/BaseComponents";
import Button from "~/components/buttons/Button";
import { wrapperBaseClass } from "~/utils/constants";
import { supabase } from "~/lib/supabase";
import { useEffect, useState } from "react";
import { useAuth } from "~/contexts/AuthContext";

import BillingQuery from "~/apiService/billing/billingQuery";

function BillingContent() {
  const { user } = useAuth();
  const { data, isLoading: loading } = BillingQuery.useQueryGetUserBills(user?.id);
  const bills = data?.bills || [];

  // Remove existing fetchBills logic


  return (
    <FlexColumn className="w-full gap-8">
      <FlexColumn className="gap-2">
        <h1 className="text-3xl font-bold text-secondary-900">Billing & Subscription</h1>
        <p className="text-secondary-600">
          Manage your plan, billing history, and payment methods.
        </p>
      </FlexColumn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Plan */}
        <div className="lg:col-span-2 space-y-6">
          <Div className={`${wrapperBaseClass} !items-start`}>
            <Flex className="justify-between w-full mb-6">
              <FlexColumn>
                <h2 className="text-xl font-semibold text-secondary-900">Current Plan</h2>
                <p className="text-secondary-500 text-sm">You are on the <span className="font-medium text-primary-base">Pro Plan</span></p>
              </FlexColumn>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium h-fit">
                Active
              </span>
            </Flex>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-secondary-500 text-sm mb-1">Billing Cycle</p>
                <p className="font-semibold text-secondary-900">Monthly</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-secondary-500 text-sm mb-1">Next Payment</p>
                <p className="font-semibold text-secondary-900">Jan 25, 2026</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-secondary-500 text-sm mb-1">Amount</p>
                <p className="font-semibold text-secondary-900">$49.00</p>
              </div>
            </div>

            <Flex className="gap-4 w-full">
              <Button variant="dark_outlined" height="medium">
                Change Plan
              </Button>
              <Button variant="secondary_filled" className="!bg-red-50 !text-red-600 hover:!bg-red-100" height="medium">
                Cancel Subscription
              </Button>
            </Flex>
          </Div>

          <Div className={`${wrapperBaseClass} !items-start`}>
            <h2 className="text-xl font-semibold text-secondary-900 mb-6">Billing History</h2>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-secondary-500 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">Date</th>
                    <th className="px-4 py-3">Invoice</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3 rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan={4} className="px-4 py-3 text-center">Loading...</td></tr>
                  ) : bills.map((bill) => (
                    <tr key={bill.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-medium text-secondary-900">
                        {new Date(bill.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-primary-base hover:underline cursor-pointer">
                        {bill.reference_id || bill.id.slice(0, 8)}
                      </td>
                      <td className="px-4 py-3">${bill.amount}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${bill.status === 'paid' ? 'bg-green-50 text-green-700' :
                          bill.status === 'pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'
                          }`}>
                          {bill.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {!loading && bills.length === 0 && (
                    <tr><td colSpan={4} className="px-4 py-3 text-center">No billing history found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </Div>
        </div>

        {/* Plan Features / Update */}
        <div className="space-y-6">
          <Div className={`${wrapperBaseClass} !items-start bg-primary-base !text-white`}>
            <h2 className="text-xl font-semibold mb-4">Pro Features</h2>
            <ul className="space-y-3 mb-6">
              <li className="flex gap-2 items-center text-sm opacity-90"><Check size={16} /> Unlimited Projects</li>
              <li className="flex gap-2 items-center text-sm opacity-90"><Check size={16} /> Advanced Analytics</li>
              <li className="flex gap-2 items-center text-sm opacity-90"><Check size={16} /> Priority Support</li>
              <li className="flex gap-2 items-center text-sm opacity-90"><Check size={16} /> Custom Domain</li>
            </ul>
            <Button variant="secondary_filled" className="w-full">
              Upgrade Plan
            </Button>
          </Div>

          <Div className={`${wrapperBaseClass} !items-start`}>
            <h2 className="text-lg font-semibold text-secondary-900 mb-4">Payment Method</h2>
            <Flex className="items-center gap-3 w-full p-3 border border-gray-200 rounded-xl mb-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <CreditCard size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-secondary-900">Visa ending in 4242</p>
                <p className="text-xs text-secondary-500">Expires 12/28</p>
              </div>
            </Flex>
            <Button variant="dark_outlined" height="small" className="w-full">
              Update Payment Method
            </Button>
          </Div>
        </div>
      </div>
    </FlexColumn>
  );
}

export default function Billing() {
  return (
    <ProtectedRoute>
      <BillingContent />
    </ProtectedRoute>
  );
}
