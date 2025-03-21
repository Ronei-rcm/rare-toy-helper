
export interface WhatsAppConfig {
  enabled: boolean;
  phoneNumber: string;
  welcomeMessage: string;
  notificationsEnabled: boolean;
  autoReplyEnabled: boolean;
  autoReplyMessage: string;
}

// Configurações padrão
const defaultConfig: WhatsAppConfig = {
  enabled: true,
  phoneNumber: "5511999999999", // Substitua pelo número real
  welcomeMessage: "Olá! Bem-vindo à nossa loja de brinquedos. Como posso ajudar?",
  notificationsEnabled: true,
  autoReplyEnabled: true,
  autoReplyMessage: "Agradecemos seu contato! Responderemos em breve."
};

// Simulando armazenamento da configuração
let whatsAppConfig: WhatsAppConfig = { ...defaultConfig };

export const whatsappService = {
  // Obter configuração atual
  getConfig: (): WhatsAppConfig => {
    return whatsAppConfig;
  },
  
  // Atualizar configuração
  updateConfig: (config: Partial<WhatsAppConfig>): WhatsAppConfig => {
    whatsAppConfig = { ...whatsAppConfig, ...config };
    return whatsAppConfig;
  },
  
  // Gerar link do WhatsApp
  generateWhatsAppLink: (message?: string): string => {
    const encodedMessage = encodeURIComponent(message || whatsAppConfig.welcomeMessage);
    return `https://wa.me/${whatsAppConfig.phoneNumber}?text=${encodedMessage}`;
  },
  
  // Simular envio de mensagem (em um ambiente real, isso seria feito via API)
  sendMessage: async (to: string, message: string): Promise<boolean> => {
    console.log(`Enviando mensagem para ${to}: ${message}`);
    
    // Simular atraso de rede
    return new Promise(resolve => {
      setTimeout(() => {
        // Simulação de sucesso (90% de chance)
        const success = Math.random() < 0.9;
        console.log(`Mensagem ${success ? 'enviada' : 'falhou'}`);
        resolve(success);
      }, 800);
    });
  }
};
