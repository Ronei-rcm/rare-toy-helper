
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SettingsSection() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [newsletter, setNewsletter] = React.useState(true);
  const [privacy, setPrivacy] = React.useState(true);
  
  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita."
    );
    
    if (confirmDelete) {
      toast.error("Função ainda não implementada");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preferências do Usuário</CardTitle>
          <CardDescription>
            Configure suas preferências de exibição e interação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Modo Escuro</p>
                <p className="text-sm text-gray-500">
                  Ative o modo escuro para reduzir o cansaço visual
                </p>
              </div>
              <Switch 
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Newsletter</p>
                <p className="text-sm text-gray-500">
                  Receba novidades sobre produtos e ofertas exclusivas
                </p>
              </div>
              <Switch 
                checked={newsletter}
                onCheckedChange={setNewsletter}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dados de Navegação</p>
                <p className="text-sm text-gray-500">
                  Permita que utilizemos dados para melhorar sua experiência
                </p>
              </div>
              <Switch 
                checked={privacy}
                onCheckedChange={setPrivacy}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Segurança</CardTitle>
          <CardDescription>
            Gerencie a segurança da sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            Alterar Senha
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Ativar Autenticação em Dois Fatores
          </Button>
          <Separator className="my-2" />
          <Button 
            variant="destructive" 
            className="w-full justify-start"
            onClick={handleDeleteAccount}
          >
            Excluir Conta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
