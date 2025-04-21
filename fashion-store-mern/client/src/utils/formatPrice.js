/**
 * Format price with Indian Rupee format and add comma separators for thousands
 * 
 * @param {number|string} price - The price to format
 * @returns {string} - The formatted price string
 */
export const formatPrice = (price) => {
  // Convert to number if it's a string
  const numPrice = typeof price === 'string' ? Number(price) : price;
  
  // Use toLocaleString with Indian locale and currency format
  return numPrice.toLocaleString('en-IN');
}; 