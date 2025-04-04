import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

export function MeshCharts({ data }: { data: any }) {
  const { t } = useTranslation();

  const meshByType = Object.entries(data.productionByType || {}).map(
    ([type, value]) => ({ type, value })
  );

  const wireUsage = [
    { date: data.month || "Current", kg: data.wireUsedKg || 0 },
  ];

  const salesTrend = [
    { date: data.month || "Current", revenue: data.totalRevenue || 0 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Mesh by Type (Pie) */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">
          {t("pages.dashboard.charts.meshByType")}
        </h3>
        {meshByType.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            {t("pages.dashboard.charts.noData")}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={meshByType}
                dataKey="value"
                nameKey="type"
                outerRadius={70}
                label
              >
                {meshByType.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </Card>

      {/* Wire Usage (Line) */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">
          {t("pages.dashboard.charts.wireUsage")}
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={wireUsage}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="kg"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Revenue (Line) */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">
          {t("pages.dashboard.charts.revenue")}
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={salesTrend}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#82ca9d"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
