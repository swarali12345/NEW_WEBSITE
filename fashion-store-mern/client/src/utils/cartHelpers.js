/**
 * Cart helper functions to handle cart operations
 */

// Add item to cart
export const addItemToCart = (product, quantity = 1) => {
  // Get current cart from localStorage or initialize empty array
  const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];
  
  // Check if product is already in cart
  const existItem = cartItems.find(item => item.id === product.id);
  
  let updatedCart;
  
  if (existItem) {
    // Update quantity if already in cart
    updatedCart = cartItems.map(item => 
      item.id === product.id ? { ...item, qty: item.qty + quantity } : item
    );
  } else {
    // Add new item to cart with specified quantity
    updatedCart = [...cartItems, { ...product, qty: quantity }];
  }
  
  // Save updated cart to localStorage
  localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  
  // Dispatch a custom event so header component can update cart count
  const event = new CustomEvent('cartUpdated');
  window.dispatchEvent(event);
  
  return updatedCart;
};

// Remove item from cart
export const removeItemFromCart = (productId) => {
  const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];
  
  const updatedCart = cartItems.filter(item => item.id !== productId);
  
  localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  
  // Dispatch a custom event so header component can update cart count
  const event = new CustomEvent('cartUpdated');
  window.dispatchEvent(event);
  
  return updatedCart;
};

// Update item quantity in cart
export const updateCartItemQuantity = (productId, quantity) => {
  const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];
  
  const updatedCart = cartItems.map(item => 
    item.id === productId ? { ...item, qty: Number(quantity) } : item
  );
  
  localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  
  // Dispatch a custom event so header component can update cart count
  const event = new CustomEvent('cartUpdated');
  window.dispatchEvent(event);
  
  return updatedCart;
};

// Get cart items
export const getCartItems = () => {
  return localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];
};

// Get cart count
export const getCartCount = () => {
  const cartItems = getCartItems();
  return cartItems.reduce((acc, item) => acc + item.qty, 0);
};

// Get cart subtotal
export const getCartSubtotal = () => {
  const cartItems = getCartItems();
  return cartItems.reduce((acc, item) => acc + (item.qty * item.price), 0).toFixed(2);
};

// Clear cart
export const clearCart = () => {
  localStorage.removeItem('cartItems');
  
  // Dispatch a custom event so header component can update cart count
  const event = new CustomEvent('cartUpdated');
  window.dispatchEvent(event);
}; 