import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard,
  BarChart3,
  PlusCircle,
  Calendar,
  Download
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../../integrations/supabase/client";

interface FinancialMetrics {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
}

interface Transaction {
  id: string;
  type: 'revenue' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
  paymentMethod?: string;
}

export default function FinancialManager() {
  const [metrics, setMetrics] = useState<FinancialMetrics>({
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
    profitMargin: 0
  });
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(1)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense' as 'revenue' | 'expense',
    amount: '',
    description: '',
    category: '',
    paymentMethod: 'cash'
  });

  useEffect(() => {
    loadFinancialData();
  }, [dateRange]);

  const loadFinancialData = async () => {
    setLoading(true);
    try {
      // Buscar pedidos do período para calcular receitas
      const { data: orders, error } = await supabase
        .from('orders')
        .select('*')
        .gte('created_at', dateRange.startDate)
        .lte('created_at', dateRange.endDate)
        .eq('payment_status', 'paid');

      if (error) throw error;

      const revenue = orders?.reduce((sum, order) => {
        const amount = typeof order.total_amount === 'string' 
          ? parseFloat(order.total_amount) 
          : order.total_amount;
        return sum + amount;
      }, 0) || 0;
      
      // Mock de despesas (em produção, você teria uma tabela de despesas)
      const expenses = revenue * 0.3; // 30% como exemplo
      const profit = revenue - expenses;
      const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

      setMetrics({
        totalRevenue: revenue,
        totalExpenses: expenses,
        netProfit: profit,
        profitMargin: margin
      });

      // Criar transações a partir dos pedidos
      const revenueTransactions: Transaction[] = orders?.map(order => {
        const amount = typeof order.total_amount === 'string'
          ? parseFloat(order.total_amount)
          : order.total_amount;
        
        return {
          id: order.id,
          type: 'revenue' as const,
          amount,
          description: `Pedido ${order.order_number}`,
          category: 'Vendas',
          date: order.created_at,
          paymentMethod: order.payment_method
        };
      }) || [];

      setTransactions(revenueTransactions);
    } catch (error) {
      console.error('Erro ao carregar dados financeiros:', error);
      toast.error('Erro ao carregar dados financeiros');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = () => {
    if (!newTransaction.amount || !newTransaction.description) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      type: newTransaction.type,
      amount: parseFloat(newTransaction.amount),
      description: newTransaction.description,
      category: newTransaction.category || 'Outros',
      date: new Date().toISOString(),
      paymentMethod: newTransaction.paymentMethod
    };

    setTransactions([transaction, ...transactions]);
    
    // Recalcular métricas
    if (transaction.type === 'expense') {
      const newExpenses = metrics.totalExpenses + transaction.amount;
      const newProfit = metrics.totalRevenue - newExpenses;
      const newMargin = metrics.totalRevenue > 0 ? (newProfit / metrics.totalRevenue) * 100 : 0;
      
      setMetrics({
        ...metrics,
        totalExpenses: newExpenses,
        netProfit: newProfit,
        profitMargin: newMargin
      });
    }

    setNewTransaction({
      type: 'expense',
      amount: '',
      description: '',
      category: '',
      paymentMethod: 'cash'
    });

    toast.success('Transação adicionada com sucesso!');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const exportToCSV = () => {
    const headers = ['Data', 'Tipo', 'Descrição', 'Categoria', 'Valor', 'Método de Pagamento'];
    const rows = transactions.map(t => [
      new Date(t.date).toLocaleDateString('pt-BR'),
      t.type === 'revenue' ? 'Receita' : 'Despesa',
      t.description,
      t.category,
      formatCurrency(t.amount),
      t.paymentMethod || '-'
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financeiro-${dateRange.startDate}-${dateRange.endDate}.csv`;
    a.click();
    
    toast.success('Relatório exportado com sucesso!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dados financeiros...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestão Financeira</h2>
          <p className="text-muted-foreground">
            Monitore receitas, despesas e lucratividade
          </p>
        </div>
        <Button onClick={exportToCSV}>
          <Download className="mr-2 h-4 w-4" />
          Exportar Relatório
        </Button>
      </div>

      {/* Filtro de período */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Período de Análise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data Inicial</Label>
              <Input
                id="startDate"
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Data Final</Label>
              <Input
                id="endDate"
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards de métricas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(metrics.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Vendas no período
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(metrics.totalExpenses)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Custos operacionais
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${metrics.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(metrics.netProfit)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Receita - Despesas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margem de Lucro</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${metrics.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {metrics.profitMargin.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Percentual de lucro
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de gerenciamento */}
      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transações</TabsTrigger>
          <TabsTrigger value="add">Adicionar Despesa</TabsTrigger>
          <TabsTrigger value="analysis">Análise por Categoria</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Transações</CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhuma transação encontrada no período selecionado
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Método</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          {new Date(transaction.date).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            transaction.type === 'revenue' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.type === 'revenue' ? 'Receita' : 'Despesa'}
                          </span>
                        </TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.category}</TableCell>
                        <TableCell>
                          {transaction.paymentMethod === 'pix' ? 'PIX' :
                           transaction.paymentMethod === 'credit_card' ? 'Cartão de Crédito' :
                           transaction.paymentMethod === 'debit_card' ? 'Cartão de Débito' :
                           transaction.paymentMethod || '-'}
                        </TableCell>
                        <TableCell className={`text-right font-medium ${
                          transaction.type === 'revenue' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'revenue' ? '+' : '-'} {formatCurrency(transaction.amount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5" />
                Registrar Nova Despesa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Valor *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={newTransaction.category}
                    onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fornecedores">Fornecedores</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Aluguel">Aluguel</SelectItem>
                      <SelectItem value="Salários">Salários</SelectItem>
                      <SelectItem value="Transporte">Transporte</SelectItem>
                      <SelectItem value="Manutenção">Manutenção</SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Método de Pagamento</Label>
                  <Select
                    value={newTransaction.paymentMethod}
                    onValueChange={(value) => setNewTransaction({ ...newTransaction, paymentMethod: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Dinheiro</SelectItem>
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="credit_card">Cartão de Crédito</SelectItem>
                      <SelectItem value="debit_card">Cartão de Débito</SelectItem>
                      <SelectItem value="bank_transfer">Transferência</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Descrição *</Label>
                  <Input
                    id="description"
                    placeholder="Descreva a despesa"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={handleAddTransaction} className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Despesa
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Análise de métodos de pagamento */}
                <div>
                  <h3 className="font-semibold mb-3">Receitas por Método de Pagamento</h3>
                  <div className="space-y-2">
                    {['pix', 'credit_card', 'debit_card', 'cash'].map((method) => {
                      const total = transactions
                        .filter(t => t.type === 'revenue' && t.paymentMethod === method)
                        .reduce((sum, t) => sum + t.amount, 0);
                      
                      const percentage = metrics.totalRevenue > 0 
                        ? (total / metrics.totalRevenue) * 100 
                        : 0;

                      const methodNames: Record<string, string> = {
                        pix: 'PIX',
                        credit_card: 'Cartão de Crédito',
                        debit_card: 'Cartão de Débito',
                        cash: 'Dinheiro'
                      };

                      return (
                        <div key={method} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{methodNames[method]}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{formatCurrency(total)}</div>
                            <div className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Análise de despesas por categoria */}
                <div>
                  <h3 className="font-semibold mb-3 mt-6">Despesas por Categoria</h3>
                  <div className="space-y-2">
                    {Array.from(new Set(transactions.filter(t => t.type === 'expense').map(t => t.category))).map((category) => {
                      const total = transactions
                        .filter(t => t.type === 'expense' && t.category === category)
                        .reduce((sum, t) => sum + t.amount, 0);
                      
                      const percentage = metrics.totalExpenses > 0 
                        ? (total / metrics.totalExpenses) * 100 
                        : 0;

                      return (
                        <div key={category} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <span className="font-medium">{category}</span>
                          <div className="text-right">
                            <div className="font-bold text-red-600">{formatCurrency(total)}</div>
                            <div className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
