
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Separator } from "../../components/ui/separator";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Switch } from "../../components/ui/switch";
import { Textarea } from "../../components/ui/textarea";

export default function SettingsManager() {
  const [storeSettings, setStoreSettings] = useState({
    storeName: "MUHLSTORE",
    storeEmail: "contato@muhlstore.com.br",
    storePhone: "(11) 98765-4321",
    storeAddress: "Rua dos Brinquedos, 123 - São Paulo, SP",
    currency: "BRL",
  });

  const handleSaveStoreSettings = () => {
    // Aqui seria a lógica para salvar no backend
    toast.success("Configurações da loja salvas com sucesso");
  };

  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "MUHLSTORE - Coleção de Brinquedos Raros e Usados",
    metaDescription: "Descubra brinquedos raros e vintage na MUHLSTORE. Action figures colecionáveis, jogos de tabuleiro clássicos e muito mais!",
    metaKeywords: "brinquedos vintage, brinquedos raros, colecionáveis, action figures, jogos de tabuleiro",
  });

  const handleSaveSeoSettings = () => {
    // Aqui seria a lógica para salvar no backend
    toast.success("Configurações de SEO salvas com sucesso");
  };

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderConfirmation: true,
    orderShipped: true,
    orderDelivered: false,
    marketing: false,
  });

  const handleSaveNotificationSettings = () => {
    toast.success("Configurações de notificação salvas com sucesso");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Configurações</h1>
        <p className="text-gray-500">Gerencie as configurações da sua loja</p>
      </div>
      
      <Tabs defaultValue="store">
        <TabsList className="mb-4">
          <TabsTrigger value="store">Informações da Loja</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="shipping">Envio</TabsTrigger>
        </TabsList>
        
        <TabsContent value="store" className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="storeName">Nome da Loja</Label>
                <Input 
                  id="storeName" 
                  value={storeSettings.storeName}
                  onChange={(e) => setStoreSettings({...storeSettings, storeName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeEmail">Email</Label>
                <Input 
                  id="storeEmail" 
                  type="email"
                  value={storeSettings.storeEmail}
                  onChange={(e) => setStoreSettings({...storeSettings, storeEmail: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="storePhone">Telefone</Label>
                <Input 
                  id="storePhone" 
                  value={storeSettings.storePhone}
                  onChange={(e) => setStoreSettings({...storeSettings, storePhone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Moeda</Label>
                <Select 
                  value={storeSettings.currency} 
                  onValueChange={(value) => setStoreSettings({...storeSettings, currency: value})}
                >
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Selecione a moeda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BRL">Real (R$)</SelectItem>
                    <SelectItem value="USD">Dólar (US$)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="storeAddress">Endereço</Label>
              <Input 
                id="storeAddress" 
                value={storeSettings.storeAddress}
                onChange={(e) => setStoreSettings({...storeSettings, storeAddress: e.target.value})}
              />
            </div>
            
            <Button onClick={handleSaveStoreSettings}>Salvar Alterações</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="seo" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Título</Label>
              <Input 
                id="metaTitle" 
                value={seoSettings.metaTitle}
                onChange={(e) => setSeoSettings({...seoSettings, metaTitle: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Descrição</Label>
              <Textarea 
                id="metaDescription" 
                value={seoSettings.metaDescription}
                onChange={(e) => setSeoSettings({...seoSettings, metaDescription: e.target.value})}
                className="min-h-[100px]"
              />
              <p className="text-sm text-gray-500">Mantenha com menos de 160 caracteres para melhores resultados</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="metaKeywords">Meta Palavras-chave</Label>
              <Input 
                id="metaKeywords" 
                value={seoSettings.metaKeywords}
                onChange={(e) => setSeoSettings({...seoSettings, metaKeywords: e.target.value})}
              />
              <p className="text-sm text-gray-500">Separe as palavras-chave com vírgulas</p>
            </div>
            
            <Button onClick={handleSaveSeoSettings}>Salvar Alterações</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notificações por Email</h3>
                <p className="text-sm text-gray-500">Ativar/desativar todas as notificações por email</p>
              </div>
              <Switch 
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="font-medium">Tipos de Notificação</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Confirmação de Pedido</p>
                  <p className="text-sm text-gray-500">Enviar email quando um pedido for feito</p>
                </div>
                <Switch 
                  checked={notificationSettings.orderConfirmation}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, orderConfirmation: checked})}
                  disabled={!notificationSettings.emailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Pedido Enviado</p>
                  <p className="text-sm text-gray-500">Enviar email quando um pedido for enviado</p>
                </div>
                <Switch 
                  checked={notificationSettings.orderShipped}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, orderShipped: checked})}
                  disabled={!notificationSettings.emailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Pedido Entregue</p>
                  <p className="text-sm text-gray-500">Enviar email quando um pedido for entregue</p>
                </div>
                <Switch 
                  checked={notificationSettings.orderDelivered}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, orderDelivered: checked})}
                  disabled={!notificationSettings.emailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Marketing</p>
                  <p className="text-sm text-gray-500">Enviar emails de marketing e promoções</p>
                </div>
                <Switch 
                  checked={notificationSettings.marketing}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, marketing: checked})}
                  disabled={!notificationSettings.emailNotifications}
                />
              </div>
            </div>
            
            <Button onClick={handleSaveNotificationSettings}>Salvar Alterações</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-6">
          <div className="py-6 text-center">
            <p className="text-gray-500">As opções de configuração de pagamento estarão disponíveis em breve</p>
          </div>
        </TabsContent>
        
        <TabsContent value="shipping" className="space-y-6">
          <div className="py-6 text-center">
            <p className="text-gray-500">As opções de configuração de envio estarão disponíveis em breve</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
