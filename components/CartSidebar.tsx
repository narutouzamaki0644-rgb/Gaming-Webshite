
import React from 'react';
import { X, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout 
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-zinc-900 border-l border-zinc-800 shadow-2xl flex flex-col">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase tracking-tighter">Your Arsenal</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
              <div className="w-16 h-16 border-2 border-dashed border-zinc-700 rounded-full flex items-center justify-center">
                <Minus className="w-8 h-8" />
              </div>
              <p>Your cart is empty.</p>
              <button 
                onClick={onClose}
                className="text-cyan-400 font-bold hover:underline"
              >
                Go shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex space-x-4 animate-fadeIn">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded bg-zinc-800 border border-zinc-800"
                />
                <div className="flex-grow">
                  <h3 className="text-sm font-bold">{item.name}</h3>
                  <p className="text-zinc-400 text-xs mt-1 mb-2">{item.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 bg-zinc-950 px-2 py-1 rounded">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="text-zinc-500 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="text-zinc-500 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-cyan-400 font-bold text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => onRemove(item.id)}
                  className="p-1 text-zinc-600 hover:text-red-500 h-fit"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-zinc-800 bg-zinc-950/50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-zinc-400 text-sm uppercase tracking-widest">Subtotal</span>
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-black py-4 rounded font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] neon-shadow"
            >
              <CreditCard className="w-5 h-5" />
              <span>Checkout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
