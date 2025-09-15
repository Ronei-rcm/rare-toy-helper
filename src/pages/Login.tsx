import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const from = location.state?.from || '/';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setLoginError('');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        toast.success('Login realizado com sucesso!');
        
        // Check user role and redirect
        const isAdmin = data.user.user_metadata?.role === 'admin';
        navigate(isAdmin ? '/admin' : '/client-area');
      }
    } catch (error: any) {
      setLoginError(error.message || 'Email ou senha incorretos.');
      toast.error(error.message || 'Erro ao fazer login');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                        <Input 
                          type="email" 
                          placeholder="seu@email.com" 
                          className="pl-10" 
                          {...field}
                          disabled={isSubmitting}
                        />
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
                        <Input 
                          type={showPassword ? 'text' : 'password'} 
                          placeholder="Digite sua senha" 
                          className="pl-10 pr-10" 
                          {...field}
                          disabled={isSubmitting}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isSubmitting}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
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
                <p><span className="text-gray-500">Email:</span> user@muhlstore.com</p>
                <p><span className="text-gray-500">Senha:</span> user123</p>
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