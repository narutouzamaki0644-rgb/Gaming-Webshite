
import React from 'react';
import { ShoppingCart, Menu, X, User, Search, Monitor, Cpu, Box, HelpCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  cartCount: number;
  onCartToggle: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, cartCount, onCartToggle, onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col hero-glow">
      {/* Navbar */}
      <nav className="z-50 bg-transparent py-6">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <span className="text-xl font-black tracking-tighter uppercase">WynderPC</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              <button onClick={() => onNavigate('products')} className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors">Products</button>
              <button onClick={() => onNavigate('build-assistant')} className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors">Build Custom PC</button>
              <button onClick={() => onNavigate('contact')} className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors">Contact</button>
              
              <button 
                onClick={() => onNavigate('build-assistant')}
                className="bg-[#00FFD1] hover:bg-[#00e6bc] text-black px-6 py-2.5 rounded-sm font-black text-[10px] tracking-widest uppercase transition-all"
              >
                Pre-Order Now
              </button>
              
              <div className="flex items-center space-x-4 ml-4">
                <button onClick={() => onNavigate('login')} className="text-zinc-400 hover:text-white transition-colors">
                  <User className="w-5 h-5" />
                </button>
                <button onClick={onCartToggle} className="text-zinc-400 hover:text-white transition-colors relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#00FFD1] text-black text-[8px] font-black h-3.5 w-3.5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer - keeping it minimal for this version */}
      <footer className="bg-transparent border-t border-zinc-900 py-12 mt-20">
        <div className="max-w-[1440px] mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-[10px] font-bold tracking-widest uppercase">
          <p>© 2024 WynderPC - Professional Grade</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
