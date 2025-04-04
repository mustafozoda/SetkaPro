import { Card, CardContent } from "@/components/ui/card";
import {
  LucideBarChart,
  LucideCircleDollarSign,
  LucideLayers,
  LucideFileText,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function StatsTiles({ data }: { data: any }) {
  const { t } = useTranslation();

  const items = [
    {
      title: t("pages.dashboard.stats.totalMesh"),
      icon: LucideLayers,
      key: "totalMeshProduced",
      unit: "m²",
    },
    {
      title: t("pages.dashboard.stats.totalRevenue"),
      icon: LucideCircleDollarSign,
      key: "totalRevenue",
      unit: "TJS",
    },
    {
      title: t("pages.dashboard.stats.wireUsed"),
      icon: LucideBarChart,
      key: "wireUsedKg",
      unit: "kg",
    },
    {
      title: t("pages.dashboard.stats.invoices"),
      icon: LucideFileText,
      key: "invoices",
      unit: "",
      render: (value: any) => (Array.isArray(value) ? value.length : 0),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map(({ title, icon: Icon, key, unit, render }) => (
        <Card key={key} className="p-4 flex items-center gap-4">
          <Icon className="w-6 h-6 text-muted-foreground" />
          <CardContent className="p-0">
            <div className="text-sm text-muted-foreground">{title}</div>
            <div className="text-xl font-bold">
              {render ? render(data?.[key]) : data?.[key]} {unit}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
