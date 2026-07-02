import React, { useState } from "react";
import { useGetAdminCustomers } from "@workspace/api-client-react";
import AdminLayout from "./AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mail, Phone, Calendar } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function AdminCustomers() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAdminCustomers({ search, page });

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground mt-1">Manage your user base</p>
        </div>
      </div>

      <div className="bg-card rounded-3xl shadow-sm border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex justify-between items-center bg-muted/20">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background border-border"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Contact</th>
                <th className="px-6 py-4 font-semibold">Joined</th>
                <th className="px-6 py-4 font-semibold">Total Orders</th>
                <th className="px-6 py-4 font-semibold">Total Spent</th>
                <th className="px-6 py-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-muted-foreground animate-pulse"
                  >
                    Loading customers...
                  </td>
                </tr>
              ) : !data || data.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    No customers found.
                  </td>
                </tr>
              ) : (
                data.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-foreground">
                            {customer.name}
                          </p>
                          {customer.role === "SUPER_ADMIN" && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] h-4 mt-0.5"
                            >
                              Super Admin
                            </Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="flex items-center text-xs text-muted-foreground">
                          <Mail size={12} className="mr-1" /> {customer.email}
                        </p>
                        <p className="flex items-center text-xs text-muted-foreground">
                          <Phone size={12} className="mr-1" /> {customer.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="flex items-center text-sm text-muted-foreground">
                        <Calendar size={14} className="mr-2" />{" "}
                        {formatDate(customer.createdAt || new Date())}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold">
                        {customer.totalOrders || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-primary">
                        {formatPrice(customer.totalSpent || 0)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Badge className="bg-green-100 text-green-800 border-0 hover:bg-green-100">
                        Active
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
