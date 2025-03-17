
import { useClientContext } from "@/contexts/ClientContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrdersList from "@/components/client/orders/OrdersList";
import WishlistSection from "@/components/client/wishlist/WishlistSection";
import CartSection from "@/components/client/cart/CartSection";
import UserProfileSection from "@/components/client/profile/UserProfileSection";
import SettingsSection from "@/components/client/settings/SettingsSection";
import { UserProfile } from "@/types/client";
import { toast } from "sonner";

interface ClientContentProps {
  onUpdateProfile: (profile: UserProfile) => void;
}

export default function ClientContent({ onUpdateProfile }: ClientContentProps) {
  const {
    orders,
    wishlist,
    cartItems,
    profile,
    handleRemoveFromWishlist,
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateCartItemQuantity,
    handleOrderDetails,
    handleCheckout
  } = useClientContext();

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    onUpdateProfile(updatedProfile);
    toast.success("Perfil atualizado com sucesso!");
  };

  return (
    <div className="flex-1">
      <Tabs defaultValue="pedidos">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="pedidos">Meus Pedidos</TabsTrigger>
          <TabsTrigger value="desejos">Lista de Desejos</TabsTrigger>
          <TabsTrigger value="carrinho">Meu Carrinho</TabsTrigger>
          <TabsTrigger value="perfil">Meu Perfil</TabsTrigger>
          <TabsTrigger value="config">Configurações</TabsTrigger>
        </TabsList>
        
        {/* Pedidos Tab */}
        <TabsContent value="pedidos">
          <OrdersList 
            orders={orders}
            onViewDetails={handleOrderDetails}
          />
        </TabsContent>
        
        {/* Lista de Desejos Tab */}
        <TabsContent value="desejos">
          <WishlistSection
            wishlist={wishlist}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onAddToCart={handleAddToCart}
          />
        </TabsContent>
        
        {/* Carrinho Tab */}
        <TabsContent value="carrinho">
          <CartSection
            cartItems={cartItems}
            onRemoveItem={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateCartItemQuantity}
            onCheckout={handleCheckout}
          />
        </TabsContent>
        
        {/* Perfil Tab */}
        <TabsContent value="perfil">
          <UserProfileSection
            profile={profile}
            onUpdateProfile={handleSaveProfile}
          />
        </TabsContent>
        
        {/* Configurações Tab */}
        <TabsContent value="config">
          <SettingsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
