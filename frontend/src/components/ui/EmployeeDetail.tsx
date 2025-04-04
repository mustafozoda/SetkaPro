import { Employee } from "@/types/Employee";
import { Card } from "@/components/ui/card";
import { X, Briefcase, DollarSign, Layers, Zap, FileText } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  employee: Employee;
  onClose: () => void;
};

export const EmployeeDetail = ({ employee, onClose }: Props) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card className="relative w-full max-w-2xl p-6 dark:bg-gray-900 bg-white shadow-xl rounded-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-red-500"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {employee.name}
          </h2>
          <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
            <Briefcase className="w-4 h-4" />
            {employee.role}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Stat
            icon={<DollarSign className="w-5 h-5 text-green-500" />}
            label="Salary"
            value={`${formatNum(employee.salary)} TJS`}
          />
          <Stat
            icon={<Layers className="w-5 h-5 text-blue-500" />}
            label="Mesh Productions"
            value={`${employee.meshCount ?? 0}`}
          />
          <Stat
            icon={<Zap className="w-5 h-5 text-yellow-500" />}
            label="Wire Used"
            value={`${employee.wireUsedKg ?? 0} kg`}
          />
          <Stat
            icon={<FileText className="w-5 h-5 text-purple-500" />}
            label="Invoices Handled"
            value={`${employee.invoiceCount ?? 0}`}
          />
          <Stat
            icon={<DollarSign className="w-5 h-5 text-emerald-500" />}
            label="Total Revenue"
            value={`${formatNum(employee.totalRevenue)} TJS`}
          />
        </div>
      </Card>
    </motion.div>
  );
};

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-muted dark:bg-gray-800 rounded-md px-4 py-3 flex items-start gap-3 shadow-sm">
      <div className="bg-white dark:bg-gray-700 p-2 rounded-md">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-base font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

// Format helper for numbers with fallback
function formatNum(n?: number): string {
  return (n ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
