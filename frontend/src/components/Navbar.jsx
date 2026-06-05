import React, { useState } from 'react';
import { ShoppingCart, LogOut, LogIn, History, UtensilsCrossed, User, Truck, Layers, Menu, X } from 'lucide-react';

export default function Navbar({ 
  user, 
  onLogout, 
  onOpenAuth, 
  onOpenCart, 
  cartItemsCount, 
  activeTab, 
  setActiveTab 
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        {/* Logo */}
        <div className="logo-text" onClick={() => handleTabClick('menu')}>
          <UtensilsCrossed size={28} color="#ff7a00" />
          Wow <span>Food</span>
        </div>

        {/* Navigation Tabs */}
        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li 
              className={`nav-link ${activeTab === 'menu' ? 'active' : ''}`}
              onClick={() => handleTabClick('menu')}
            >
              Menu
            </li>
            {user && (
              <li 
                className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => handleTabClick('orders')}
              >
                <History size={16} />
                Previous Orders
              </li>
            )}
            {user && (
              <li 
                className={`nav-link ${activeTab === 'track' ? 'active' : ''}`}
                onClick={() => handleTabClick('track')}
              >
                <Truck size={16} />
                Track Order
              </li>
            )}
            <li 
              className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => handleTabClick('about')}
            >
              About Us
            </li>
            <li 
              className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => handleTabClick('contact')}
            >
              Contact Us
            </li>
            <li 
              className={`nav-link admin-link ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => handleTabClick('admin')}
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
            <div className="user-profile-section">
              <div className="user-welcome">
                <User size={16} color="#ffbe1a" />
                <span>Hi, {user.name}</span>
              </div>
              <button 
                className="btn btn-secondary logout-btn" 
                onClick={onLogout}
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <button className="btn btn-primary login-btn" onClick={onOpenAuth}>
              <LogIn size={16} />
              Login
            </button>
          )}

          {/* Hamburger Menu Icon */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
