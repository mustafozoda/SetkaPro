import { useTranslation } from "react-i18next";
import { useDashboardData } from "../../hooks/useDashboardData";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  StatsTiles,
  RecentActivity,
  MeshCharts,
  TopClients,
} from "../../pages/dashboard/ui/sections";

export function DashboardContent() {
  const { t } = useTranslation();
  const { data, isLoading } = useDashboardData();

  if (isLoading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 "
    >
      <div className="grid  grid-cols-1 sm:grid-cols-3 gap-2">
        <Button asChild variant="outline">
          <a href="/wire">+ {t("pages.wire.title")}</a>
        </Button>
        <Button asChild variant="outline">
          <a href="/mesh">+ {t("pages.mesh.title")}</a>
        </Button>
        <Button asChild variant="outline">
          <a href="/invoices">+ {t("pages.invoices.title")}</a>
        </Button>
      </div>
      <StatsTiles data={data} />
      <RecentActivity data={data} />
      <MeshCharts data={data} />
      <TopClients data={data.topClients} />
    </motion.div>
  );
}
