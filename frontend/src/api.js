// Wow Food Unified API Client with Automatic LocalStorage Fallback

const API_BASE = 'http://localhost:8081';

// Hardcoded food items to match backend seeds (used in mock mode)
const MOCK_FOODS = [
  // Fast Food
  {
    id: 1,
    name: "Wow Double Cheeseburger",
    category: "Fast Food",
    price: 189.0,
    description: "Double flame-grilled patties, double melted Cheddar cheese, fresh lettuce, tomatoes, and our signature Wow sauce in a toasted brioche bun.",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    rating: 4.8
  },
  {
    id: 2,
    name: "Peri Peri Crispy Fries",
    category: "Fast Food",
    price: 120.0,
    description: "Golden, crispy french fries seasoned with spicy peri-peri mix. Served with a side of creamy garlic mayonnaise.",
    imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80",
    rating: 4.5
  },
  {
    id: 3,
    name: "Spicy Buffalo Chicken Wings",
    category: "Fast Food",
    price: 249.0,
    description: "Crispy fried chicken wings tossed in our signature hot buffalo sauce, served with a blue cheese dip and celery sticks.",
    imageUrl: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&auto=format&fit=crop&q=80",
    rating: 4.7
  },
  {
    id: 4,
    name: "Grilled Paneer Tikka Wrap",
    category: "Fast Food",
    price: 160.0,
    description: "Tandoori-spiced paneer cubes grilled to perfection, rolled in a soft tortilla with crisp cabbage, onions, and spicy mint chutney.",
    imageUrl: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&auto=format&fit=crop&q=80",
    rating: 4.6
  },
  {
    id: 5,
    name: "Tandoori Paneer Tikka",
    category: "Fast Food",
    price: 199.0,
    description: "Cottage cheese chunks marinated in spiced yogurt, grilled in a clay oven with onions and bell peppers. Served with mint dip.",
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop&q=80",
    rating: 4.8
  },

  // Main Course
  {
    id: 6,
    name: "Butter Chicken & Butter Naan Combo",
    category: "Main Course",
    price: 349.0,
    description: "Boneless tandoori chicken cooked in a rich, buttery, and creamy tomato gravy. Served with 2 fresh, fluffy butter naans.",
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80",
    rating: 4.9
  },
  {
    id: 7,
    name: "Paneer Butter Masala & Jeera Rice",
    category: "Main Course",
    price: 299.0,
    description: "Fresh cottage cheese cubes in a luscious tomato-onion butter gravy, served alongside aromatic jeera (cumin) rice.",
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80",
    rating: 4.7
  },
  {
    id: 8,
    name: "Dal Makhani with Garlic Naan",
    category: "Main Course",
    price: 260.0,
    description: "Slow-cooked black lentils and red kidney beans simmered overnight with butter and cream. Served with fresh garlic naan.",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
    rating: 4.8
  },
  {
    id: 9,
    name: "Hyderabadi Veg Biryani",
    category: "Main Course",
    price: 220.0,
    description: "Fragrant long-grain basmati rice layered with spiced vegetables, saffron, and caramelized onions, cooked on 'dum'. Served with raita.",
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
    rating: 4.7
  },
  {
    id: 10,
    name: "Special Chicken Biryani",
    category: "Main Course",
    price: 280.0,
    description: "Succulent chicken pieces marinated in yogurt and spices, slow-cooked in layers of aromatic basmati rice and herbs. Served with salan.",
    imageUrl: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80",
    rating: 4.9
  },
  {
    id: 11,
    name: "Tawa Handi Paneer",
    category: "Main Course",
    price: 260.0,
    description: "Soft cottage cheese cubes cooked in a traditional handi gravy with freshly ground whole spices, capsicum, and thick onion sauce.",
    imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80",
    rating: 4.6
  },
  {
    id: 12,
    name: "Desi Handi Chicken",
    category: "Main Course",
    price: 320.0,
    description: "Tender bone-in chicken slow-cooked in a sealed clay handi with rich Indian spices, ginger, garlic, and tomato-based masala.",
    imageUrl: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&auto=format&fit=crop&q=80",
    rating: 4.8
  },

  // Drinks
  {
    id: 13,
    name: "Aromatic Masala Chai",
    category: "Drinks",
    price: 49.0,
    description: "Strong brewed tea with milk and infused with freshly crushed green cardamom, ginger, cloves, and cinnamon.",
    imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80",
    rating: 4.9
  },
  {
    id: 14,
    name: "Cold Coffee with Vanilla Ice Cream",
    category: "Drinks",
    price: 129.0,
    description: "Rich blended espresso, milk, and chocolate syrup topped with a scoop of premium vanilla ice cream and chocolate shavings.",
    imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80",
    rating: 4.7
  },
  {
    id: 15,
    name: "Sweet Mango Lassi",
    category: "Drinks",
    price: 99.0,
    description: "A thick and creamy traditional yogurt drink blended with sweet Alphonanso mango pulp and garnished with saffron strands.",
    imageUrl: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&auto=format&fit=crop&q=80",
    rating: 4.6
  },
  {
    id: 16,
    name: "Refreshing Masala Chaach",
    category: "Drinks",
    price: 39.0,
    description: "A light, salted buttermilk spiced with roasted cumin powder, black salt, fresh coriander, and green chillies.",
    imageUrl: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=80",
    rating: 4.5
  },
  {
    id: 17,
    name: "Punjabi Sweet Lassi",
    category: "Drinks",
    price: 69.0,
    description: "Thick, rich, churned yogurt drink sweetened with sugar and flavored with green cardamom. Topped with a layer of fresh malai.",
    imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80",
    rating: 4.7
  },
  {
    id: 18,
    name: "Sparkling Fresh Lime Soda",
    category: "Drinks",
    price: 79.0,
    description: "Refreshing soda mixed with fresh lime juice, mint leaves, sugar, and black salt for a perfect sweet & salty twist.",
    imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80",
    rating: 4.4
  }
];

// Helper to determine if we are in mock mode
export const isMockMode = () => {
  return localStorage.getItem('wowfood_use_mock') === 'true';
};

// Toggle or force mock mode
export const setMockMode = (enable) => {
  localStorage.setItem('wowfood_use_mock', enable ? 'true' : 'false');
};

// Probe backend availability. If fails, it switches to mock fallback.
export const checkBackendStatus = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200); // Fast timeout probe

    const response = await fetch(`${API_BASE}/api/foods`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (response.ok) {
      setMockMode(false);
      return false; // Backend is online
    }
  } catch (e) {
    // Ignore error, switch to mock mode
  }
  setMockMode(true);
  return true; // Backend is offline, mock mode is active
};

// ----------------------------------------------------
// Local Storage Database Operations (Fallback Mode)
// ----------------------------------------------------

const getLocalUsers = () => JSON.parse(localStorage.getItem('wowfood_users_db') || '[]');
const saveLocalUsers = (users) => localStorage.setItem('wowfood_users_db', JSON.stringify(users));

const getLocalOrders = () => JSON.parse(localStorage.getItem('wowfood_orders_db') || '[]');
const saveLocalOrders = (orders) => localStorage.setItem('wowfood_orders_db', JSON.stringify(orders));

// Initialize default admin user in mock DB if empty
const initMockDB = () => {
  const users = getLocalUsers();
  if (users.length === 0) {
    users.push({
      name: "Admin User",
      email: "admin@wowfood.com",
      password: "admin"
    });
    saveLocalUsers(users);
  }
};
initMockDB();

// ----------------------------------------------------
// Public API Interfaces
// ----------------------------------------------------

export const getFoods = async () => {
  const offline = await checkBackendStatus();
  if (offline) {
    console.log('>> Running in Mock Mode: Fetching foods list.');
    return MOCK_FOODS;
  }
  const response = await fetch(`${API_BASE}/api/foods`);
  if (!response.ok) throw new Error('API server returned error');
  return response.json();
};

export const login = async (email, password) => {
  const offline = isMockMode();
  if (offline) {
    const users = getLocalUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      throw new Error('Invalid email or password');
    }
    // Simulate JWT token response
    return {
      token: `mock-jwt-token-for-${email}`,
      email: found.email,
      name: found.name
    };
  }

  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Login failed');
  return data;
};

export const signup = async (name, email, password) => {
  const offline = isMockMode();
  if (offline) {
    const users = getLocalUsers();
    if (users.some(u => u.email === email)) {
      throw new Error('Email address already registered');
    }
    const newUser = { name, email, password };
    users.push(newUser);
    saveLocalUsers(users);
    
    return {
      token: `mock-jwt-token-for-${email}`,
      email: newUser.email,
      name: newUser.name
    };
  }

  const response = await fetch(`${API_BASE}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Sign up failed');
  return data;
};

export const placeOrder = async (orderData, token) => {
  const offline = isMockMode();
  if (offline) {
    const orders = getLocalOrders();
    const nextId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
    
    // Decode user info from mock token
    const userEmail = token.replace('mock-jwt-token-for-', '');
    const users = getLocalUsers();
    const userObj = users.find(u => u.email === userEmail) || { name: "Guest User", email: userEmail };

    const orderItems = orderData.items.map((item, idx) => {
      const foodObj = MOCK_FOODS.find(f => f.id === item.foodItemId) || { name: "Unknown Item", price: 0 };
      return {
        id: Date.now() + idx,
        foodItem: foodObj,
        quantity: item.quantity,
        price: foodObj.price
      };
    });

    const totalBill = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const newOrder = {
      id: nextId,
      user: { name: userObj.name, email: userObj.email },
      address: orderData.address,
      phone: orderData.phone,
      totalAmount: totalBill,
      orderDate: new Date().toISOString(),
      status: 'PLACED',
      orderItems: orderItems
    };

    orders.push(newOrder);
    saveLocalOrders(orders);
    console.log('>> Mock DB: Placed new order:', newOrder);
    return newOrder;
  }

  const response = await fetch(`${API_BASE}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to place order.');
  return data;
};

export const getMyOrders = async (token) => {
  const offline = isMockMode();
  if (offline) {
    if (!token) return [];
    const userEmail = token.replace('mock-jwt-token-for-', '');
    const orders = getLocalOrders();
    // Return orders matching user email
    return orders.filter(o => o.user.email === userEmail);
  }

  const response = await fetch(`${API_BASE}/api/orders/my-orders`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error('Failed to fetch your orders.');
  return response.json();
};

export const getAllOrders = async () => {
  const offline = isMockMode();
  if (offline) {
    return getLocalOrders();
  }

  const response = await fetch(`${API_BASE}/api/orders/all`);
  if (!response.ok) throw new Error('Failed to fetch all orders.');
  return response.json();
};

export const updateOrderStatus = async (orderId, status) => {
  const offline = isMockMode();
  if (offline) {
    const orders = getLocalOrders();
    const index = orders.findIndex(o => o.id === Number(orderId));
    if (index !== -1) {
      orders[index].status = status;
      saveLocalOrders(orders);
      console.log(`>> Mock DB: Updated Order #${orderId} status to ${status}`);
      return orders[index];
    }
    throw new Error('Order not found');
  }

  const response = await fetch(`${API_BASE}/api/orders/${orderId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!response.ok) throw new Error('Failed to update status.');
  return response.json();
};
