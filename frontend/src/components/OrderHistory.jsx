import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Phone, ShoppingBag, History } from 'lucide-react';
import { getMyOrders } from '../api';

export default function OrderHistory({ token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getMyOrders(token);
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Format Date string
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div style={{ padding: '60px 0', minHeight: '60vh' }} className="anim-fade-in">
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <History size={28} color="var(--primary)" />
          Your Order History
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          Review the status and details of your previous orders.
        </p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px', flexDirection: 'column', gap: '16px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid rgba(255, 255, 255, 0.1)', 
            borderTopColor: 'var(--primary)', 
            borderRadius: '50%',
            animation: 'fadeIn 1s infinite linear' 
          }} />
          <p style={{ color: 'var(--text-secondary)' }}>Retrieving your order records...</p>
        </div>
      ) : error ? (
        <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid var(--error)', borderRadius: '8px', padding: '24px', textAlign: 'center', color: '#ff6b6b' }}>
          <p style={{ fontWeight: '600' }}>Error: {error}</p>
        </div>
      ) : orders.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {orders.map(order => (
            <div 
              key={order.id} 
              className="glass-panel" 
              style={{ padding: '28px', border: '1px solid var(--glass-border)' }}
            >
              {/* Order Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: '700' }}>ORDER ID: #WF-00{order.id}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <Calendar size={14} />
                    <span>Placed on {formatDate(order.orderDate)}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Bill</span>
                  <span style={{ fontSize: '22px', fontWeight: '800', color: '#fff' }}>₹{order.totalAmount}</span>
                </div>
              </div>

              {/* Order Content Info */}
              <div className="responsive-grid-history">
                {/* Ordered Items list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Items Ordered</h4>
                  {order.orderItems.map(item => (
                    <div 
                      key={item.id}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.01)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}
                    >
                      <img 
                        src={item.foodItem.imageUrl} 
                        alt={item.foodItem.name} 
                        style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }}
                      />
                      <div style={{ flex: 1 }}>
                        <h5 style={{ fontSize: '14px', fontWeight: '600', color: '#f3f4f6' }}>{item.foodItem.name}</h5>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>₹{item.price} × {item.quantity}</span>
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#f3f4f6' }}>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Delivery Information box */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Delivery Address</h4>
                  
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '13px', lineHeight: '1.4' }}>
                    <MapPin size={14} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{order.address}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px' }}>
                    <Phone size={14} color="var(--primary)" />
                    <span style={{ color: 'var(--text-secondary)' }}>{order.phone}</span>
                  </div>

                  <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }}></span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--success)', textTransform: 'uppercase' }}>Delivered / Cash Received</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ 
          background: 'var(--glass-bg)', 
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-md)',
          padding: '64px 24px', 
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '50%', display: 'inline-block', marginBottom: '16px', border: '1px dashed var(--glass-border)' }}>
            <ShoppingBag size={40} color="var(--text-muted)" />
          </div>
          <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>No orders found</p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>You haven't placed any orders yet. Head to the menu to place your first one!</p>
        </div>
      )}
    </div>
  );
}
