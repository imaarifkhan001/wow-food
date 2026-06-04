import React, { useState } from 'react';
import { X, MapPin, Phone, CreditCard, ChevronRight } from 'lucide-react';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  totalAmount, 
  onPlaceOrder, 
  submitting 
}) {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod, upi
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!address.trim()) {
      setError('Please enter your delivery address');
      return;
    }
    if (!phone.trim()) {
      setError('Please enter your contact phone number');
      return;
    }
    if (phone.trim().length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    onPlaceOrder({ address, phone, paymentMethod });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', fontFamily: 'var(--font-serif)' }}>Delivery Details</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid var(--error)', padding: '10px 14px', borderRadius: '6px', color: '#ff6b6b', fontSize: '13px', fontWeight: '500' }}>
              {error}
            </div>
          )}

          {/* Address Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} color="var(--primary)" />
              Delivery Address
            </label>
            <textarea
              placeholder="Enter your complete home or office address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-input"
              rows={3}
              style={{ resize: 'none', fontFamily: 'inherit' }}
              disabled={submitting}
            />
          </div>

          {/* Phone Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={14} color="var(--primary)" />
              Contact Phone Number
            </label>
            <input
              type="tel"
              placeholder="10-digit mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="form-input"
              disabled={submitting}
            />
          </div>

          {/* Payment Method Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CreditCard size={14} color="var(--primary)" />
              Payment Method
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div 
                onClick={() => !submitting && setPaymentMethod('cod')}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: paymentMethod === 'cod' ? 'var(--primary)' : 'var(--glass-border)',
                  background: paymentMethod === 'cod' ? 'rgba(255,122,0,0.06)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: paymentMethod === 'cod' ? 'var(--primary)' : 'var(--text-secondary)',
                  transition: 'var(--transition-fast)'
                }}
              >
                Cash on Delivery
              </div>
              <div 
                onClick={() => !submitting && setPaymentMethod('upi')}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: paymentMethod === 'upi' ? 'var(--primary)' : 'var(--glass-border)',
                  background: paymentMethod === 'upi' ? 'rgba(255,122,0,0.06)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: paymentMethod === 'upi' ? 'var(--primary)' : 'var(--text-secondary)',
                  transition: 'var(--transition-fast)'
                }}
              >
                Mock Net Banking/UPI
              </div>
            </div>
          </div>

          {/* Order Summary box */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Amount Payable:</span>
            <span style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>₹{totalAmount}</span>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose} 
              style={{ flex: 1 }}
              disabled={submitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ flex: 2 }}
              disabled={submitting}
            >
              {submitting ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.2)', borderTopColor: '#fff', borderRadius: '50%', animation: 'fadeIn 0.6s infinite linear' }} />
                  Placing Order...
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Confirm & Place Order
                  <ChevronRight size={16} />
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
