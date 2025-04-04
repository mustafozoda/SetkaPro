import { Card } from "@/components/ui/card";
import { Medal } from "lucide-react";
import { useTranslation } from "react-i18next";

export function TopClients({ data = [] }: { data: any[] }) {
  const { t } = useTranslation();

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">
        {t("pages.dashboard.clients.topClients")}
      </h3>
      <ul className="space-y-2">
        {data.map((client, index) => (
          <li
            key={client.id || index}
            className="flex justify-between items-center text-sm"
          >
            <div className="flex items-center gap-2">
              {index < 3 && <Medal className="w-4 h-4 text-yellow-500" />}
              <span className="font-medium">{client.name}</span>
            </div>
            <span className="text-muted-foreground font-mono">
              {client.totalSpent} {t("pages.dashboard.clients.currency")}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
