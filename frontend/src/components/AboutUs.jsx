import React from 'react';
import { ShieldCheck, Award, Heart, Leaf } from 'lucide-react';

export default function AboutUs() {
  return (
    <div style={{ padding: '60px 0' }} className="anim-fade-in">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', fontWeight: '700', marginBottom: '12px' }}>
          About Wow Food
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Bringing you premium gourmet flavors cooked with love, delivered with express speed.
        </p>
      </div>

      {/* Story Section */}
      <div className="glass-panel" style={{ padding: '40px', marginBottom: '48px', border: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: '700', color: 'var(--primary)', marginBottom: '16px' }}>
              Our Culinary Journey
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7', marginBottom: '16px' }}>
              Founded in 2026, Wow Food was born out of a simple passion: to make premium-quality fast foods, traditional Indian curries, and refreshing coolers easily accessible at reasonable prices.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7' }}>
              We merge authentic tandoori and subcontinental spices with modern fast-food favorites. Every single order is prepared fresh in clean, hygienic kitchens, using local farm-sourced ingredients.
            </p>
          </div>
          <div style={{ borderRadius: '12px', overflow: 'hidden', height: '260px' }}>
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&auto=format&fit=crop&q=80" 
              alt="Our Kitchen Chef" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
        <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ background: 'rgba(255, 122, 0, 0.1)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Leaf size={24} color="var(--primary)" />
          </div>
          <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>100% Fresh</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.5' }}>
            We only use fresh vegetables, dairy, and farm-harvested ingredients. No artificial preservatives.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ background: 'rgba(255, 122, 0, 0.1)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <ShieldCheck size={24} color="var(--primary)" />
          </div>
          <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Hygienic Kitchens</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.5' }}>
            Priding ourselves on extreme hygiene. Double-sanitized cooking processes from prep to dispatch.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ background: 'rgba(255, 122, 0, 0.1)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Award size={24} color="var(--primary)" />
          </div>
          <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Chef Curated</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.5' }}>
            Signature spice mixtures crafted by culinary masters to bring the exact rich taste profiles.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ background: 'rgba(255, 122, 0, 0.1)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Heart size={24} color="var(--primary)" />
          </div>
          <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Cooked with Care</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.5' }}>
            Every customer is family. We treat orders with ultimate passion to ensure you go 'Wow!' at first bite.
          </p>
        </div>
      </div>
    </div>
  );
}
