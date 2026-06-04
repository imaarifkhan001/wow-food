import React, { useEffect, useState } from 'react';
import { ShoppingBag, Clock, MapPin, Phone, RefreshCw, Layers, CheckCircle2, ChevronRight, User } from 'lucide-react';

export default function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL, ACTIVE (PLACED, PREPARING, OUT_FOR_DELIVERY), COMPLETED (DELIVERED)
  const [updatingId, setUpdatingId] = useState(null);

  const fetchAllOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8081/api/orders/all');
      if (!response.ok) {
        throw new Error('Failed to retrieve system orders.');
      }
      const data = await response.json();
      // Sort: newest orders first
      const sorted = data.sort((a, b) => b.id - a.id);
      setOrders(sorted);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const response = await fetch(`http://localhost:8081/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update order status.');
      }

      // Update state locally
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PLACED':
        return <span style={{ background: 'rgba(255, 190, 26, 0.15)', color: '#ffbe1a', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>PLACED</span>;
      case 'PREPARING':
        return <span style={{ background: 'rgba(255, 122, 0, 0.15)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>PREPARING</span>;
      case 'OUT_FOR_DELIVERY':
        return <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>DISPATCHED</span>;
      case 'DELIVERED':
        return <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--success)', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>DELIVERED</span>;
      default:
        return <span style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '11px' }}>{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  // Filter logic
  const filteredOrders = orders.filter(order => {
    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'ACTIVE') return order.status !== 'DELIVERED';
    if (statusFilter === 'COMPLETED') return order.status === 'DELIVERED';
    return true;
  });

  return (
    <div style={{ padding: '60px 0', minHeight: '80vh' }} className="anim-fade-in">
      {/* Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={28} color="var(--primary)" />
            Admin Order Management
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            Process incoming customer orders and update live delivery stages.
          </p>
        </div>
        
        <button className="btn btn-secondary" onClick={fetchAllOrders} style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <RefreshCw size={14} />
          Reload Orders
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '16px' }}>
        {['ALL', 'ACTIVE', 'COMPLETED'].map(filter => (
          <button
            key={filter}
            onClick={() => setStatusFilter(filter)}
            className="btn"
            style={{
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              background: statusFilter === filter ? 'rgba(255, 122, 0, 0.12)' : 'transparent',
              border: '1px solid',
              borderColor: statusFilter === filter ? 'var(--primary)' : 'var(--glass-border)',
              color: statusFilter === filter ? 'var(--primary)' : 'var(--text-secondary)'
            }}
          >
            {filter === 'ALL' ? 'All Orders' : filter === 'ACTIVE' ? 'Active / Processing' : 'Completed'}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', flexDirection: 'column', gap: '16px' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid rgba(255, 255, 255, 0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'fadeIn 1s infinite linear' }} />
          <p style={{ color: 'var(--text-secondary)' }}>Loading orders database...</p>
        </div>
      ) : error ? (
        <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid var(--error)', borderRadius: '8px', padding: '24px', textAlign: 'center', color: '#ff6b6b' }}>
          <p style={{ fontWeight: '600' }}>Error connecting to DB: {error}</p>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {filteredOrders.map(order => (
            <div 
              key={order.id} 
              className="glass-panel" 
              style={{ padding: '24px', border: '1px solid var(--glass-border)' }}
            >
              {/* Order Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '15px' }}>ORDER ID: #WF-00{order.id}</span>
                  {getStatusBadge(order.status)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-muted)' }}>
                  <Clock size={12} />
                  <span>Placed: {formatDate(order.orderDate)}</span>
                </div>
              </div>

              {/* Order Card Grid Content */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '24px', flexWrap: 'wrap' }}>
                
                {/* 1. Items column */}
                <div>
                  <h5 style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>Items</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {order.orderItems.map(item => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                        <span style={{ color: '#fff' }}>
                          {item.foodItem.name} <span style={{ color: 'var(--text-muted)', marginLeft: '4px' }}>× {item.quantity}</span>
                        </span>
                        <span style={{ fontWeight: '600' }}>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '8px', marginTop: '4px' }}>
                      <span style={{ fontWeight: '700', fontSize: '14px' }}>Total Bill:</span>
                      <span style={{ fontWeight: '800', fontSize: '16px', color: 'var(--primary)' }}>₹{order.totalAmount}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Customer details column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h5 style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Delivery Details</h5>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '13px' }}>
                    <User size={14} color="var(--primary)" />
                    <span style={{ color: '#fff', fontWeight: '500' }}>{order.user.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', fontSize: '13px', lineHeight: '1.3' }}>
                    <MapPin size={14} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{order.address}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '13px' }}>
                    <Phone size={14} color="var(--primary)" />
                    <span>{order.phone}</span>
                  </div>
                </div>

                {/* 3. Action / Status update column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
                  <h5 style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Update Delivery Status</h5>
                  
                  {order.status === 'PLACED' && (
                    <button 
                      onClick={() => updateStatus(order.id, 'PREPARING')}
                      className="btn btn-primary"
                      style={{ fontSize: '13px', padding: '10px 14px', width: '100%', borderRadius: '8px' }}
                      disabled={updatingId === order.id}
                    >
                      Prepare Food
                      <ChevronRight size={14} />
                    </button>
                  )}

                  {order.status === 'PREPARING' && (
                    <button 
                      onClick={() => updateStatus(order.id, 'OUT_FOR_DELIVERY')}
                      className="btn"
                      style={{ background: '#3b82f6', color: '#fff', fontSize: '13px', padding: '10px 14px', width: '100%', borderRadius: '8px' }}
                      disabled={updatingId === order.id}
                    >
                      Dispatch Order
                      <ChevronRight size={14} />
                    </button>
                  )}

                  {order.status === 'OUT_FOR_DELIVERY' && (
                    <button 
                      onClick={() => updateStatus(order.id, 'DELIVERED')}
                      className="btn btn-primary"
                      style={{ background: 'var(--success)', color: '#fff', fontSize: '13px', padding: '10px 14px', width: '100%', borderRadius: '8px' }}
                      disabled={updatingId === order.id}
                    >
                      Complete Order
                      <CheckCircle2 size={14} />
                    </button>
                  )}

                  {order.status === 'DELIVERED' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success)', fontSize: '14px', fontWeight: '700', padding: '8px', justifyContent: 'center' }}>
                      <CheckCircle2 size={16} />
                      Completed & Delivered
                    </div>
                  )}
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
          <ShoppingBag size={40} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
          <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>No orders found in this filter</p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Incoming orders placed by users will appear here immediately.</p>
        </div>
      )}
    </div>
  );
}
