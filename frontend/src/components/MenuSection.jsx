import React, { useState } from 'react';
import FoodCard from './FoodCard';
import { Grid, Pizza, Soup, Coffee, Search } from 'lucide-react';

export default function MenuSection({ foods, onAddToCart, loading }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'All', icon: <Grid size={16} /> },
    { name: 'Fast Food', icon: <Pizza size={16} /> },
    { name: 'Main Course', icon: <Soup size={16} /> },
    { name: 'Drinks', icon: <Coffee size={16} /> }
  ];

  // Filter foods by both category and search query
  const filteredFoods = foods.filter(food => {
    const matchesCategory = selectedCategory === 'All' || food.category === selectedCategory;
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          food.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section style={{ padding: '60px 0' }}>
      {/* Menu Header with Filters & Search */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
              Explore Our Delicious Menu
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
              Handcrafted meals prepared fresh every day, delivered straight to your door.
            </p>
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <input 
              type="text" 
              placeholder="Search dishes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '44px', borderRadius: '30px' }}
            />
            <Search 
              size={18} 
              color="var(--text-muted)" 
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} 
            />
          </div>
        </div>

        {/* Filter categories */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '16px' }}>
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className="btn"
              style={{
                background: selectedCategory === cat.name ? 'rgba(255, 122, 0, 0.12)' : 'transparent',
                border: '1px solid',
                borderColor: selectedCategory === cat.name ? 'var(--primary)' : 'var(--glass-border)',
                color: selectedCategory === cat.name ? 'var(--primary)' : 'var(--text-secondary)',
                borderRadius: '30px',
                padding: '8px 18px',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Foods Grid */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', flexDirection: 'column', gap: '16px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid rgba(255, 255, 255, 0.1)', 
            borderTopColor: 'var(--primary)', 
            borderRadius: '50%',
            animation: 'fadeIn 1s infinite linear' 
          }} />
          <p style={{ color: 'var(--text-secondary)' }}>Loading tasty foods...</p>
        </div>
      ) : filteredFoods.length > 0 ? (
        <div className="foods-grid">
          {filteredFoods.map(food => (
            <FoodCard 
              key={food.id} 
              food={food} 
              onAddToCart={onAddToCart} 
            />
          ))}
        </div>
      ) : (
        <div style={{ 
          background: 'var(--glass-bg)', 
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-md)',
          padding: '60px 24px', 
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}>
          <p style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>No dishes found</p>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Try searching for something else or change categories.</p>
        </div>
      )}
    </section>
  );
}
