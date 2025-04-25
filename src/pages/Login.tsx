
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { API_URL, mockLogin } from "../config/api";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";

// Definição do esquema de validação
const formSchema = z.object({
  email: z.string().email({
    message: "Digite um email válido.",
  }),
  password: z.string().min(1, {
    message: "Digite sua senha.",
  }),
});

export default function Login() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Inicializa o formulário com o schema de validação
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handler do envio de formulário
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setLoginError("");
    
    try {
      // Primeiro tentamos o modo de demonstração com mock
      try {
        // Usamos mock login para evitar erros de API quando não há backend disponível
        const data = await mockLogin(values.email, values.password);
        
        // Redirecionamos com base no tipo de usuário
        if (data.usuario.tipo === 'admin') {
          toast.success("Login realizado com sucesso!");
          navigate("/admin");
        } else {
          toast.success("Login realizado com sucesso!");
          navigate("/cliente");
        }

        setIsSubmitting(false);
        return;
      } catch (mockError) {
        // Se o mock falhar, tentamos a API real
        console.log("Mock login falhou, tentando API real...");
      }

      // Tentativa com API real
      const response = await fetch(`${API_URL}/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: values.email,
          senha: values.password
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao fazer login');
      }

      const data = await response.json();
      
      // Salvar dados do usuário e token
      localStorage.setItem("user", JSON.stringify(data.usuario));
      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", "true");
      
      setIsSubmitting(false);
      toast.success("Login realizado com sucesso!");
      
      // Redirecionar baseado no tipo de usuário
      if (data.usuario.tipo === 'admin') {
        navigate("/admin");
      } else {
        navigate("/cliente");
      }
    } catch (error) {
      setIsSubmitting(false);
      setLoginError(error instanceof Error ? error.message : "Email ou senha incorretos.");
      console.error("Erro de login:", error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-16 bg-white/80 backdrop-blur-md shadow-sm flex items-center px-4">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-primary">MUHL</span>
            <span className="text-gray-700">STORE</span>
          </h1>
        </Link>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Entre na sua conta</h1>
            <p className="text-gray-500 mt-1">Bem-vindo de volta à MUHLSTORE</p>
          </div>

          {loginError && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              {loginError}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input type="email" placeholder="seu@email.com" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Senha</FormLabel>
                      <Link to="/recuperar-senha" className="text-sm text-primary hover:underline">
                        Esqueceu a senha?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input type="password" placeholder="Digite sua senha" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Entrando..." : "Entrar"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Ainda não tem uma conta?{" "}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Cadastre-se
              </Link>
            </p>
          </div>
          
          <div className="mt-8 border-t pt-6">
            <p className="text-gray-500 text-xs text-center mb-4">Acesso para demonstração:</p>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="border rounded-md p-3">
                <p className="font-semibold mb-2">Cliente</p>
                <p><span className="text-gray-500">Email:</span> cliente@muhlstore.com</p>
                <p><span className="text-gray-500">Senha:</span> cliente123</p>
              </div>
              <div className="border rounded-md p-3">
                <p className="font-semibold mb-2">Administrador</p>
                <p><span className="text-gray-500">Email:</span> admin@example.com</p>
                <p><span className="text-gray-500">Senha:</span> admin123</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
