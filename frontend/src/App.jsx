import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MenuSection from './components/MenuSection';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AuthModal from './components/AuthModal';
import OrderHistory from './components/OrderHistory';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import OrderTracking from './components/OrderTracking';
import AdminPanel from './components/AdminPanel';
import { ShoppingBag, ChevronRight, Award, Truck, ShieldCheck, CheckCircle, AlertTriangle } from 'lucide-react';
import { getFoods, placeOrder, isMockMode } from './api';

export default function App() {
  // Authentication State
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Cart State
  const [cart, setCart] = useState([]);

  // UI state
  const [activeTab, setActiveTab] = useState('menu');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Data State
  const [foods, setFoods] = useState([]);
  const [loadingFoods, setLoadingFoods] = useState(true);
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  // Toast System State
  const [toasts, setToasts] = useState([]);

  // Toast Trigger helper
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Restore session from localStorage on startup
  useEffect(() => {
    const savedToken = localStorage.getItem('wowfood_token');
    const savedUser = localStorage.getItem('wowfood_user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Fetch foods from backend
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await getFoods();
        setFoods(data);
        setDemoMode(isMockMode());
      } catch (err) {
        console.error('Error fetching food data:', err);
        addToast('Unable to connect to the backend server. Make sure it is running!', 'error');
      } finally {
        setLoadingFoods(false);
      }
    };
    fetchFoods();
  }, []);

  // Auth Operations
  const handleAuthSuccess = (authData) => {
    const { token: userToken, email, name } = authData;
    const userData = { email, name };
    
    setToken(userToken);
    setUser(userData);
    
    localStorage.setItem('wowfood_token', userToken);
    localStorage.setItem('wowfood_user', JSON.stringify(userData));
    
    addToast(`Welcome back, ${name}! Logged in successfully.`);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setCart([]);
    localStorage.removeItem('wowfood_token');
    localStorage.removeItem('wowfood_user');
    setActiveTab('menu');
    addToast('Logged out successfully. Goodbye!');
  };

  // Cart Operations
  const handleAddToCart = (foodItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.food.id === foodItem.id);
      if (existing) {
        return prev.map(item => 
          item.food.id === foodItem.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { food: foodItem, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (foodId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(foodId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.food.id === foodId ? { ...item, quantity: newQty } : item
    ));
  };

  const handleRemoveItem = (foodId) => {
    const item = cart.find(item => item.food.id === foodId);
    setCart(prev => prev.filter(item => item.food.id !== foodId));
    if (item) {
      addToast(`${item.food.name} removed from your cart.`, 'error');
    }
  };

  // Checkout Operations
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    
    // Check if user is logged in
    if (!token) {
      addToast('Please login or register to place your order.', 'error');
      setIsAuthOpen(true);
      return;
    }

    setIsCheckoutOpen(true);
  };

  const handlePlaceOrder = async ({ address, phone, paymentMethod }) => {
    setOrderSubmitting(true);
    
    const orderItemsPayload = cart.map(item => ({
      foodItemId: item.food.id,
      quantity: item.quantity
    }));

    try {
      await placeOrder({
        address,
        phone,
        items: orderItemsPayload
      }, token);

      // Success order placement
      addToast('Delicious choice! Your order has been placed successfully.');
      setCart([]); // Reset Cart
      setIsCheckoutOpen(false);
      setActiveTab('orders'); // Jump to Previous Orders tab
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setOrderSubmitting(false);
    }
  };

  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartTotalAmount = cart.reduce((total, item) => total + (item.food.price * item.quantity), 0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation */}
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartItemsCount={cartItemsCount}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {demoMode && (
        <div style={{ 
          background: 'rgba(255, 122, 0, 0.08)', 
          borderBottom: '1px solid rgba(255, 122, 0, 0.15)', 
          padding: '10px 16px', 
          textAlign: 'center', 
          fontSize: '13px', 
          color: 'var(--primary)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          backdropFilter: 'blur(8px)',
          fontFamily: 'inherit'
        }}>
          <span>🍽️</span>
          <span><strong>Vercel Demo Mode:</strong> Backend is offline. Your orders, signups, and status updates will run locally in your browser!</span>
        </div>
      )}

      {/* Main Pages Content */}
      <main style={{ flex: 1 }}>
        {activeTab === 'menu' && (
          <div>
            {/* Hero Section Container */}
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div className="container hero-section">
                <div className="hero-content anim-slide-up">
                  <span className="hero-subtitle">Taste the Antigravity Magic</span>
                  <h1 className="hero-title">
                    Gourmet Food,<br />
                    Delivered with <span style={{ color: 'var(--primary)' }}>Wow</span> Speed.
                  </h1>
                  <p className="hero-description">
                    Indulge in a premium range of sizzling fast foods, chef's special main courses, and chilled revitalizing mocktails. Crafted with authentic Indian spices, priced for food lovers.
                  </p>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <a href="#menu-anchor" style={{ textDecoration: 'none' }}>
                      <button className="btn btn-primary" style={{ padding: '14px 28px', borderRadius: '30px', fontSize: '15px' }}>
                        Order Online Now
                        <ChevronRight size={18} />
                      </button>
                    </a>
                  </div>
                </div>

                <div className="hero-image-container anim-fade-in">
                  <div className="hero-image-wrapper">
                    <img 
                      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80" 
                      alt="Wow Food Plate" 
                      className="hero-image"
                    />
                  </div>
                  <div className="hero-glow"></div>
                </div>
              </div>
            </div>

            {/* Feature Badges Container */}
            <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid rgba(255, 255, 255, 0.03)' }}>
              <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px', padding: '40px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: 'rgba(255, 122, 0, 0.1)', padding: '12px', borderRadius: '50%' }}>
                    <Award size={24} color="var(--primary)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>Premium Quality</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Cooked by certified master chefs</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: 'rgba(255, 122, 0, 0.1)', padding: '12px', borderRadius: '50%' }}>
                    <Truck size={24} color="var(--primary)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>Express Delivery</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Fresh & hot at your doorstep in 30 mins</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ background: 'rgba(255, 122, 0, 0.1)', padding: '12px', borderRadius: '50%' }}>
                    <ShieldCheck size={24} color="var(--primary)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>Safe & Clean Packaging</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Hygienically handled from pan to box</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Sections Anchor */}
            <div id="menu-anchor" className="container">
              <MenuSection 
                foods={foods} 
                onAddToCart={handleAddToCart}
                loading={loadingFoods}
              />
            </div>
          </div>
        )}
        {activeTab === 'orders' && (
          <div className="container">
            <OrderHistory token={token} />
          </div>
        )}
        {activeTab === 'track' && (
          <div className="container">
            <OrderTracking token={token} />
          </div>
        )}
        {activeTab === 'about' && (
          <div className="container">
            <AboutUs />
          </div>
        )}
        {activeTab === 'contact' && (
          <div className="container">
            <ContactUs onAddToast={addToast} />
          </div>
        )}
        {activeTab === 'admin' && (
          <div className="container">
            <AdminPanel />
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)', padding: '40px 0', marginTop: 'auto' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: '700', color: 'var(--primary)', marginBottom: '6px' }}>Wow Food</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>© {new Date().getFullYear()} Wow Food Inc. All rights reserved.</p>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Made with ❤️ using React & Spring Boot.
          </p>
        </div>
      </footer>

      {/* Modals & Panels Overlay Trigger */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleProceedToCheckout}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        totalAmount={cartTotalAmount}
        onPlaceOrder={handlePlaceOrder}
        submitting={orderSubmitting}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Toast Alert Popups */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`toast ${toast.type === 'success' ? 'toast-success' : 'toast-error'}`}
          >
            {toast.type === 'success' ? (
              <CheckCircle size={16} color="#fff" />
            ) : (
              <AlertTriangle size={16} color="#fff" />
            )}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
