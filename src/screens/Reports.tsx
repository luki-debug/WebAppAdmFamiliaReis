import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportOverview3 from "@/screens/ReportOverview3";
import ReportExport from "@/screens/ReportExportar";
// import ReportOverview2 from "@/screens/ReportOverview2";
// import ReportOverview4 from "@/screens/Report3";

// const Overview = () => {
//   return (
//     <div className="pt-2">
//       <h3 className="text-xl font-bold">Visão Geral</h3>
//       <p className="text-gray-500">Aqui você encontra informações gerais sobre o seu projeto.</p>
//     </div>
//   );
// };

// const ExportarRelatorios = () => {
//   return (
//     <div className="pt-2">
//       <h3 className="text-xl font-bold">Exportar Relatórios</h3>
//       <p className="text-gray-500">Aqui você pode</p>
//       </div>
//   );
// };

export default function CronogramasPage() {
  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold text-primary">Relatórios</h2>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="orcamentos">Exportar Relatórios</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <ReportOverview3 />
        </TabsContent>
        <TabsContent value="orcamentos">
          <ReportExport />
        </TabsContent>
      </Tabs>
    </div>
  );
}
