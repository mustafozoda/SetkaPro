import { useTranslation } from "react-i18next";
import { useTheme } from "@/stores/useTheme";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { FileText, User, Calendar, Plus } from "lucide-react";
import { useState } from "react";
import { InvoiceCreateModal } from "../../components/ui/InvoiceCreateModal";
import { InvoiceDetailModal } from "../../components/ui/InvoiceDetailModal";

export default function InvoicesPage() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [filters, setFilters] = useState({ month: "", clientId: "" });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["invoices", filters],
    queryFn: async () => {
      const res = await api.get("/invoices", { params: filters });
      return res.data;
    },
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t("pages.invoices.title")}</h1>
          <p className="text-muted-foreground">
            {t("pages.invoices.description")}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="month"
            className="border px-3 py-1 rounded text-sm"
            value={filters.month}
            onChange={(e) => setFilters({ ...filters, month: e.target.value })}
          />
          <input
            type="number"
            placeholder="Client ID"
            className="border px-3 py-1 rounded text-sm"
            value={filters.clientId}
            onChange={(e) =>
              setFilters({ ...filters, clientId: e.target.value })
            }
          />
          <Button
            variant="outline"
            onClick={() => setFilters({ month: "", clientId: "" })}
          >
            Clear
          </Button>
          <Button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {t("common.create") || "New Invoice"}
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-md" />
          ))}
        </div>
      )}

      {isError && (
        <div className="text-red-500">
          {t("errors.loadingFailed") || "Failed to load invoices."}
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((invoice: any) => (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hover:shadow-md transition rounded-md"
              onClick={() => setSelectedInvoice(invoice)}
            >
              <Card className="p-4 space-y-2 cursor-pointer">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span>#{invoice.id}</span>
                  <Calendar className="w-4 h-4 ml-auto" />
                  <span>
                    {new Date(invoice.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-lg font-semibold">
                  {invoice.total.toLocaleString()} TJS
                </div>
                <div className="text-sm flex justify-between">
                  <div className="flex gap-1 items-center">
                    <User className="w-4 h-4" />
                    {invoice.client?.name || "No client"}
                  </div>
                  <div className="text-xs opacity-50">
                    {invoice.items.length} items
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <div className="pt-4">
        <span className="text-sm opacity-50">Theme: {theme}</span>
      </div>

      {showCreate && (
        <InvoiceCreateModal onClose={() => setShowCreate(false)} />
      )}
      {selectedInvoice && (
        <InvoiceDetailModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </div>
  );
}
