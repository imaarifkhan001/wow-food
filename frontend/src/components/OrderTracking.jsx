import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Truck, CheckCircle2, ChefHat, Sparkles, AlertCircle, ShoppingBag, Eye } from 'lucide-react';

export default function OrderTracking({ token }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Custom simulation stage: 'auto' (based on time) or 0 (Placed), 1 (Prep), 2 (Delivery), 3 (Delivered)
  const [simulationStage, setSimulationStage] = useState('auto');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Periodically refresh orders from database to track live status updates
  useEffect(() => {
    let intervalId;
    if (token) {
      intervalId = setInterval(() => {
        fetch('http://localhost:8081/api/orders/my-orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.length > 0) {
            setOrders(data);
            if (selectedOrder) {
              const updated = data.find(ord => ord.id === selectedOrder.id);
              if (updated) {
                setSelectedOrder(updated);
              }
            }
          }
        })
        .catch(err => console.error('Silent status poll error:', err));
      }, 5000);
    }
    return () => clearInterval(intervalId);
  }, [token, selectedOrder]);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8081/api/orders/my-orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load orders.');
      }

      const data = await response.json();
      setOrders(data);
      if (data.length > 0) {
        setSelectedOrder(data[0]); // default to latest order
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Map string status to index
  const getStageFromStatus = (status) => {
    switch (status) {
      case 'PLACED': return 0;
      case 'PREPARING': return 1;
      case 'OUT_FOR_DELIVERY': return 2;
      case 'DELIVERED': return 3;
      default: return 0;
    }
  };

  // Get active stage (either simulated or real backend status)
  const getActiveStage = () => {
    if (simulationStage !== 'auto') {
      return parseInt(simulationStage);
    }
    if (selectedOrder?.status) {
      return getStageFromStatus(selectedOrder.status);
    }
    return 0;
  };

  const activeStage = getActiveStage();

  const stagesInfo = [
    { name: 'Order Placed', desc: 'We have received your order and confirmed payment.', icon: <CheckCircle2 size={24} /> },
    { name: 'Kitchen Preparing', desc: 'Our master chefs are cooking your fresh hot meal.', icon: <ChefHat size={24} /> },
    { name: 'Out for Delivery', desc: 'Wow rider is rushing to your delivery address.', icon: <Truck size={24} /> },
    { name: 'Delivered', desc: 'Order received. Enjoy your meal and write us a review!', icon: <ShoppingBag size={24} /> }
  ];

  if (!token) {
    return (
      <div style={{ padding: '80px 0', textAlign: 'center' }} className="anim-fade-in">
        <div className="glass-panel" style={{ padding: '48px 24px', maxWidth: '500px', margin: '0 auto', border: '1px solid var(--glass-border)' }}>
          <AlertCircle size={48} color="var(--primary)" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Login to Track Orders</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
            You need to be signed in to see live progress and locations of your food deliveries.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 0' }} className="anim-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Truck size={28} color="var(--primary)" />
            Live Delivery Tracking
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            Monitor your order status in real-time.
          </p>
        </div>
        <button 
          className="btn btn-secondary" 
          onClick={fetchOrders}
          style={{ fontSize: '13px', padding: '8px 16px' }}
        >
          Refresh Status
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', flexDirection: 'column', gap: '16px' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid rgba(255, 255, 255, 0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'fadeIn 1s infinite linear' }} />
          <p style={{ color: 'var(--text-secondary)' }}>Connecting to GPS tracking...</p>
        </div>
      ) : error ? (
        <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid var(--error)', borderRadius: '8px', padding: '24px', textAlign: 'center', color: '#ff6b6b' }}>
          <p style={{ fontWeight: '600' }}>Error: {error}</p>
        </div>
      ) : orders.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', flexWrap: 'wrap' }}>
          {/* Timeline and Live Map Mock */}
          <div className="glass-panel" style={{ padding: '32px', border: '1px solid var(--glass-border)' }}>
            
            {/* Order Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '600' }}>Track Order:</span>
              <select 
                value={selectedOrder ? selectedOrder.id : ''} 
                onChange={(e) => {
                  const o = orders.find(ord => ord.id === parseInt(e.target.value));
                  setSelectedOrder(o);
                }}
                className="form-input"
                style={{ flex: 1, padding: '6px 12px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '6px' }}
              >
                {orders.map((ord, idx) => (
                  <option key={ord.id} value={ord.id}>
                    Order #WF-00{ord.id} ({ord.orderItems.length} items) - ₹{ord.totalAmount} {idx === 0 ? '[LATEST]' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Stage Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', position: 'relative' }}>
              
              {/* Connecting line */}
              <div style={{
                position: 'absolute',
                left: '23px',
                top: '24px',
                bottom: '24px',
                width: '3px',
                background: 'rgba(255, 255, 255, 0.08)',
                zIndex: 1
              }} />

              {/* Glowing active progress line fill */}
              <div style={{
                position: 'absolute',
                left: '23px',
                top: '24px',
                height: `${(activeStage / 3) * 100}%`,
                maxHeight: 'calc(100% - 48px)',
                width: '3px',
                background: 'linear-gradient(to bottom, var(--success), var(--primary))',
                zIndex: 2,
                transition: 'height 0.8s ease'
              }} />

              {/* Render Stages */}
              {stagesInfo.map((stage, idx) => {
                const isCompleted = idx < activeStage;
                const isActive = idx === activeStage;
                const isPending = idx > activeStage;

                let iconColor = 'var(--text-muted)';
                let glowClass = {};
                let borderCol = 'var(--glass-border)';

                if (isActive) {
                  iconColor = 'var(--primary)';
                  borderCol = 'var(--primary)';
                  glowClass = {
                    boxShadow: '0 0 15px rgba(255,122,0,0.5)',
                    animation: 'pulseGlow 2s infinite'
                  };
                } else if (isCompleted) {
                  iconColor = 'var(--success)';
                  borderCol = 'var(--success)';
                }

                return (
                  <div 
                    key={stage.name}
                    style={{ 
                      display: 'flex', 
                      gap: '20px', 
                      padding: '16px 0', 
                      alignItems: 'flex-start',
                      zIndex: 3
                    }}
                  >
                    {/* Circle icon */}
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: isActive ? 'rgba(255, 122, 0, 0.15)' : isCompleted ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.02)',
                      border: '2px solid',
                      borderColor: borderCol,
                      color: iconColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.5s ease',
                      ...glowClass
                    }}>
                      {stage.icon}
                    </div>

                    {/* Text Details */}
                    <div>
                      <h4 style={{ 
                        fontSize: '16px', 
                        fontWeight: '700', 
                        color: isActive ? 'var(--primary)' : isCompleted ? 'var(--success)' : 'var(--text-secondary)',
                        marginBottom: '4px',
                        transition: 'color 0.5s ease'
                      }}>
                        {stage.name}
                        {isActive && <span style={{ marginLeft: '10px', fontSize: '11px', background: 'rgba(255,122,0,0.15)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', verticalAlign: 'middle', fontWeight: 'bold' }}>ACTIVE</span>}
                      </h4>
                      <p style={{ fontSize: '13px', color: isPending ? 'var(--text-muted)' : 'var(--text-secondary)', lineHeight: '1.4' }}>
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Simulation Panel & Order Details Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            

            {/* Selected Order Summary details */}
            {selectedOrder && (
              <div className="glass-panel" style={{ padding: '24px', border: '1px solid var(--glass-border)' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Eye size={18} color="var(--primary)" />
                  Order Summary
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '8px' }}>
                    <span>Order Reference</span>
                    <span style={{ color: '#fff', fontWeight: '600' }}>#WF-00{selectedOrder.id}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '8px' }}>
                    <span>Amount Payable</span>
                    <span style={{ color: '#fff', fontWeight: '700' }}>₹{selectedOrder.totalAmount}</span>
                  </div>
                  
                  {/* Delivery address details */}
                  <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '8px' }}>
                    <MapPin size={14} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Deliver to</span>
                      <span style={{ lineHeight: '1.3' }}>{selectedOrder.address}</span>
                    </div>
                  </div>

                  {/* Items list summary */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Items</span>
                    {selectedOrder.orderItems.map(item => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{item.foodItem.name} <span style={{ color: 'var(--text-muted)' }}>× {item.quantity}</span></span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
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
            <Truck size={40} color="var(--text-muted)" />
          </div>
          <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>No active orders to track</p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Please browse our menu, add items to your cart, and place an order to unlock live tracking.
          </p>
        </div>
      )}
    </div>
  );
}
