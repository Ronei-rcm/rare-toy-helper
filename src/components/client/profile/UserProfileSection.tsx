
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { UserProfile } from "@/types/client";

interface UserProfileSectionProps {
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
}

export default function UserProfileSection({ profile, onUpdateProfile }: UserProfileSectionProps) {
  const [localProfile, setLocalProfile] = useState<UserProfile>(profile);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleChangeEmail = () => {
    // Validação de email
    if (!newEmail) {
      setEmailError("O email não pode estar vazio");
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      setEmailError("Digite um email válido");
      return;
    }
    
    // Atualiza o email no perfil
    const updatedProfile = { 
      ...localProfile, 
      email: newEmail 
    };
    setLocalProfile(updatedProfile);
    
    setIsEmailDialogOpen(false);
    setNewEmail("");
    setEmailError("");
    
    onUpdateProfile(updatedProfile);
  };

  const handleSaveProfile = () => {
    onUpdateProfile(localProfile);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Meu Perfil</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Informações Pessoais</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <Input 
                    value={localProfile.name} 
                    onChange={(e) => setLocalProfile({...localProfile, name: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="flex gap-2">
                    <Input 
                      value={localProfile.email} 
                      readOnly
                      className="bg-gray-50 flex-grow"
                    />
                    <Button 
                      variant="outline" 
                      type="button" 
                      onClick={() => setIsEmailDialogOpen(true)}
                    >
                      Alterar
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <Input 
                    value={localProfile.phone} 
                    onChange={(e) => setLocalProfile({...localProfile, phone: e.target.value})} 
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Endereço</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Logradouro
                    </label>
                    <Input 
                      value={localProfile.address.street} 
                      onChange={(e) => setLocalProfile({
                        ...localProfile, 
                        address: {...localProfile.address, street: e.target.value}
                      })} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Número
                    </label>
                    <Input 
                      value={localProfile.address.number} 
                      onChange={(e) => setLocalProfile({
                        ...localProfile, 
                        address: {...localProfile.address, number: e.target.value}
                      })} 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Complemento
                  </label>
                  <Input 
                    value={localProfile.address.complement} 
                    onChange={(e) => setLocalProfile({
                      ...localProfile, 
                      address: {...localProfile.address, complement: e.target.value}
                    })} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bairro
                  </label>
                  <Input 
                    value={localProfile.address.neighborhood} 
                    onChange={(e) => setLocalProfile({
                      ...localProfile, 
                      address: {...localProfile.address, neighborhood: e.target.value}
                    })} 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cidade
                    </label>
                    <Input 
                      value={localProfile.address.city} 
                      onChange={(e) => setLocalProfile({
                        ...localProfile, 
                        address: {...localProfile.address, city: e.target.value}
                      })} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado
                    </label>
                    <Input 
                      value={localProfile.address.state} 
                      onChange={(e) => setLocalProfile({
                        ...localProfile, 
                        address: {...localProfile.address, state: e.target.value}
                      })} 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CEP
                  </label>
                  <Input 
                    value={localProfile.address.zipCode} 
                    onChange={(e) => setLocalProfile({
                      ...localProfile, 
                      address: {...localProfile.address, zipCode: e.target.value}
                    })} 
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSaveProfile}>
              <Check className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </div>
        </div>
      </div>
      
      {/* Dialog para alterar email */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar Email</DialogTitle>
            <DialogDescription>
              Digite seu novo endereço de email abaixo
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="new-email">
                Novo Email
              </label>
              <Input
                id="new-email"
                placeholder="seu@email.com"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-sm text-red-500 flex items-center mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {emailError}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEmailDialogOpen(false);
              setNewEmail("");
              setEmailError("");
            }}>
              Cancelar
            </Button>
            <Button onClick={handleChangeEmail}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
