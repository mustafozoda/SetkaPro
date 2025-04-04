import { useState } from "react";
import { Card } from "@/components/ui/card";
import { User, DollarSign, Briefcase, Info } from "lucide-react";
import { Employee } from "@/types/Employee";
import { EmployeeDetail } from "./EmployeeDetail";
import clsx from "clsx";

type Props = {
  employee: Employee;
  onClick: () => void;
};

export const EmployeeCard = ({ employee, onClick }: Props) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <Card
        onClick={onClick}
        className="relative group p-5 rounded-xl shadow-sm hover:shadow-lg bg-background border border-border transition-all duration-200 cursor-pointer"
      >
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600 dark:text-blue-300" />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {employee.name}
            </h3>

            <div className="flex items-center text-sm text-muted-foreground gap-1 mt-1">
              <Briefcase className="w-4 h-4" />
              <span
                className={clsx(
                  "px-2 py-0.5 rounded-full text-xs font-medium",
                  {
                    "bg-blue-100 text-blue-800": employee.role === "EMPLOYEE",
                    "bg-green-100 text-green-800": employee.role === "OWNER",
                    "bg-yellow-100 text-yellow-800":
                      employee.role === "MANAGER",
                    "bg-purple-100 text-purple-800":
                      employee.role === "MESH_MAKER",
                  }
                )}
              >
                {employee.role}
              </span>
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <DollarSign className="w-4 h-4" />
              {employee.salary?.toLocaleString()} TJS
            </div>
          </div>
        </div>

        {/* View details button */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDetail(true);
            }}
            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
          >
            <Info className="w-4 h-4" />
            View Details
          </button>
        </div>
      </Card>

      {showDetail && (
        <EmployeeDetail
          employee={employee}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  );
};
