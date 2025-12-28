import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { ShoppingBag, X, ArrowRight, ArrowUpRight, Minus, Plus, Check, Menu } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { CartProvider, useCart } from './context/CartContext';
import { Product } from './types';

// --- MOCK DATA ---
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Monstera',
    botanicalName: 'Monstera Deliciosa',
    price: 65,
    description: 'An icon of the aroid family. Known for its fenestrated leaves that split as they mature, creating a dramatic, architectural silhouette. Thrives in bright, indirect light and demands space to unfurl its legacy.',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1200&auto=format&fit=crop',
    difficulty: 'Beginner',
    light: 'Medium',
    water: 'Weekly'
  },
  {
    id: '2',
    name: 'Fiddle Leaf Fig',
    botanicalName: 'Ficus Lyrata',
    price: 120,
    description: 'The definitive statement piece. Its large, violin-shaped leaves are sculptural and bold. A demanding beauty that requires consistent light and humidity, rewarding the attentive keeper with magnificent vertical growth.',
    image: 'https://images.unsplash.com/photo-1617173944883-663d6711f4a9?q=80&w=1200&auto=format&fit=crop',
    difficulty: 'Intermediate',
    light: 'Bright',
    water: 'Weekly'
  },
  {
    id: '3',
    name: 'Snake Plant',
    botanicalName: 'Sansevieria Trifasciata',
    price: 45,
    description: 'Structural resilience. Vertical, sword-like leaves patterned with variegated greens. Virtually indestructible, it purifies the air and thrives in neglect, making it the perfect entry into botanical ownership.',
    image: 'https://images.unsplash.com/photo-1599598425947-2cb2c8c6db24?q=80&w=1200&auto=format&fit=crop',
    difficulty: 'Beginner',
    light: 'Low',
    water: 'Monthly'
  },
  {
    id: '4',
    name: 'Olive Tree',
    botanicalName: 'Olea Europaea',
    price: 150,
    description: 'Mediterranean heritage. Silvery-green foliage and a gnarled trunk evoke ancient landscapes. Requires abundant sunlight to maintain its ethereal, wispy form indoors.',
    image: 'https://images.unsplash.com/photo-1603436326446-04e5d77369d6?q=80&w=1200&auto=format&fit=crop',
    difficulty: 'Expert',
    light: 'Bright',
    water: 'Bi-weekly'
  },
  {
    id: '5',
    name: 'Bird of Paradise',
    botanicalName: 'Strelitzia Nicolai',
    price: 95,
    description: 'Tropical grandeur. Enormous, paddle-shaped leaves create a lush, jungle atmosphere. A fast grower that drinks deeply and leans towards the sun.',
    image: 'https://images.unsplash.com/photo-1533038590840-1cde6b468958?q=80&w=1200&auto=format&fit=crop',
    difficulty: 'Intermediate',
    light: 'Bright',
    water: 'Weekly'
  },
  {
    id: '6',
    name: 'Rubber Plant',
    botanicalName: 'Ficus Elastica',
    price: 55,
    description: 'Dark glamour. Thick, glossy burgundy leaves reflect light and add depth to lighter interiors. Sturdy and reliable, growing steadily into a commanding presence.',
    image: 'https://images.unsplash.com/photo-1598880940371-c756e026df78?q=80&w=1200&auto=format&fit=crop',
    difficulty: 'Beginner',
    light: 'Medium',
    water: 'Weekly'
  }
];

// --- COMPONENTS ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Header = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkText = isScrolled || !isHome || isMobileMenuOpen;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[0.16,1,0.3,1] ${
          isScrolled && !isMobileMenuOpen
            ? 'bg-[#F4F4F0]/90 backdrop-blur-xl py-3 shadow-sm border-b border-stone-200/50' 
            : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5 md:py-6 pointer-events-none'
        } ${isDarkText ? 'text-[#1A1A18]' : 'text-[#F4F4F0]'}`}
      >
        <div className="flex justify-between items-start px-6 md:px-12">
          <Link to="/" className="pointer-events-auto block group" onClick={() => setIsMobileMenuOpen(false)}>
            <h1 className="font-serif text-2xl md:text-3xl leading-[0.9] tracking-tight font-medium relative z-50 transition-transform duration-500 ease-out origin-top-left group-hover:scale-105 drop-shadow-lg">
              Verdant<br />Vogue<span className={isDarkText ? "text-emerald-700" : "text-emerald-400"}>.</span>
            </h1>
          </Link>

          <div className="flex items-center gap-6 md:gap-12 pointer-events-auto pt-1 relative z-50">
            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold drop-shadow-md">
              <Link to="/shop" className="hover:text-emerald-400 transition-colors">Shop</Link>
              <Link to="/about" className="hover:text-emerald-400 transition-colors">About</Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden group flex items-center justify-center w-8 h-8 pointer-events-auto"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button 
              onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}
              className="group flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold drop-shadow-md"
            >
              <span className="hidden md:inline group-hover:text-emerald-400 transition-colors">Cart</span>
              <span className={`flex items-center justify-center w-6 h-6 rounded-full border transition-all duration-300 ${
                  isDarkText
                  ? 'border-stone-900/30 group-hover:bg-stone-900 group-hover:text-[#F4F4F0]' 
                  : 'border-white/50 group-hover:bg-white group-hover:text-[#1A1A18] backdrop-blur-sm'
              }`}>
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#F4F4F0] flex flex-col justify-center items-center pointer-events-auto"
          >
            <nav className="flex flex-col items-center gap-10 font-serif text-4xl md:text-5xl text-[#1A1A18]">
              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-emerald-700 transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-emerald-700 transition-colors"
              >
                Shop
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-emerald-700 transition-colors"
              >
                About
              </Link>
            </nav>
            <div className="absolute bottom-10 text-xs uppercase tracking-widest text-stone-400">
               Verdant Vogue © 2024
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const CartDrawer = () => {
  const { items, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#F4F4F0] z-[70] shadow-2xl flex flex-col border-l border-stone-200"
          >
            <div className="p-8 md:p-12 flex justify-between items-end border-b border-stone-200">
              <h2 className="font-serif text-3xl md:text-4xl italic">Your Selection</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-6">
                  <span className="font-serif text-2xl italic">Empty</span>
                  <button onClick={() => setIsCartOpen(false)} className="text-stone-900 uppercase text-xs tracking-widest border-b border-stone-900 pb-1 hover:opacity-50 transition-opacity">
                    View Collection
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-24 h-32 overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                             <h4 className="font-serif text-lg md:text-xl">{item.name}</h4>
                             <button onClick={() => removeFromCart(item.id)} className="text-stone-400 hover:text-stone-900 transition-colors">
                                <X className="w-4 h-4" />
                             </button>
                        </div>
                        <p className="text-xs text-stone-500 uppercase tracking-wider mt-1">{item.botanicalName}</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-4">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-stone-200 rounded-full transition-colors"><Minus className="w-3 h-3" /></button>
                          <span className="font-medium text-sm w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-stone-200 rounded-full transition-colors"><Plus className="w-3 h-3" /></button>
                        </div>
                        <span className="text-lg font-medium">${item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 md:p-12 bg-white border-t border-stone-200 safe-area-bottom">
                <div className="flex justify-between text-xl font-serif mb-6">
                  <span className="italic">Total</span>
                  <span>${cartTotal}</span>
                </div>
                <Link 
                  to="/checkout" 
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-[#1A1A18] text-[#F4F4F0] py-5 uppercase tracking-widest text-xs font-bold hover:bg-emerald-900 transition-colors flex items-center justify-between px-8 group"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  return (
    <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className="group cursor-pointer"
    >
      <Link to={`/product/${product.id}`} className="block">
          <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-stone-200">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
            <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
            />
            <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="bg-white px-4 py-2 text-xs uppercase tracking-widest font-medium shadow-md">View Object</span>
            </div>
          </div>
          <div className="flex justify-between items-baseline border-b border-stone-200 pb-4 group-hover:border-stone-900 transition-colors duration-500">
            <div>
                <h3 className="font-serif text-2xl mb-1">{product.name}</h3>
                <p className="text-xs text-stone-500 uppercase tracking-wider">{product.botanicalName}</p>
            </div>
            <span className="text-lg font-medium">${product.price}</span>
          </div>
      </Link>
    </motion.div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#1A1A18] text-[#F4F4F0]">
        {/* Background Image Parallax & Zoom Effect */}
        <motion.div 
            style={{ y: y1 }} 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 10, ease: "easeOut", opacity: { duration: 1.5 } }}
            className="absolute inset-0"
        >
             <img 
                src="https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=2400&auto=format&fit=crop" 
                alt="Hero" 
                className="w-full h-full object-cover" 
            />
             <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/80 via-transparent to-transparent" />
        </motion.div>

        {/* Floating Abstract Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
             <motion.div 
                animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 right-[10%] w-64 h-64 bg-emerald-900/20 rounded-full blur-3xl mix-blend-screen"
             />
             <motion.div 
                animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/3 left-[5%] w-96 h-96 bg-stone-700/20 rounded-full blur-3xl mix-blend-screen"
             />
        </div>

        <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-10 pb-6 md:pb-10">
            {/* Centered Main Typography */}
            <div className="flex-1 flex flex-col justify-center my-auto relative pt-24 md:pt-32">
                <div className="relative z-20 mix-blend-overlay">
                    <div className="overflow-hidden">
                        <motion.h1 
                            initial={{ y: "100%" }} 
                            animate={{ y: 0 }} 
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="font-serif text-[18vw] leading-[0.75] tracking-tighter text-[#F4F4F0]"
                        >
                            OBJECTS
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden flex items-center justify-end md:pr-[4vw]">
                         <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="italic font-serif text-[4vw] md:text-[3vw] text-[#F4F4F0] mr-4 md:mr-8 opacity-90"
                         >
                            of
                         </motion.div>
                        <motion.h1 
                            initial={{ y: "100%" }} 
                            animate={{ y: 0 }} 
                            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="font-serif text-[18vw] leading-[0.75] tracking-tighter text-[#F4F4F0]"
                        >
                            NATURE
                        </motion.h1>
                    </div>
                </div>
            </div>
            
            {/* Bottom Section */}
            <div className="flex flex-col-reverse md:flex-row justify-between items-end border-t border-white/10 pt-6 relative gap-8 md:gap-0">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 1.2 }}
                    className="text-xs uppercase tracking-widest max-w-xs text-white/50 leading-relaxed text-center md:text-left mx-auto md:mx-0"
                >
                    <p>Elevate your space with rare botanicals.<br/>Sourced responsibly. Delivered with care.</p>
                </motion.div>

                {/* Animated Scroll Indicator - Hidden on very small screens to save space */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 hidden sm:flex flex-col items-center gap-4 pb-4"
                >
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
                    <div className="h-16 w-[1px] bg-white/10 overflow-hidden relative">
                        <motion.div 
                            animate={{ y: ["-100%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-emerald-400"
                        />
                    </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="self-end md:self-auto">
                    <Link to="/shop" className="group relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#F4F4F0] text-[#1A1A18] flex items-center justify-center text-xs font-bold uppercase tracking-widest overflow-hidden shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                        <span className="relative z-10 group-hover:text-[#F4F4F0] transition-colors duration-500 delay-75">Shop Now</span>
                        <div className="absolute inset-0 bg-[#1A1A18] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1]" />
                    </Link>
                </motion.div>
            </div>
        </div>
    </section>
  );
};

const IntroSection = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#F4F4F0] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
         <div className="md:col-span-5 relative order-2 md:order-1">
             <div className="aspect-[4/5] overflow-hidden bg-stone-200">
                <motion.img 
                   initial={{ scale: 1.2 }}
                   whileInView={{ scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 1.5 }}
                   src="https://images.unsplash.com/photo-1598331668826-20cecc596b86?q=80&w=1200&auto=format&fit=crop" 
                   alt="Interior" 
                   className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
             </div>
             <motion.div 
                initial={{ rotate: 0 }}
                whileInView={{ rotate: 360 }}
                viewport={{ once: true }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-10 -right-10 md:-right-16 w-32 h-32 md:w-40 md:h-40 bg-[#1A1A18] rounded-full flex items-center justify-center"
             >
                <div className="w-full h-full relative flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32 absolute animate-spin-slow">
                        <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent"/>
                        <text className="text-[11px] uppercase tracking-[0.2em] font-bold fill-[#F4F4F0]">
                            <textPath href="#curve">
                                Verdant Vogue • Est MMXIV •
                            </textPath>
                        </text>
                    </svg>
                    <span className="text-[#F4F4F0] text-2xl font-serif italic">V</span>
                </div>
             </motion.div>
         </div>
         <div className="md:col-span-1 order-1 md:order-2" />
         <div className="md:col-span-6 order-1 md:order-3">
             <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs uppercase tracking-[0.2em] mb-8 text-stone-500"
             >
                The Philosophy
             </motion.h2>
             <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-serif text-4xl md:text-6xl leading-[1.1] mb-10"
             >
                We believe plants are the <span className="italic text-emerald-700">soul</span> of a home.
             </motion.h3>
             <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-stone-600 leading-relaxed mb-10 max-w-md"
             >
                Each specimen in our collection is chosen for its architectural form and ability to transform space. We bridge the gap between wild nature and curated interior design.
             </motion.p>
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
             >
                <Link to="/about" className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest border-b border-[#1A1A18] pb-1 hover:text-emerald-700 hover:border-emerald-700 transition-colors">
                    Read Our Story
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
             </motion.div>
         </div>
      </div>
    </section>
  );
};

// --- PAGES ---

const HomePage = () => {
  return (
    <>
      <Hero />
      <IntroSection />
      <section className="py-24 md:py-32 bg-[#F4F4F0] px-6 md:px-10">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end">
            <h2 className="font-serif text-5xl md:text-7xl leading-tight text-[#1A1A18]">
                Curated <span className="italic text-stone-400">Flora</span>
            </h2>
            <Link to="/shop" className="group flex items-center gap-2 uppercase text-xs tracking-widest mt-8 md:mt-0">
                View All Collection 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20">
            <div className="lg:mt-32">
                 <ProductCard product={PRODUCTS[0]} index={0} />
            </div>
            <div>
                 <ProductCard product={PRODUCTS[1]} index={1} />
            </div>
            <div className="lg:mt-64">
                 <ProductCard product={PRODUCTS[2]} index={2} />
            </div>
        </div>
      </section>
    </>
  );
};

const ShopPage = () => {
  return (
    <div className="min-h-screen bg-[#F4F4F0] pt-32 md:pt-40 pb-20 px-6 md:px-10">
      <div className="mb-16 md:mb-24">
        <h1 className="font-serif text-[10vw] leading-[0.8] text-[#1A1A18] mb-8 md:mb-12">
          THE <span className="italic block ml-[10vw] md:ml-[20vw]">COLLECTION</span>
        </h1>
        <div className="h-px w-full bg-stone-300" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 md:gap-y-32">
        {PRODUCTS.map((product, idx) => (
          <div key={product.id} className={idx % 2 === 1 ? "md:mt-32" : ""}>
            <ProductCard product={product} index={idx} />
          </div>
        ))}
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="bg-[#F4F4F0] min-h-screen">
       {/* Hero Section */}
       <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-6 md:px-10">
          <motion.h1 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[12vw] leading-[0.8] text-[#1A1A18] mb-12"
          >
            LIVING <br /> <span className="italic ml-[10vw] text-stone-400">ARTISTRY</span>
          </motion.h1>
       </section>

       {/* Image Section */}
       <section className="w-full h-[50vh] md:h-[80vh] overflow-hidden relative mb-24 md:mb-32">
          <motion.div 
             initial={{ scale: 1.2 }}
             whileInView={{ scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5 }}
             className="w-full h-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=2500&auto=format&fit=crop" 
              alt="Greenhouse" 
              className="w-full h-full object-cover"
            />
          </motion.div>
       </section>

       {/* Narrative Section */}
       <section className="px-6 md:px-10 mb-24 md:mb-40">
          <div className="flex flex-col md:flex-row gap-12 md:gap-32">
             <div className="md:w-1/3">
                <h2 className="text-xs uppercase tracking-widest border-b border-stone-300 pb-4 mb-8">Our Ethos</h2>
             </div>
             <div className="md:w-2/3">
                <p className="font-serif text-3xl md:text-5xl leading-tight mb-12">
                   We don't just sell plants. We curate living sculptures that transform spaces into sanctuaries.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm leading-relaxed text-stone-600">
                   <p>
                      Founded in 2014, Verdant Vogue emerged from a simple observation: plants are often treated as afterthoughts in interior design. We sought to change that paradigm by elevating botanicals to the status of fine art.
                   </p>
                   <p>
                      Every specimen in our collection is hand-selected for its architectural form, health, and rarity. We work directly with sustainable growers who share our passion for botanical excellence.
                   </p>
                </div>
             </div>
          </div>
       </section>

       {/* Values / Stats */}
       <section className="bg-[#1A1A18] text-[#F4F4F0] py-24 md:py-32 px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20">
             <div className="border-l border-white/20 pl-8">
                <span className="block text-5xl md:text-6xl font-serif mb-4">10+</span>
                <span className="text-xs uppercase tracking-widest text-stone-400">Years of Curation</span>
             </div>
             <div className="border-l border-white/20 pl-8">
                <span className="block text-5xl md:text-6xl font-serif mb-4">50+</span>
                <span className="text-xs uppercase tracking-widest text-stone-400">Rare Species</span>
             </div>
             <div className="border-l border-white/20 pl-8">
                <span className="block text-5xl md:text-6xl font-serif mb-4">0%</span>
                <span className="text-xs uppercase tracking-widest text-stone-400">Plastic Packaging</span>
             </div>
          </div>
       </section>
       
       {/* Team/Visual Section */}
       <section className="py-24 md:py-40 px-6 md:px-10">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
             <div className="w-full md:w-1/2 aspect-[4/5] overflow-hidden bg-stone-200 relative group">
                <img 
                   src="https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=1200&auto=format&fit=crop" 
                   alt="Curator" 
                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
             </div>
             <div className="w-full md:w-1/2">
                <h2 className="font-serif text-4xl md:text-6xl mb-8">The Curator's Eye</h2>
                <p className="text-stone-600 mb-8 max-w-md">
                   Our lead botanist, Elena Vance, travels the globe to find specimens that defy the ordinary. From the humid forests of Costa Rica to the arid landscapes of Madagascar, every plant has a story.
                </p>
                <Link to="/shop" className="inline-block border-b border-[#1A1A18] pb-1 uppercase text-xs tracking-widest hover:opacity-50 transition-opacity">
                   Explore the Collection
                </Link>
             </div>
          </div>
       </section>
    </div>
  );
};

const ProductDetailsPage = () => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart } = useCart();

  if (!product) return <div className="pt-40 text-center">Product not found</div>;

  return (
    <div className="min-h-screen bg-[#F4F4F0] pt-24 md:pt-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left: Sticky Image */}
        <div className="relative h-[50vh] lg:h-[calc(100vh-160px)] lg:sticky lg:top-40 px-6 md:px-10 mb-8 lg:mb-0">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full overflow-hidden bg-stone-200"
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Right: Scrollable Content */}
        <div className="px-6 md:px-10 lg:pr-20 pb-40">
            <div className="border-t border-stone-900 pt-6 mb-8 md:mb-12 flex justify-between items-start">
                <span className="text-xs uppercase tracking-widest">{product.id.padStart(3, '0')}</span>
                <span className="text-xs uppercase tracking-widest">{product.difficulty} Level</span>
            </div>

            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-serif text-5xl md:text-8xl mb-4 text-[#1A1A18] leading-[0.9]"
            >
                {product.name}
            </motion.h1>
            <p className="text-lg md:text-xl italic font-serif text-stone-500 mb-10 md:mb-12">{product.botanicalName}</p>

            <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-16">
                <div className="flex-1">
                    <h3 className="text-xs uppercase tracking-widest mb-6 border-b border-stone-200 pb-2">Description</h3>
                    <p className="text-base md:text-lg leading-relaxed text-stone-800 font-light">
                        {product.description}
                    </p>
                </div>
                <div className="w-full md:w-48 shrink-0">
                    <h3 className="text-xs uppercase tracking-widest mb-6 border-b border-stone-200 pb-2">Specs</h3>
                    <ul className="space-y-4 text-sm">
                        <li className="flex justify-between">
                            <span className="text-stone-500">Light</span>
                            <span>{product.light}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-stone-500">Water</span>
                            <span>{product.water}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-stone-500">Height</span>
                            <span>~45cm</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="sticky bottom-6 z-20">
                <div className="bg-[#1A1A18] text-[#F4F4F0] p-2 flex justify-between items-center pr-2 pl-6 shadow-2xl">
                    <span className="font-serif text-2xl">${product.price}</span>
                    <button 
                        onClick={() => addToCart(product)}
                        className="bg-[#F4F4F0] text-[#1A1A18] px-6 md:px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-emerald-400 hover:text-white transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const { items, cartTotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen pt-40 px-6 text-center bg-[#F4F4F0]">
        <h1 className="font-serif text-4xl mb-4">Your bag is empty.</h1>
        <Link to="/shop" className="underline hover:text-stone-500 transition-colors">Continue Shopping</Link>
      </div>
    );
  }

  if (isSuccess) {
     return (
       <div className="min-h-screen pt-40 px-6 flex flex-col items-center justify-center text-center bg-[#F4F4F0]">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 mb-8">
            <Check className="w-10 h-10" />
          </div>
          <h1 className="font-serif text-5xl mb-6">Order Confirmed.</h1>
          <p className="text-stone-500 max-w-md mb-8">
            Thank you for choosing Verdant Vogue. Your botanical selection is being prepared for its journey.
          </p>
          <Link to="/" className="bg-[#1A1A18] text-[#F4F4F0] px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-emerald-900 transition-colors">
            Back to Home
          </Link>
       </div>
     )
  }

  return (
    <div className="min-h-screen bg-[#F4F4F0] pt-24 md:pt-32 pb-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
        {/* Left: Form */}
        <div>
          <h1 className="font-serif text-4xl mb-12">Checkout</h1>
          
          <form onSubmit={(e) => { e.preventDefault(); setIsProcessing(true); setTimeout(() => setIsSuccess(true), 2000); }}>
            <div className="mb-12">
              <h3 className="text-xs uppercase tracking-widest mb-6 border-b border-stone-300 pb-2">Contact</h3>
              <input type="email" placeholder="Email" required className="w-full bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-emerald-600 transition-colors mb-4 placeholder:text-stone-400" />
              <div className="flex items-center gap-2">
                 <input type="checkbox" id="newsletter" className="accent-emerald-600" />
                 <label htmlFor="newsletter" className="text-sm text-stone-500 cursor-pointer">Subscribe to our botanical journal</label>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-xs uppercase tracking-widest mb-6 border-b border-stone-300 pb-2">Shipping Address</h3>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <input type="text" placeholder="First Name" required className="w-full bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-emerald-600 transition-colors placeholder:text-stone-400" />
                <input type="text" placeholder="Last Name" required className="w-full bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-emerald-600 transition-colors placeholder:text-stone-400" />
              </div>
              <input type="text" placeholder="Address" required className="w-full bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-emerald-600 transition-colors mb-4 placeholder:text-stone-400" />
              <div className="grid grid-cols-3 gap-6">
                 <input type="text" placeholder="City" required className="col-span-1 bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-emerald-600 transition-colors placeholder:text-stone-400" />
                 <input type="text" placeholder="Country" required className="col-span-1 bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-emerald-600 transition-colors placeholder:text-stone-400" />
                 <input type="text" placeholder="Postal Code" required className="col-span-1 bg-transparent border-b border-stone-300 py-3 focus:outline-none focus:border-emerald-600 transition-colors placeholder:text-stone-400" />
              </div>
            </div>

            <div className="mb-12">
               <h3 className="text-xs uppercase tracking-widest mb-6 border-b border-stone-300 pb-2">Payment</h3>
               <div className="border border-stone-300 rounded-lg p-4 flex items-center gap-4 bg-white/50 mb-4">
                  <div className="w-4 h-4 rounded-full border-2 border-emerald-600 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-600" />
                  </div>
                  <span className="font-medium">Credit Card</span>
               </div>
               <div className="p-6 bg-stone-100/50 rounded-lg border border-stone-200">
                  <input type="text" placeholder="Card Number" className="w-full bg-transparent border-b border-stone-300 py-3 mb-4 text-sm focus:outline-none focus:border-emerald-600 placeholder:text-stone-400" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM / YY" className="w-full bg-transparent border-b border-stone-300 py-3 text-sm focus:outline-none focus:border-emerald-600 placeholder:text-stone-400" />
                    <input type="text" placeholder="CVC" className="w-full bg-transparent border-b border-stone-300 py-3 text-sm focus:outline-none focus:border-emerald-600 placeholder:text-stone-400" />
                  </div>
               </div>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full bg-[#1A1A18] text-[#F4F4F0] py-5 uppercase tracking-widest text-xs font-bold hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
            >
              {isProcessing ? 'Processing Order...' : `Pay $${cartTotal}`}
            </button>
          </form>
        </div>

        {/* Right: Summary */}
        <div className="lg:pl-10">
           <div className="bg-white p-8 md:p-12 sticky top-40 shadow-sm border border-stone-100">
              <h3 className="font-serif text-2xl mb-8">Order Summary</h3>
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-stone-100 shrink-0">
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale opacity-80" />
                    </div>
                    <div className="flex-1">
                       <div className="flex justify-between mb-1">
                          <span className="font-serif">{item.name}</span>
                          <span>${item.price * item.quantity}</span>
                       </div>
                       <p className="text-xs text-stone-500">{item.botanicalName}</p>
                       <p className="text-xs text-stone-400 mt-1">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-stone-100 pt-6 space-y-3 text-sm">
                 <div className="flex justify-between">
                    <span className="text-stone-500">Subtotal</span>
                    <span>${cartTotal}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-stone-500">Shipping</span>
                    <span className="text-stone-400 text-xs uppercase tracking-wider">Free (Premium)</span>
                 </div>
              </div>
              <div className="border-t border-stone-100 pt-6 mt-6 flex justify-between font-serif text-xl">
                 <span>Total</span>
                 <span>${cartTotal}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
    <footer className="bg-[#1A1A18] text-[#F4F4F0] pt-24 md:pt-40 pb-10 px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between mb-24 md:mb-40">
            <h2 className="font-serif text-[12vw] leading-none mb-10 md:mb-0">
                Verdant<br/><span className="italic text-stone-600">Vogue.</span>
            </h2>
            <div className="flex gap-20 text-sm uppercase tracking-widest md:pt-8">
                <ul className="space-y-4">
                    <li className="text-stone-500 mb-6">Socials</li>
                    <li><a href="#" className="hover:text-emerald-400">Instagram</a></li>
                    <li><a href="#" className="hover:text-emerald-400">Pinterest</a></li>
                    <li><a href="#" className="hover:text-emerald-400">Twitter</a></li>
                </ul>
                <ul className="space-y-4">
                    <li className="text-stone-500 mb-6">Sitemap</li>
                    <li><Link to="/shop" className="hover:text-emerald-400">Shop</Link></li>
                    <li><Link to="/about" className="hover:text-emerald-400">About</Link></li>
                    <li><Link to="#" className="hover:text-emerald-400">Journal</Link></li>
                    <li><Link to="#" className="hover:text-emerald-400">Contact</Link></li>
                </ul>
            </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/10 pt-8 text-xs text-stone-500 uppercase tracking-wider gap-4 md:gap-0">
            <p>&copy; 2024 Verdant Vogue. Est MMXIV.</p>
            <p>Designed by Gemini.</p>
        </div>
    </footer>
);

// --- MAIN APP ---

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="bg-[#F4F4F0] text-[#1A1A18] min-h-screen">
          <Header />
          <CartDrawer />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;