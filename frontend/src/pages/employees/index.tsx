import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { EmployeeCard } from "@/components/ui/EmployeeCard";
import { Employee } from "@/types/Employee";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { EmployeeModal } from "@/components/ui/EmployeeModal";
import { Button } from "@/components/ui/button";
import { Briefcase, Search } from "lucide-react";

export default function Employees() {
  const { t } = useTranslation();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const {
    data: employees,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await api.get("/employees");
      return res.data as Employee[];
    },
  });

  // Filtered results
  const filteredEmployees = useMemo(() => {
    if (!employees) return [];

    return employees.filter((emp) => {
      const matchesRole =
        roleFilter === "ALL" ||
        emp.role.toLowerCase() === roleFilter.toLowerCase();
      const matchesSearch = emp.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesRole && matchesSearch;
    });
  }, [employees, search, roleFilter]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">{t("pages.employees.title")}</h1>
          <p className="text-muted-foreground">
            {t("pages.employees.description")}
          </p>
        </div>
        <Button
          variant="default"
          onClick={() => setSelectedEmployee({} as Employee)}
        >
          + {t("common.create") || "Add Employee"}
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
          <input
            className="w-full pl-9 pr-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="px-3 py-2 border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="ALL">All Roles</option>
          <option value="EMPLOYEE">Employee</option>
          <option value="OWNER">Owner</option>
          <option value="MANAGER">Manager</option>
          <option value="MESH_MAKER">Mesh Maker</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-lg" />
          ))}

        {isError && <p className="text-red-500">Failed to load employees.</p>}

        {filteredEmployees.map((employee) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.02 * employee.id }}
          >
            <EmployeeCard
              employee={employee}
              onClick={() => setSelectedEmployee(employee)}
            />
          </motion.div>
        ))}

        {!isLoading && filteredEmployees.length === 0 && (
          <p className="text-muted-foreground text-center col-span-full">
            No employees match your filter.
          </p>
        )}
      </div>

      {/* Modal */}
      {selectedEmployee && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}
