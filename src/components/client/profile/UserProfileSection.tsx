
import React, { useState } from 'react';
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { Switch } from "../../../components/ui/switch";
import { UserProfile } from "../../../types/client";

interface UserProfileSectionProps {
  profile: UserProfile | null;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
}

export default function UserProfileSection({
  profile,
  onUpdateProfile,
}: UserProfileSectionProps) {
  const [formData, setFormData] = useState<UserProfile>(
    profile || {
      name: "",
      email: "",
      phone: "",
      addresses: [],
      notificationPreferences: {
        email: false,
        sms: false,
        push: false,
      },
    }
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (type: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [type]: checked,
      },
    }));
  };

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile || {
      name: "",
      email: "",
      phone: "",
      addresses: [],
      notificationPreferences: {
        email: false,
        sms: false,
        push: false,
      },
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* User Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Gerencie suas informações pessoais</CardDescription>
            </div>
            {!isEditing && (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Editar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
        {isEditing && (
          <CardFooter className="justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Salvar
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Notificações</CardTitle>
          <CardDescription>Gerencie suas preferências de notificação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificações por Email</p>
                <p className="text-sm text-gray-500">Receba atualizações sobre seus pedidos por email</p>
              </div>
              <Switch
                checked={formData.notificationPreferences?.email || false}
                onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                disabled={!isEditing}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificações por SMS</p>
                <p className="text-sm text-gray-500">Receba atualizações sobre seus pedidos por SMS</p>
              </div>
              <Switch
                checked={formData.notificationPreferences?.sms || false}
                onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                disabled={!isEditing}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificações Push</p>
                <p className="text-sm text-gray-500">Receba atualizações sobre seus pedidos pelo app</p>
              </div>
              <Switch
                checked={formData.notificationPreferences?.push || false}
                onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
