import { useState } from "react";
import api from "@/lib/axios";
import { Employee } from "@/types/Employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { motion } from "framer-motion";

export function EmployeeModal({
  employee,
  onClose,
}: {
  employee: Partial<Employee>;
  onClose: () => void;
}) {
  const isEdit = !!employee?.id;
  const [form, setForm] = useState({
    name: employee.name || "",
    role: employee.role || "EMPLOYEE",
    salary: employee.salary?.toString() || "",
  });

  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!form.name.trim()) throw new Error("Name is required");
      if (!form.salary || isNaN(Number(form.salary)))
        throw new Error("Valid salary required");

      const payload = {
        name: form.name.trim(),
        role: form.role,
        salary: parseFloat(form.salary),
      };

      return isEdit
        ? await api.put(`/employees/${employee.id}`, payload)
        : await api.post("/employees", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      onClose();
    },
    onError: (err: any) => {
      setError(
        err?.response?.data?.message || err.message || "Something went wrong"
      );
    },
  });

  const handleDelete = async () => {
    if (
      employee.id &&
      confirm("Are you sure you want to delete this employee?")
    ) {
      await api.delete(`/employees/${employee.id}`);
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-red-500"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-6">
          {isEdit ? "Edit Employee" : "Add Employee"}
        </h2>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
        >
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="e.g. John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="OWNER">Owner</option>
              <option value="MESH_MAKER">Mesh Maker</option>
              <option value="MANAGER">Manager</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Salary (TJS)
            </label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="e.g. 2000"
              value={form.salary}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:underline text-sm"
            >
              Cancel
            </button>

            <div className="flex gap-2">
              {isEdit && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              )}
              <button
                type="submit"
                disabled={mutation.isPending}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
              >
                {mutation.isPending ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
