import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export function RecentActivity({ data }: { data: any }) {
  const { t } = useTranslation();

  const invoices = data.invoices || [];
  const mesh = data.productionByType
    ? Object.entries(data.productionByType).map(([type, amount]) => ({
        type,
        amount,
      }))
    : [];

  const wire = [
    { type: t("pages.dashboard.activity.recentWire"), kg: data.wireUsedKg },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Mesh Card */}
      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2">
          {t("pages.dashboard.activity.recentMesh")}
        </h3>
        <ul className="text-sm space-y-1">
          {mesh.map((m: any, i: number) => (
            <li key={i} className="text-muted-foreground">
              {m.type} – {m.amount} m²
            </li>
          ))}
        </ul>
      </Card>

      {/* Invoices Card */}
      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2">
          {t("pages.dashboard.activity.recentInvoices")}
        </h3>
        <ul className="text-sm space-y-1">
          {invoices.map((inv: any, i: number) => (
            <li key={i} className="text-muted-foreground">
              #{inv.id} – {inv.total} TJS
            </li>
          ))}
        </ul>
      </Card>

      {/* Wire Card */}
      <Card className="p-4">
        <h3 className="font-semibold text-lg mb-2">
          {t("pages.dashboard.activity.recentWire")}
        </h3>
        <ul className="text-sm space-y-1">
          {wire.map((w: any, i: number) => (
            <li key={i} className="text-muted-foreground">
              {w.type} – {w.kg} kg
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
