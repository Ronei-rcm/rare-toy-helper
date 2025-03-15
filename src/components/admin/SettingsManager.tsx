
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function SettingsManager() {
  const [storeSettings, setStoreSettings] = useState({
    storeName: "MUHLSTORE",
    storeEmail: "contact@muhlstore.com",
    storePhone: "(00) 1234-5678",
    storeAddress: "Rua das Brinquedos, 123 - São Paulo, SP",
    currency: "BRL",
  });

  const handleSaveStoreSettings = () => {
    // Would save to backend in real implementation
    toast.success("Store settings saved successfully");
  };

  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "MUHLSTORE - Rare and Used Toys Collection",
    metaDescription: "Discover rare and vintage toys at MUHLSTORE. Collectible action figures, classic board games, and more!",
    metaKeywords: "vintage toys, rare toys, collectibles, action figures, board games",
  });

  const handleSaveSeoSettings = () => {
    // Would save to backend in real implementation
    toast.success("SEO settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your store settings</p>
      </div>
      
      <Tabs defaultValue="store">
        <TabsList className="mb-4">
          <TabsTrigger value="store">Store Information</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>
        
        <TabsContent value="store" className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input 
                  id="storeName" 
                  value={storeSettings.storeName}
                  onChange={(e) => setStoreSettings({...storeSettings, storeName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeEmail">Email</Label>
                <Input 
                  id="storeEmail" 
                  type="email"
                  value={storeSettings.storeEmail}
                  onChange={(e) => setStoreSettings({...storeSettings, storeEmail: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="storePhone">Phone</Label>
                <Input 
                  id="storePhone" 
                  value={storeSettings.storePhone}
                  onChange={(e) => setStoreSettings({...storeSettings, storePhone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input 
                  id="currency" 
                  value={storeSettings.currency}
                  onChange={(e) => setStoreSettings({...storeSettings, currency: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="storeAddress">Address</Label>
              <Input 
                id="storeAddress" 
                value={storeSettings.storeAddress}
                onChange={(e) => setStoreSettings({...storeSettings, storeAddress: e.target.value})}
              />
            </div>
            
            <Button onClick={handleSaveStoreSettings}>Save Changes</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="seo" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input 
                id="metaTitle" 
                value={seoSettings.metaTitle}
                onChange={(e) => setSeoSettings({...seoSettings, metaTitle: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Input 
                id="metaDescription" 
                value={seoSettings.metaDescription}
                onChange={(e) => setSeoSettings({...seoSettings, metaDescription: e.target.value})}
              />
              <p className="text-sm text-gray-500">Keep it under 160 characters for best results</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="metaKeywords">Meta Keywords</Label>
              <Input 
                id="metaKeywords" 
                value={seoSettings.metaKeywords}
                onChange={(e) => setSeoSettings({...seoSettings, metaKeywords: e.target.value})}
              />
              <p className="text-sm text-gray-500">Separate keywords with commas</p>
            </div>
            
            <Button onClick={handleSaveSeoSettings}>Save Changes</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-6">
          <div className="py-6 text-center">
            <p className="text-gray-500">Payment configuration options will be available here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="shipping" className="space-y-6">
          <div className="py-6 text-center">
            <p className="text-gray-500">Shipping configuration options will be available here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
