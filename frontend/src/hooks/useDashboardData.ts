// 📁 useDashboardData.ts
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

export function useDashboardData(month?: string) {
  const now = new Date();
  const defaultMonth =
    month ||
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  return useQuery({
    queryKey: ["dashboard", defaultMonth],
    queryFn: async () => {
      const res = await axios.get("/reports/monthly", {
        params: { month: defaultMonth },
      });
      console.log("📊 dashboard data", res.data);
      return res.data;
    },
  });
}
