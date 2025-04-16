
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Package, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Order, OrderStatus } from "@/types/client";

interface OrdersListProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
}

export default function OrdersList({ orders, onViewDetails }: OrdersListProps) {
  const getStatusBadgeColor = (status: OrderStatus) => {
    switch (status) {
      case "pendente":
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "processando":
      case "processing": return "bg-blue-100 text-blue-800";
      case "enviado":
      case "shipped": return "bg-purple-100 text-purple-800";
      case "entregue":
      case "delivered": return "bg-green-100 text-green-800";
      case "cancelado":
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Meus Pedidos</h2>
        </div>
        
        <div className="divide-y">
          {orders.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum pedido encontrado</h3>
              <p className="text-gray-500 mb-4">Você ainda não fez nenhum pedido em nossa loja.</p>
              <Button asChild>
                <Link to="/collection">Explorar Produtos</Link>
              </Button>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">Pedido #{order.id}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Realizado em {new Date(order.date || order.createdAt || "").toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    <p className="font-medium">R$ {order.total.toFixed(2)}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => onViewDetails(order)}
                    >
                      Detalhes
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <p className="font-medium">{item.name || item.nome}</p>
                        <p className="text-sm text-gray-500">Qtd: {item.quantity || item.quantidade}</p>
                      </div>
                      <p className="font-medium">
                        R$ {((item.price || item.preco || 0) * (item.quantity || item.quantidade || 0)).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                
                {(order.trackingCode || order.trackingNumber) && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-md flex items-start">
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-blue-700">Rastreio da entrega</p>
                      <p className="text-sm">Código: {order.trackingCode || order.trackingNumber}</p>
                    </div>
                  </div>
                )}
                
                {(order.status === "entregue" || order.status === "delivered") && (
                  <div className="mt-4 text-right">
                    <Button variant="outline" size="sm">
                      Avaliar Produtos
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
