
export interface WhatsAppConfig {
  enabled: boolean;
  phoneNumber: string;
  defaultMessage: string;
  welcomeMessage: string;
  notificationsEnabled: boolean;
  autoReplyEnabled: boolean;
  autoReplyMessage: string;
}

// Initial configuration
const initialConfig: WhatsAppConfig = {
  enabled: true,
  phoneNumber: "5511900000000",
  defaultMessage: "Olá, estou entrando em contato através do site.",
  welcomeMessage: "Bem-vindo! Como podemos ajudar?",
  notificationsEnabled: true,
  autoReplyEnabled: false,
  autoReplyMessage: "Obrigado pelo contato. Responderemos em breve.",
};

// Store configuration in memory (in a real app, would be persistent)
let whatsAppConfig: WhatsAppConfig = { ...initialConfig };

export const whatsappService = {
  getConfig(): WhatsAppConfig {
    return { ...whatsAppConfig };
  },

  generateWhatsAppLink(customMessage?: string): string {
    const config = this.getConfig();
    const message = encodeURIComponent(customMessage || config.defaultMessage);
    return `https://wa.me/${config.phoneNumber}?text=${message}`;
  },

  updateConfig(config: Partial<WhatsAppConfig>): WhatsAppConfig {
    whatsAppConfig = { ...whatsAppConfig, ...config };
    return this.getConfig();
  },

  sendMessage(phoneNumber: string, message: string): Promise<boolean> {
    console.log(`Sending message to ${phoneNumber}: ${message}`);
    // In a real application, this would use the WhatsApp Business API or similar
    return Promise.resolve(true);
  }
};
