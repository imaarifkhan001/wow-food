import React from 'react';
import { ShoppingCart, LogOut, LogIn, History, UtensilsCrossed, User, Truck, Layers } from 'lucide-react';

export default function Navbar({ 
  user, 
  onLogout, 
  onOpenAuth, 
  onOpenCart, 
  cartItemsCount, 
  activeTab, 
  setActiveTab 
}) {
  return (
    <header className="navbar">
      <div className="container nav-container">
        {/* Logo */}
        <div className="logo-text" onClick={() => setActiveTab('menu')}>
          <UtensilsCrossed size={28} color="#ff7a00" />
          Wow <span>Food</span>
        </div>

        {/* Navigation Tabs */}
        <nav>
          <ul className="nav-links">
            <li 
              className={`nav-link ${activeTab === 'menu' ? 'active' : ''}`}
              onClick={() => setActiveTab('menu')}
            >
              Menu
            </li>
            {user && (
              <li 
                className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <History size={16} />
                Previous Orders
              </li>
            )}
            {user && (
              <li 
                className={`nav-link ${activeTab === 'track' ? 'active' : ''}`}
                onClick={() => setActiveTab('track')}
              >
                <Truck size={16} />
                Track Order
              </li>
            )}
            <li 
              className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              About Us
            </li>
            <li 
              className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveTab('contact')}
            >
              Contact Us
            </li>
            <li 
              className={`nav-link ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
              style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '16px', color: '#ffbe1a' }}
            >
              <Layers size={16} />
              Admin Panel
            </li>
          </ul>
        </nav>

        {/* Actions (Cart & Auth) */}
        <div className="nav-actions">
          {/* Cart Icon Button */}
          <button className="cart-icon-btn" onClick={onOpenCart} title="Open Cart">
            <ShoppingCart size={24} />
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </button>

          {/* User Section */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f3f4f6', fontSize: '14px', fontWeight: '500' }}>
                <User size={16} color="#ffbe1a" />
                <span>Hi, {user.name}</span>
              </div>
              <button 
                className="btn btn-secondary" 
                onClick={onLogout}
                style={{ padding: '6px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={onOpenAuth}>
              <LogIn size={16} />
              Login / Sign Up
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
