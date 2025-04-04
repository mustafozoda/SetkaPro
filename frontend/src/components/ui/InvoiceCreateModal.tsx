import { useState } from "react";
import { motion } from "framer-motion";
import { X, Plus, Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type InvoiceItem = {
  meshType: string;
  quantity: number;
  unitPrice: number;
};

type Client = {
  id: number;
  name: string;
};

type Employee = {
  id: number;
  name: string;
};

export function InvoiceCreateModal({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();

  const [clientId, setClientId] = useState<number | "">("");
  const [employeeId, setEmployeeId] = useState<number | "">("");
  const [items, setItems] = useState<InvoiceItem[]>([
    { meshType: "", quantity: 0, unitPrice: 0 },
  ]);
  const [error, setError] = useState<string | null>(null);

  const { data: clients = [] } = useQuery<Client[]>({
    queryKey: ["clients"],
    queryFn: () => api.get("/clients").then((res) => res.data),
  });

  const { data: employees = [] } = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: () => api.get("/employees").then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: () =>
      api.post("/invoices/create", {
        clientId,
        employeeId,
        items,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      onClose();
    },
    onError: (err: any) => {
      setError(
        err?.response?.data?.message || err.message || "Something went wrong"
      );
    },
  });

  const addItem = () => {
    setItems([...items, { meshType: "", quantity: 0, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const total = items.reduce(
    (sum: number, item: InvoiceItem) => sum + item.quantity * item.unitPrice,
    0
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <motion.div
        className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-2xl relative shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button className="absolute top-3 right-3" onClick={onClose}>
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <h2 className="text-xl font-bold mb-4">Create Invoice</h2>

        {/* Client / Employee Select */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
          <label>
            Client:
            <select
              value={clientId}
              onChange={(e) => setClientId(Number(e.target.value))}
              className="w-full mt-1 border rounded px-2 py-1"
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Employee:
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(Number(e.target.value))}
              className="w-full mt-1 border rounded px-2 py-1"
            >
              <option value="">Select an employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Items */}
        <Card className="p-4 space-y-3 text-sm">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                placeholder="Mesh Type"
                value={item.meshType}
                onChange={(e) => updateItem(index, "meshType", e.target.value)}
                className="flex-1 border rounded px-2 py-1"
              />
              <input
                type="number"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) =>
                  updateItem(index, "quantity", Number(e.target.value))
                }
                className="w-20 border rounded px-2 py-1"
              />
              <input
                type="number"
                placeholder="Price"
                value={item.unitPrice}
                onChange={(e) =>
                  updateItem(index, "unitPrice", Number(e.target.value))
                }
                className="w-24 border rounded px-2 py-1"
              />
              <button
                onClick={() => removeItem(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <Button
            variant="ghost"
            size="sm"
            onClick={addItem}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add Item
          </Button>

          <div className="flex justify-between font-semibold pt-4 border-t">
            <span>Total</span>
            <span>{total.toLocaleString()} TJS</span>
          </div>
        </Card>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="flex justify-end pt-4">
          <Button
            onClick={() => mutation.mutate()}
            disabled={!clientId || items.length === 0 || mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Create Invoice"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
