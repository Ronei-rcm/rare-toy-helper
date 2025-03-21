
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { whatsappService } from "@/services/whatsappService";

interface WhatsAppButtonProps {
  customMessage?: string;
  rounded?: boolean;
  className?: string;
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  showTooltip?: boolean;
}

export default function WhatsAppButton({
  customMessage,
  rounded = false,
  className = "",
  variant = "default",
  size = "default",
  showTooltip = true
}: WhatsAppButtonProps) {
  const config = whatsappService.getConfig();
  
  if (!config.enabled) {
    return null;
  }
  
  const handleClick = () => {
    const link = whatsappService.generateWhatsAppLink(customMessage);
    window.open(link, '_blank');
  };
  
  const buttonStyle = {
    backgroundColor: variant === "default" ? "#25D366" : undefined,
    borderRadius: rounded ? "9999px" : undefined,
  };
  
  const button = (
    <Button
      variant={variant}
      size={size}
      className={`gap-2 ${className}`}
      style={buttonStyle}
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-message-circle"
      >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      </svg>
      {size !== "icon" && <span>WhatsApp</span>}
    </Button>
  );
  
  if (!showTooltip) {
    return button;
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent>
          <p>Fale conosco pelo WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
