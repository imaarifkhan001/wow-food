import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function ContactUs({ onAddToast }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      onAddToast('Please fill out all contact fields.', 'error');
      return;
    }
    setSending(true);
    setTimeout(() => {
      onAddToast('Message sent! Our support team will get back to you shortly.');
      setName('');
      setEmail('');
      setMessage('');
      setSending(false);
    }, 1000);
  };

  return (
    <div style={{ padding: '60px 0' }} className="anim-fade-in">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', fontWeight: '700', marginBottom: '12px' }}>
          Contact Us
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Got questions? Feedback? Or just want to say hi? Reach out to us anytime!
        </p>
      </div>

      <div className="responsive-grid-contact">
        {/* Contact Form */}
        <div className="glass-panel" style={{ padding: '32px', border: '1px solid var(--glass-border)' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>Send Us a Message</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="responsive-grid-contact-form">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  disabled={sending}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  disabled={sending}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)' }}>Message</label>
              <textarea
                placeholder="Write your comments here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-input"
                rows={5}
                style={{ resize: 'none' }}
                disabled={sending}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ padding: '12px 24px', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px' }}
              disabled={sending}
            >
              <Send size={16} />
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Contact Info Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'center', border: '1px solid var(--glass-border)' }}>
            <div style={{ background: 'rgba(255, 122, 0, 0.1)', padding: '12px', borderRadius: '50%' }}>
              <MapPin size={22} color="var(--primary)" />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>Our Location</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                Wow Food Plaza, 5th Main Road, Sector 7, HSR Layout, Bengaluru, Karnataka - 560102
              </p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'center', border: '1px solid var(--glass-border)' }}>
            <div style={{ background: 'rgba(255, 122, 0, 0.1)', padding: '12px', borderRadius: '50%' }}>
              <Phone size={22} color="var(--primary)" />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>Support & Delivery</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>+91 98765 43210 (Toll Free)</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>support@wowfood.com</p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'center', border: '1px solid var(--glass-border)' }}>
            <div style={{ background: 'rgba(255, 122, 0, 0.1)', padding: '12px', borderRadius: '50%' }}>
              <Clock size={22} color="var(--primary)" />
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>Working Hours</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Daily: 11:00 AM - 11:30 PM</p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Orders dispatch closes at 11:15 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
