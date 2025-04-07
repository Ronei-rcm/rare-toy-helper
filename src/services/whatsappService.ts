
export interface WhatsAppConfig {
  enabled: boolean;
  phoneNumber: string;
  welcomeMessage: string;
  notificationsEnabled: boolean;
  autoReplyEnabled: boolean;
  autoReplyMessage: string;
}

// Default configuration
const defaultConfig: WhatsAppConfig = {
  enabled: true,
  phoneNumber: "5521999999999",
  welcomeMessage: "Olá! Como posso ajudar?",
  notificationsEnabled: false,
  autoReplyEnabled: false,
  autoReplyMessage: "Obrigado por entrar em contato! Responderemos em breve."
};

// Try to load config from localStorage or use default
const loadConfig = (): WhatsAppConfig => {
  try {
    const savedConfig = localStorage.getItem("whatsappConfig");
    return savedConfig ? JSON.parse(savedConfig) : defaultConfig;
  } catch (error) {
    console.error("Error loading WhatsApp config:", error);
    return defaultConfig;
  }
};

// Save config to localStorage
const saveConfig = (config: WhatsAppConfig): void => {
  try {
    localStorage.setItem("whatsappConfig", JSON.stringify(config));
  } catch (error) {
    console.error("Error saving WhatsApp config:", error);
  }
};

export const whatsappService = {
  // Get current configuration
  getConfig: (): WhatsAppConfig => {
    return loadConfig();
  },

  // Update configuration
  updateConfig: (config: WhatsAppConfig): WhatsAppConfig => {
    saveConfig(config);
    return config;
  },

  // Generate WhatsApp link
  generateWhatsAppLink: (customMessage?: string): string => {
    const config = loadConfig();
    const message = encodeURIComponent(customMessage || config.welcomeMessage);
    return `https://wa.me/${config.phoneNumber}?text=${message}`;
  },

  // Simulate sending a WhatsApp message (in a real app, this would use the WhatsApp Business API)
  sendMessage: async (phone: string, message: string): Promise<boolean> => {
    // This is just a simulation
    console.log(`Sending WhatsApp message to ${phone}: ${message}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, we would call the WhatsApp API here
    return true;
  }
};
