
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface ClientSidebarProps {
  userName: string;
  onLogout: () => void;
}

export default function ClientSidebar({ userName, onLogout }: ClientSidebarProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Minha Conta</CardTitle>
        <CardDescription>Bem-vindo(a), {userName}</CardDescription>
      </CardHeader>
      <CardContent>
        <nav className="space-y-1">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="#meus-pedidos">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Meus Pedidos
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="#lista-desejos">
              <Heart className="mr-2 h-4 w-4" />
              Lista de Desejos
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="#meu-perfil">
              <User className="mr-2 h-4 w-4" />
              Meu Perfil
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="#configuracoes">
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={onLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </nav>
      </CardContent>
    </Card>
  );
}
