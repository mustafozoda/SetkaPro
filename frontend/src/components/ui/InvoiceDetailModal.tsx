import { useState } from "react";
import { motion } from "framer-motion";
import { X, Printer } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function InvoiceDetailModal({
  invoice,
  onClose,
}: {
  invoice: any;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState(invoice.items);
  const [clientId, setClientId] = useState(invoice.client?.id || 0);
  const [employeeId, setEmployeeId] = useState(invoice.employee?.id || 0);

  // Fetch clients and employees for dropdowns
  const { data: clients = [] } = useQuery({
    queryKey: ["clients"],
    queryFn: () => api.get("/clients").then((res) => res.data),
    enabled: isEditing,
  });

  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: () => api.get("/employees").then((res) => res.data),
    enabled: isEditing,
  });

  const mutation = useMutation({
    mutationFn: () =>
      api.put(`/invoices/update/${invoice.id}`, {
        items,
        clientId,
        employeeId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      setIsEditing(false);
      onClose();
    },
  });

  const updateItem = (index: number, field: string, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

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

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Invoice #{invoice.id}</h2>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => window.print()}
              className="flex items-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print
            </Button>
            {!isEditing && (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            )}
          </div>
        </div>

        <div className="mb-4 text-sm">
          <p className="text-muted-foreground">
            Date: {new Date(invoice.createdAt).toLocaleDateString()}
          </p>

          {isEditing ? (
            <>
              <label className="block mt-2">
                Client:
                <select
                  value={clientId}
                  onChange={(e) => setClientId(+e.target.value)}
                  className="block w-full mt-1 border rounded px-2 py-1"
                >
                  {clients.map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block mt-2">
                Employee:
                <select
                  value={employeeId}
                  onChange={(e) => setEmployeeId(+e.target.value)}
                  className="block w-full mt-1 border rounded px-2 py-1"
                >
                  {employees.map((e: any) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </label>
            </>
          ) : (
            <>
              <p>
                Client: <strong>{invoice.client?.name}</strong>
              </p>
              <p>
                Handled by: <strong>{invoice.employee?.name || "N/A"}</strong>
              </p>
            </>
          )}
        </div>

        <Card className="p-4 space-y-2 text-sm">
          {items.map((item: any, index: number) => (
            <div
              key={index}
              className="flex justify-between gap-2 items-center"
            >
              {isEditing ? (
                <>
                  <input
                    className="flex-1 border rounded px-2 py-1"
                    value={item.meshType}
                    onChange={(e) =>
                      updateItem(index, "meshType", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    className="w-20 border rounded px-2 py-1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(index, "quantity", +e.target.value)
                    }
                  />
                  <input
                    type="number"
                    className="w-20 border rounded px-2 py-1"
                    value={item.unitPrice}
                    onChange={(e) =>
                      updateItem(index, "unitPrice", +e.target.value)
                    }
                  />
                </>
              ) : (
                <>
                  <span>{item.meshType}</span>
                  <span>
                    {item.quantity} × {item.unitPrice} ={" "}
                    {item.quantity * item.unitPrice} TJS
                  </span>
                </>
              )}
            </div>
          ))}

          <hr className="my-2" />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>
              {items
                .reduce(
                  (
                    sum: number,
                    item: { quantity: number; unitPrice: number }
                  ) => sum + item.quantity * item.unitPrice,
                  0
                )
                .toLocaleString(undefined, { minimumFractionDigits: 2 })}{" "}
              TJS
            </span>
          </div>

          {isEditing && (
            <div className="pt-4 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => mutation.mutate()}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
