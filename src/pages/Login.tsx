
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, Lock, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

  // Inicializa o formulário com o schema de validação
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handler do envio de formulário
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulando um login (aqui você integraria com sua API)
    setTimeout(() => {
      // Verifica se é o usuário admin
      if (values.email === "admin@muhlstore.com" && values.password === "admin123") {
        localStorage.setItem("user", JSON.stringify({
          id: "admin1",
          name: "Administrador",
          email: values.email,
          role: "admin"
        }));
        setIsSubmitting(false);
        toast.success("Login realizado com sucesso!");
        navigate("/admin");
        return;
      }
      
      // Verifica se o usuário existe no localStorage (simulação)
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === values.email) {
          // Em um ambiente real, você verificaria a senha com hash
          localStorage.setItem("isLoggedIn", "true");
          setIsSubmitting(false);
          toast.success("Login realizado com sucesso!");
          navigate("/cliente");
          return;
        }
      }
      
      // Se não encontrar o usuário
      setIsSubmitting(false);
      toast.error("Email ou senha incorretos.");
    }, 1500);
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
                <p><span className="text-gray-500">Email:</span> admin@muhlstore.com</p>
                <p><span className="text-gray-500">Senha:</span> admin123</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
