
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { whatsappService, WhatsAppConfig } from "@/services/whatsappService";

export default function WhatsAppManager() {
  const [config, setConfig] = useState<WhatsAppConfig>(whatsappService.getConfig());
  const [isSaving, setIsSaving] = useState(false);
  const [testPhone, setTestPhone] = useState("");
  const [testMessage, setTestMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleConfigChange = (field: keyof WhatsAppConfig, value: any) => {
    setConfig({ ...config, [field]: value });
  };

  const handleSaveConfig = async () => {
    setIsSaving(true);
    
    try {
      // Validar número de telefone
      if (!/^\d+$/.test(config.phoneNumber)) {
        toast.error("Número de telefone inválido. Use apenas números.");
        return;
      }
      
      // Salvar configuração
      const updatedConfig = whatsappService.updateConfig(config);
      setConfig(updatedConfig);
      
      toast.success("Configurações do WhatsApp salvas com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar configurações do WhatsApp");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendTestMessage = async () => {
    if (!testPhone || !testMessage) {
      toast.error("Por favor, preencha o número e a mensagem de teste");
      return;
    }
    
    setIsSending(true);
    
    try {
      const success = await whatsappService.sendMessage(testPhone, testMessage);
      
      if (success) {
        toast.success("Mensagem de teste enviada com sucesso!");
      } else {
        toast.error("Erro ao enviar mensagem de teste");
      }
    } catch (error) {
      toast.error("Erro ao enviar mensagem de teste");
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações do WhatsApp</CardTitle>
          <CardDescription>
            Configure como os clientes podem entrar em contato via WhatsApp
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="whatsapp-enabled">Habilitar WhatsApp</Label>
            <Switch 
              id="whatsapp-enabled" 
              checked={config.enabled}
              onCheckedChange={(checked) => handleConfigChange("enabled", checked)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone-number">Número de Telefone (com código do país)</Label>
            <Input 
              id="phone-number" 
              placeholder="551199999999" 
              value={config.phoneNumber}
              onChange={(e) => handleConfigChange("phoneNumber", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Digite o número com código do país, sem símbolos ou espaços
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="welcome-message">Mensagem de Boas-vindas</Label>
            <Textarea 
              id="welcome-message" 
              placeholder="Olá! Como podemos ajudar?" 
              value={config.welcomeMessage}
              onChange={(e) => handleConfigChange("welcomeMessage", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Esta mensagem será enviada automaticamente quando um cliente clicar no botão do WhatsApp
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications-enabled">Notificações de Pedidos</Label>
            <Switch 
              id="notifications-enabled" 
              checked={config.notificationsEnabled}
              onCheckedChange={(checked) => handleConfigChange("notificationsEnabled", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-reply-enabled">Resposta Automática</Label>
            <Switch 
              id="auto-reply-enabled" 
              checked={config.autoReplyEnabled}
              onCheckedChange={(checked) => handleConfigChange("autoReplyEnabled", checked)}
            />
          </div>
          
          {config.autoReplyEnabled && (
            <div className="space-y-2">
              <Label htmlFor="auto-reply-message">Mensagem de Resposta Automática</Label>
              <Textarea 
                id="auto-reply-message" 
                placeholder="Obrigado por entrar em contato. Responderemos em breve!" 
                value={config.autoReplyMessage}
                onChange={(e) => handleConfigChange("autoReplyMessage", e.target.value)}
              />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveConfig} disabled={isSaving}>
            {isSaving ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Testar Envio de Mensagem</CardTitle>
          <CardDescription>
            Envie uma mensagem de teste para verificar a configuração
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="test-phone">Número para Teste</Label>
            <Input 
              id="test-phone" 
              placeholder="551199999999" 
              value={testPhone}
              onChange={(e) => setTestPhone(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="test-message">Mensagem de Teste</Label>
            <Textarea 
              id="test-message" 
              placeholder="Esta é uma mensagem de teste" 
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSendTestMessage} disabled={isSending}>
            {isSending ? "Enviando..." : "Enviar Mensagem de Teste"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
