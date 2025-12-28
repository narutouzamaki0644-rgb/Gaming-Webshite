
import React, { useState, useMemo } from 'react';
import { Layout } from './components/Layout';
import { CartSidebar } from './components/CartSidebar';
import { BuildAssistant } from './components/BuildAssistant';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import { 
  Plus,
  LogIn,
  CheckCircle,
  Truck,
  CreditCard
} from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<{name: string, email: string} | null>(null);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setCurrentPage('login');
    } else {
      setCurrentPage('checkout');
      setCheckoutStep('shipping');
    }
    setIsCartOpen(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setUser({ name: 'CyberGamer_99', email: 'pro@wynderpc.com' });
    setCurrentPage('home');
  };

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.quantity, 0), [cart]);

  const HomePage = () => (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 w-full pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 z-10 animate-fadeIn">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight leading-[0.85] mb-8">
              CYBER<br />
              <span className="gradient-text">POWER PC</span>
            </h1>
            <p className="text-zinc-500 text-sm max-w-sm mb-10 leading-relaxed font-medium">
              Elite hardware for elite competitors. Engineered for maximum frames and zero compromise.
            </p>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setCurrentPage('products')}
                className="bg-[#00FFD1] hover:bg-white text-black px-12 py-4 rounded-sm font-black text-[10px] tracking-[0.2em] uppercase transition-all shadow-lg active:scale-95 hover:shadow-[0_0_30px_rgba(0,255,209,0.4)]"
              >
                SEE PRODUCT
              </button>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative flex justify-center lg:justify-end">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-600/5 blur-[120px] -z-10 rounded-full" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-500/5 blur-[150px] -z-10 rounded-full" />
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1200" 
                alt="Elite Gaming Cabinet" 
                className="w-full max-w-[650px] object-contain drop-shadow-[0_0_60px_rgba(168,85,247,0.3)]"
              />
              <div className="absolute -top-10 -right-10 w-32 h-32 border border-zinc-800/50 rounded-full animate-spin [animation-duration:20s] -z-10" />
              <div className="absolute -bottom-10 -left-10 w-24 h-24 border border-cyan-500/20 rounded-full animate-pulse -z-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductsPage = () => (
    <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-20">
      <h2 className="text-4xl font-black uppercase tracking-tighter mb-12">Available Components</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map(product => (
          <div key={product.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-sm group hover:border-cyan-500/50 transition-all">
            <div className="aspect-square overflow-hidden mb-6 bg-black">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <span className="text-cyan-400 font-mono font-bold">${product.price}</span>
            </div>
            <p className="text-zinc-500 text-xs mb-6 line-clamp-2">{product.description}</p>
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-zinc-800 hover:bg-cyan-500 hover:text-black py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add to Arsenal
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const LoginPage = () => (
    <div className="max-w-md mx-auto py-32 px-8">
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-sm">
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
          <LogIn className="w-6 h-6 text-cyan-400" /> Member Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Username</label>
            <input type="text" className="w-full bg-black border border-zinc-800 rounded-sm p-3 text-sm focus:border-cyan-500 outline-none" placeholder="CYBERGAMER_99" required />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Password</label>
            <input type="password" className="w-full bg-black border border-zinc-800 rounded-sm p-3 text-sm focus:border-cyan-500 outline-none" placeholder="••••••••" required />
          </div>
          <button type="submit" className="w-full bg-cyan-500 text-black py-4 rounded-sm font-black text-[10px] tracking-[0.2em] uppercase hover:bg-white transition-all">
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );

  const CheckoutPage = () => (
    <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-20">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-8 mb-12">
            <div className={`flex items-center gap-2 ${checkoutStep === 'shipping' ? 'text-cyan-400' : 'text-zinc-500'}`}>
              <Truck className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Shipping</span>
            </div>
            <div className="h-px bg-zinc-800 flex-grow" />
            <div className={`flex items-center gap-2 ${checkoutStep === 'payment' ? 'text-cyan-400' : 'text-zinc-500'}`}>
              <CreditCard className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Payment</span>
            </div>
          </div>

          {checkoutStep === 'shipping' && (
            <div className="bg-zinc-900 border border-zinc-800 p-8 space-y-6">
              <h3 className="text-xl font-bold uppercase tracking-tight">Shipping Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <input className="bg-black border border-zinc-800 p-4 rounded-sm text-sm" placeholder="First Name" />
                <input className="bg-black border border-zinc-800 p-4 rounded-sm text-sm" placeholder="Last Name" />
              </div>
              <input className="w-full bg-black border border-zinc-800 p-4 rounded-sm text-sm" placeholder="Address" />
              <button onClick={() => setCheckoutStep('payment')} className="w-full bg-cyan-500 text-black py-4 rounded-sm font-black text-[10px] tracking-widest uppercase">Continue to Payment</button>
            </div>
          )}

          {checkoutStep === 'payment' && (
            <div className="bg-zinc-900 border border-zinc-800 p-8 space-y-6">
              <h3 className="text-xl font-bold uppercase tracking-tight">Payment Method</h3>
              <div className="bg-black border border-zinc-800 p-4 rounded-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CreditCard className="text-cyan-400" />
                  <span className="text-sm">•••• •••• •••• 4242</span>
                </div>
                <CheckCircle className="text-cyan-400 w-4 h-4" />
              </div>
              <button onClick={() => {setCart([]); setCheckoutStep('success');}} className="w-full bg-cyan-500 text-black py-4 rounded-sm font-black text-[10px] tracking-widest uppercase">Complete Order</button>
            </div>
          )}

          {checkoutStep === 'success' && (
            <div className="text-center py-20 bg-zinc-900 border border-zinc-800">
              <CheckCircle className="w-20 h-20 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Order Confirmed</h2>
              <p className="text-zinc-500 mb-8">Your hardware is being prepared for deployment.</p>
              <button onClick={() => setCurrentPage('home')} className="bg-zinc-800 px-8 py-3 text-[10px] font-black uppercase tracking-widest">Return Base</button>
            </div>
          )}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-8 h-fit">
          <h3 className="text-lg font-bold uppercase tracking-tight mb-8">Order Summary</h3>
          <div className="space-y-4 mb-8">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-zinc-400">{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-800 pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-cyan-400">${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'products': return <ProductsPage />;
      case 'build-assistant': return <BuildAssistant />;
      case 'checkout': return <CheckoutPage />;
      case 'login': return <LoginPage />;
      case 'contact': return (
        <div className="max-w-[1440px] mx-auto px-8 py-20 text-center">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">Support Uplink</h2>
          <p className="text-zinc-500">Contact our elite technicians at support@wynderpc.com</p>
        </div>
      );
      default: return <HomePage />;
    }
  };

  return (
    <Layout 
      cartCount={cartCount} 
      onCartToggle={() => setIsCartOpen(!isCartOpen)} 
      onNavigate={setCurrentPage} 
      currentPage={currentPage}
    >
      {renderContent()}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onUpdateQuantity={updateQuantity} 
        onRemove={removeFromCart} 
        onCheckout={handleCheckout} 
      />
    </Layout>
  );
};

export default App;