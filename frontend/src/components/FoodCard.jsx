import React from 'react';
import { Star, Plus } from 'lucide-react';

export default function FoodCard({ food, onAddToCart }) {
  const { name, description, price, imageUrl, rating, category } = food;

  return (
    <div className="glass-card anim-slide-up">
      {/* Food Image and Overlay Category */}
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img 
          src={imageUrl} 
          alt={name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <span style={{ 
          position: 'absolute', 
          top: '12px', 
          left: '12px', 
          background: 'rgba(10, 10, 12, 0.75)', 
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#ffbe1a', 
          fontSize: '11px', 
          fontWeight: '700', 
          padding: '4px 10px', 
          borderRadius: '20px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {category}
        </span>
      </div>

      {/* Card Info Content */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Title and Rating */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#f3f4f6', lineHeight: '1.3' }}>{name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255, 190, 26, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
            <Star size={12} fill="#ffbe1a" color="#ffbe1a" />
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#ffbe1a' }}>{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Description */}
        <p style={{ 
          fontSize: '13px', 
          color: '#9ca3af', 
          lineHeight: '1.5',
          height: '60px',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical'
        }}>
          {description}
        </p>

        {/* Price and Cart Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase' }}>Price</span>
            <span style={{ fontSize: '20px', fontWeight: '800', color: '#f3f4f6' }}>₹{price}</span>
          </div>
          <button 
            className="btn btn-primary" 
            onClick={() => onAddToCart(food)}
            style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '13px' }}
          >
            <Plus size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
