
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart, DownloadCloud, FileText, PieChart } from "lucide-react";
import { toast } from "sonner";

export default function RelatoriosManager() {
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: ""
  });

  const handleGenerateReport = (type: string) => {
    // Aqui seria a lógica para gerar o relatório
    toast.success(`Relatório de ${type} gerado com sucesso!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Relatórios</h1>
        <p className="text-gray-500">Gerencie e visualize relatórios de desempenho da loja</p>
      </div>
      
      <Tabs defaultValue="vendas">
        <TabsList className="mb-4">
          <TabsTrigger value="vendas">Vendas</TabsTrigger>
          <TabsTrigger value="estoque">Estoque</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vendas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendas por Período</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Data Inicial</Label>
                  <Input 
                    id="startDate" 
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Data Final</Label>
                  <Input 
                    id="endDate" 
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                  />
                </div>
              </div>
              
              <Button onClick={() => handleGenerateReport("vendas")}>
                Gerar Relatório
              </Button>
              
              <div className="mt-6 h-64 bg-slate-100 rounded-md flex items-center justify-center">
                <div className="text-center p-4">
                  <BarChart className="mx-auto h-12 w-12 text-slate-400" />
                  <p className="mt-2 text-sm text-slate-500">Selecione um período para visualizar o gráfico de vendas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Relatório Diário</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" onClick={() => handleGenerateReport("diário")}>
                  <FileText className="mr-2 h-4 w-4" />
                  Exportar PDF
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Relatório Semanal</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" onClick={() => handleGenerateReport("semanal")}>
                  <FileText className="mr-2 h-4 w-4" />
                  Exportar PDF
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Relatório Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" onClick={() => handleGenerateReport("mensal")}>
                  <FileText className="mr-2 h-4 w-4" />
                  Exportar PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="estoque" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Situação do Estoque</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 h-64 bg-slate-100 rounded-md flex items-center justify-center">
                <div className="text-center p-4">
                  <PieChart className="mx-auto h-12 w-12 text-slate-400" />
                  <p className="mt-2 text-sm text-slate-500">Distribuição de produtos por categoria</p>
                </div>
              </div>
              
              <Button className="w-full" onClick={() => handleGenerateReport("estoque")}>
                <DownloadCloud className="mr-2 h-4 w-4" />
                Exportar Relatório de Estoque
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="clientes" className="space-y-6">
          <div className="py-6 text-center">
            <p className="text-gray-500">Relatórios de clientes serão implementados em breve</p>
          </div>
        </TabsContent>
        
        <TabsContent value="financeiro" className="space-y-6">
          <div className="py-6 text-center">
            <p className="text-gray-500">Relatórios financeiros serão implementados em breve</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
