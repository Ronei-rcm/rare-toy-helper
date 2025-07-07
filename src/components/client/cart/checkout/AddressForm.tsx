import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AddressFormProps {
  // Add props for form control if needed later
}

export default function AddressForm({}: AddressFormProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2">
          <Label htmlFor="street">Rua</Label>
          <Input id="street" placeholder="Rua Exemplo" />
        </div>
        <div>
          <Label htmlFor="number">Número</Label>
          <Input id="number" placeholder="123" />
        </div>
      </div>
      
      <div>
        <Label htmlFor="complement">Complemento (opcional)</Label>
        <Input id="complement" placeholder="Apto 101" />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input id="neighborhood" placeholder="Centro" />
        </div>
        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" placeholder="São Paulo" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="state">Estado</Label>
          <Input id="state" placeholder="SP" />
        </div>
        <div>
          <Label htmlFor="zipcode">CEP</Label>
          <Input id="zipcode" placeholder="00000-000" />
        </div>
      </div>
    </div>
  );
}