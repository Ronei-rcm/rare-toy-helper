
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsSection() {
  const [emailPreferences, setEmailPreferences] = useState({
    newsletter: true,
    orderUpdates: true,
    wishlistUpdates: true
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: false
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    cookies: true,
    dataAnalytics: true
  });
  
  const [feedback, setFeedback] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Configurações</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-medium mb-4">Preferências de Email</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="newsletter" 
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={emailPreferences.newsletter}
                    onChange={(e) => setEmailPreferences({
                      ...emailPreferences,
                      newsletter: e.target.checked
                    })}
                  />
                  <label htmlFor="newsletter" className="ml-3 text-sm text-gray-700">
                    Receber newsletter com novidades e promoções
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="order-updates" 
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={emailPreferences.orderUpdates}
                    onChange={(e) => setEmailPreferences({
                      ...emailPreferences,
                      orderUpdates: e.target.checked
                    })}
                  />
                  <label htmlFor="order-updates" className="ml-3 text-sm text-gray-700">
                    Receber atualizações sobre meus pedidos
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="wishlist-updates" 
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={emailPreferences.wishlistUpdates}
                    onChange={(e) => setEmailPreferences({
                      ...emailPreferences,
                      wishlistUpdates: e.target.checked
                    })}
                  />
                  <label htmlFor="wishlist-updates" className="ml-3 text-sm text-gray-700">
                    Receber notificações sobre itens da lista de desejos
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-4">Segurança</h3>
              <div className="space-y-4">
                <Button variant="outline">Alterar Senha</Button>
                <div>
                  <div className="flex items-center mb-2">
                    <input 
                      type="checkbox" 
                      id="two-factor" 
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={securitySettings.twoFactor}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        twoFactor: e.target.checked
                      })}
                    />
                    <label htmlFor="two-factor" className="ml-3 text-sm text-gray-700">
                      Ativar autenticação de dois fatores
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 ml-7">
                    Adicione uma camada extra de segurança à sua conta exigindo mais que apenas uma senha para fazer login.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-4">Privacidade</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="cookies" 
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={privacySettings.cookies}
                    onChange={(e) => setPrivacySettings({
                      ...privacySettings,
                      cookies: e.target.checked
                    })}
                  />
                  <label htmlFor="cookies" className="ml-3 text-sm text-gray-700">
                    Aceitar cookies para melhorar a experiência de navegação
                  </label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="data-analytics" 
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={privacySettings.dataAnalytics}
                    onChange={(e) => setPrivacySettings({
                      ...privacySettings,
                      dataAnalytics: e.target.checked
                    })}
                  />
                  <label htmlFor="data-analytics" className="ml-3 text-sm text-gray-700">
                    Permitir análise de dados para recomendações personalizadas
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium mb-4">Feedback</h3>
              <label className="block text-sm text-gray-700 mb-2">
                Envie-nos suas sugestões ou reporte problemas
              </label>
              <Textarea 
                placeholder="Digite sua mensagem aqui..."
                className="mb-3"
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <Button>Enviar Feedback</Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
