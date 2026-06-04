import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout 
}) {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + item.food.price * item.quantity, 0);

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{ justifyContent: 'flex-end', alignItems: 'stretch' }}
    >
      <div 
        className="glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          borderRadius: 0,
          borderLeft: '1px solid var(--glass-border)',
          borderTop: 'none',
          borderBottom: 'none',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
        }}
      >
        {/* Drawer Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Your Cart</h2>
            <span style={{ 
              background: 'rgba(255,122,0,0.15)', 
              color: 'var(--primary)', 
              fontSize: '12px', 
              fontWeight: '700', 
              padding: '2px 8px', 
              borderRadius: '10px' 
            }}>
              {cartItems.length}
            </span>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Drawer Scrollable Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {cartItems.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cartItems.map(item => (
                <div 
                  key={item.food.id}
                  style={{ 
                    display: 'flex', 
                    gap: '14px', 
                    background: 'rgba(255, 255, 255, 0.02)', 
                    border: '1px solid rgba(255,255,255,0.04)',
                    padding: '12px', 
                    borderRadius: '10px',
                    alignItems: 'center'
                  }}
                >
                  <img 
                    src={item.food.imageUrl} 
                    alt={item.food.name} 
                    style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '6px' }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#f3f4f6' }}>{item.food.name}</h4>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>₹{item.food.price} each</span>
                    
                    {/* Quantity Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                      <button 
                        onClick={() => onUpdateQuantity(item.food.id, item.quantity - 1)}
                        style={{ 
                          background: 'rgba(255,255,255,0.05)', 
                          border: 'none', 
                          color: '#fff', 
                          borderRadius: '4px', 
                          width: '24px', 
                          height: '24px', 
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'center'
                        }}
                      >
                        <Minus size={12} style={{margin: 'auto'}} />
                      </button>
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.food.id, item.quantity + 1)}
                        style={{ 
                          background: 'rgba(255,255,255,0.05)', 
                          border: 'none', 
                          color: '#fff', 
                          borderRadius: '4px', 
                          width: '24px', 
                          height: '24px', 
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'center'
                        }}
                      >
                        <Plus size={12} style={{margin: 'auto'}} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Item Total & Remove */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                    <span style={{ fontSize: '15px', fontWeight: '700' }}>₹{item.food.price * item.quantity}</span>
                    <button 
                      onClick={() => onRemoveItem(item.food.id)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                      title="Remove Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px', color: 'var(--text-secondary)', textAlign: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '50%', border: '1px dashed var(--glass-border)' }}>
                <ShoppingBag size={48} color="var(--text-muted)" />
              </div>
              <div>
                <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>Your cart is empty</p>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Browse our menu to add yummy meals to your cart!</p>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer with Calculations */}
        {cartItems.length > 0 && (
          <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10, 10, 12, 0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Total Amount:</span>
              <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)' }}>₹{total}</span>
            </div>
            
            <button 
              className="btn btn-primary" 
              onClick={onCheckout}
              style={{ width: '100%', padding: '14px', borderRadius: '8px', fontSize: '16px' }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
