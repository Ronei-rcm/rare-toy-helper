
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tag, Edit, Trash, CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Coupon, CouponType, couponService } from "@/services/couponService";

export default function CouponManager() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<{
    code: string;
    type: CouponType;
    discount: number;
    minPurchaseAmount: number;
    expiryDate: Date | undefined;
    usageLimit: number;
  }>({
    code: "",
    type: "percentage",
    discount: 0,
    minPurchaseAmount: 0,
    expiryDate: undefined,
    usageLimit: 0
  });
  
  useEffect(() => {
    // Carregar lista de cupons
    loadCoupons();
  }, []);
  
  const loadCoupons = () => {
    const allCoupons = couponService.getAllCoupons();
    setCoupons(allCoupons);
  };
  
  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleEditCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setFormData({
      code: coupon.code,
      type: coupon.type,
      discount: coupon.discount,
      minPurchaseAmount: coupon.minPurchaseAmount || 0,
      expiryDate: coupon.expiryDate,
      usageLimit: coupon.usageLimit || 0
    });
    setIsAddDialogOpen(true);
  };
  
  const handleDeleteCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setIsDeleteDialogOpen(true);
  };
  
  const saveCoupon = () => {
    if (!formData.code) {
      toast.error("O código do cupom é obrigatório");
      return;
    }
    
    if (formData.type === "percentage" && (formData.discount <= 0 || formData.discount > 100)) {
      toast.error("Desconto percentual deve estar entre 1 e 100");
      return;
    }
    
    if (formData.type === "fixed" && formData.discount <= 0) {
      toast.error("Valor do desconto deve ser maior que zero");
      return;
    }
    
    // Simulação de salvamento (em um ambiente real, isso seria enviado ao backend)
    setTimeout(() => {
      toast.success(`Cupom ${selectedCoupon ? 'atualizado' : 'criado'} com sucesso!`);
      setIsAddDialogOpen(false);
      
      // Recarregar cupons (simulação)
      loadCoupons();
      
      // Limpar formulário
      setFormData({
        code: "",
        type: "percentage",
        discount: 0,
        minPurchaseAmount: 0,
        expiryDate: undefined,
        usageLimit: 0
      });
      
      setSelectedCoupon(null);
    }, 500);
  };
  
  const confirmDeleteCoupon = () => {
    if (!selectedCoupon) return;
    
    // Simulação de deleção (em um ambiente real, isso seria enviado ao backend)
    setTimeout(() => {
      toast.success(`Cupom ${selectedCoupon.code} excluído com sucesso!`);
      setIsDeleteDialogOpen(false);
      
      // Recarregar cupons (simulação)
      loadCoupons();
      
      setSelectedCoupon(null);
    }, 500);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciamento de Cupons</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Cupom
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedCoupon ? "Editar Cupom" : "Adicionar Novo Cupom"}
              </DialogTitle>
              <DialogDescription>
                Preencha os detalhes do cupom de desconto.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="coupon-code" className="text-right">
                  Código
                </Label>
                <Input
                  id="coupon-code"
                  placeholder="DESCONTO20"
                  className="col-span-3"
                  value={formData.code}
                  onChange={(e) => handleInputChange("code", e.target.value.toUpperCase())}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="coupon-type" className="text-right">
                  Tipo
                </Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o tipo de cupom" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Porcentagem</SelectItem>
                    <SelectItem value="fixed">Valor fixo</SelectItem>
                    <SelectItem value="freeShipping">Frete grátis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {formData.type !== "freeShipping" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="coupon-discount" className="text-right">
                    {formData.type === "percentage" ? "Desconto (%)" : "Desconto (R$)"}
                  </Label>
                  <Input
                    id="coupon-discount"
                    type="number"
                    min="0"
                    max={formData.type === "percentage" ? "100" : undefined}
                    className="col-span-3"
                    value={formData.discount}
                    onChange={(e) => handleInputChange("discount", parseFloat(e.target.value))}
                  />
                </div>
              )}
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="min-purchase" className="text-right">
                  Valor mínimo
                </Label>
                <Input
                  id="min-purchase"
                  type="number"
                  min="0"
                  placeholder="0.00"
                  className="col-span-3"
                  value={formData.minPurchaseAmount}
                  onChange={(e) => handleInputChange("minPurchaseAmount", parseFloat(e.target.value))}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expiry-date" className="text-right">
                  Validade
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="col-span-3 justify-start text-left font-normal"
                    >
                      {formData.expiryDate ? (
                        format(formData.expiryDate, "dd/MM/yyyy")
                      ) : (
                        <span>Selecionar data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.expiryDate}
                      onSelect={(date) => handleInputChange("expiryDate", date)}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="usage-limit" className="text-right">
                  Limite de uso
                </Label>
                <Input
                  id="usage-limit"
                  type="number"
                  min="0"
                  placeholder="Ilimitado"
                  className="col-span-3"
                  value={formData.usageLimit}
                  onChange={(e) => handleInputChange("usageLimit", parseInt(e.target.value))}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={saveCoupon}>
                {selectedCoupon ? "Salvar Alterações" : "Criar Cupom"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Table>
        <TableCaption>Lista de cupons de desconto disponíveis</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Desconto</TableHead>
            <TableHead>Valor Mínimo</TableHead>
            <TableHead>Validade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons.map((coupon) => (
            <TableRow key={coupon.code}>
              <TableCell className="font-medium">{coupon.code}</TableCell>
              <TableCell>
                {coupon.type === "percentage" ? "Porcentagem" : 
                 coupon.type === "fixed" ? "Valor Fixo" : "Frete Grátis"}
              </TableCell>
              <TableCell>
                {coupon.type === "percentage" ? `${coupon.discount}%` : 
                 coupon.type === "fixed" ? `R$ ${coupon.discount.toFixed(2)}` : "Frete Grátis"}
              </TableCell>
              <TableCell>
                {coupon.minPurchaseAmount ? `R$ ${coupon.minPurchaseAmount.toFixed(2)}` : "-"}
              </TableCell>
              <TableCell>
                {coupon.expiryDate ? format(new Date(coupon.expiryDate), "dd/MM/yyyy") : "Sem validade"}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-xs font-medium ${coupon.isValid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {coupon.isValid ? "Ativo" : "Inativo"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => handleEditCoupon(coupon)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteCoupon(coupon)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Cupom</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o cupom "{selectedCoupon?.code}"?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDeleteCoupon}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
