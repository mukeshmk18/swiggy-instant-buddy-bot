import { UserRole } from '@/types/chatTypes';
import { getProductBySku, getProductList, Product } from '@/data/products';

let selectedProducts: { product: Product; quantity: number }[] = [];

export const processMessage = (message: string, userRole: UserRole): string => {
  const lowerMessage = message.toLowerCase();

  // Order tracking
  if (lowerMessage.includes('track') || lowerMessage.includes('order')) {
    if (lowerMessage.includes('order') && /\b\d{6,}\b/.test(message)) {
      const orderId = message.match(/\b\d{6,}\b/)?.[0];
      return `🔍 Tracking Order #${orderId}:\n\n✅ Order Confirmed - 2:30 PM\n🍳 Being Prepared - 2:35 PM\n🛵 Out for Delivery - 2:45 PM\n📍 Estimated Arrival: 3:00 PM\n\nYour order is on the way! Delivery partner: Raj Kumar (★4.8)\nContact: +91 98765-43210`;
    }
    return "📦 To track your order, please provide your Order ID (6-8 digit number). You can find it in your order confirmation SMS or email.";
  }

  // Delivery status
  if (lowerMessage.includes('delivery status')) {
    return "🚚 Current Delivery Status:\n\n📦 Active Orders: 2\n🛵 Order #123456 - Out for delivery (ETA: 5 mins)\n🍳 Order #123457 - Being prepared (ETA: 15 mins)\n\n📍 Track live location in the Swiggy app\n📞 Contact delivery partner: +91 98765-43210";
  }

  // Payment status and history
  if (lowerMessage.includes('payment status') || lowerMessage.includes('payment history')) {
    if (lowerMessage.includes('history')) {
      return "📊 Payment History (Last 5 transactions):\n\n💳 12/06/2025 - ₹245 - Order #123456 - Success\n💳 11/06/2025 - ₹180 - Order #123455 - Success\n💳 10/06/2025 - ₹320 - Order #123454 - Success\n💳 09/06/2025 - ₹95 - Order #123453 - Success\n💳 08/06/2025 - ₹150 - Order #123452 - Success\n\n💰 Total spent this month: ₹990\n🎯 You've saved ₹125 with offers!";
    }
    return "💳 Payment Status:\n\n✅ Last Payment: ₹245 - Success\n🔄 Pending Refunds: None\n💰 Wallet Balance: ₹50\n💸 Active Offers: 3\n\n📱 Payment Methods:\n• UPI: *****@paytm (Primary)\n• Card: ****1234\n• Wallet: ₹50";
  }

  // Inventory queries with enhanced functionality
  if (lowerMessage.includes('stock') || lowerMessage.includes('available') || lowerMessage.includes('inventory') || lowerMessage.includes('check item')) {
    // Check if user wants to see the product list
    if (lowerMessage.includes('list') || lowerMessage.includes('show') || (!lowerMessage.includes('sku') && !(/\b[a-zA-Z0-9]{6}\b/.test(message)))) {
      return `📋 Available Products:\n\n${getProductList()}\n\n💡 To check stock for a specific item, type: "Check SKU001" or "Stock for SKU001"\n🛒 To add items to cart, type: "Add 2 SKU001" (quantity + SKU)`;
    }
    
    // Check if user is adding items with quantity
    const addMatch = message.match(/add\s+(\d+)\s+(sku\d+)/i);
    if (addMatch) {
      const quantity = parseInt(addMatch[1]);
      const sku = addMatch[2].toUpperCase();
      const product = getProductBySku(sku);
      
      if (product) {
        if (quantity <= product.stock) {
          const existingItem = selectedProducts.find(item => item.product.sku === sku);
          if (existingItem) {
            existingItem.quantity += quantity;
          } else {
            selectedProducts.push({ product, quantity });
          }
          
          const total = selectedProducts.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
          const itemsList = selectedProducts.map(item => 
            `${item.quantity}x ${item.product.name} - ₹${item.product.price * item.quantity}`
          ).join('\n');
          
          return `✅ Added ${quantity}x ${product.name} to cart!\n\n🛒 Cart Items:\n${itemsList}\n\n💰 Total: ₹${total}\n\n📦 Type "checkout" to proceed or add more items!`;
        } else {
          return `❌ Sorry! Only ${product.stock} units of ${product.name} available in stock.`;
        }
      } else {
        return `❌ Product with SKU ${sku} not found. Please check the product list.`;
      }
    }
    
    // Check specific SKU
    const skuMatch = message.match(/\b(sku\d+)\b/i);
    if (skuMatch) {
      const sku = skuMatch[1].toUpperCase();
      const product = getProductBySku(sku);
      
      if (product) {
        return `✅ Product Details:\n\n📦 ${product.name}\n💰 Price: ₹${product.price}\n📊 Stock: ${product.stock} units available\n⚡ Instant Delivery: Available\n🕒 Estimated Delivery: 10-15 minutes\n\n🛒 To add to cart, type: "Add 2 ${product.sku}" (quantity + SKU)`;
      } else {
        return `❌ Product with SKU ${sku} not found. Type "show products" to see available items.`;
      }
    }
    
    return `📋 Stock Check Options:\n\n1️⃣ Type "show products" - See all available items\n2️⃣ Type "Check SKU001" - Check specific item\n3️⃣ Type "Add 2 SKU001" - Add items to cart\n\nExample: "Check SKU001" or "Add 3 SKU002"`;
  }

  // Checkout functionality
  if (lowerMessage.includes('checkout') || lowerMessage.includes('total')) {
    if (selectedProducts.length === 0) {
      return "🛒 Your cart is empty! Add some items first by typing 'Add quantity SKU' (e.g., 'Add 2 SKU001')";
    }
    
    const total = selectedProducts.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const itemsList = selectedProducts.map(item => 
      `${item.quantity}x ${item.product.name} - ₹${item.product.price * item.quantity}`
    ).join('\n');
    
    // Clear cart after showing total
    selectedProducts = [];
    
    return `🧾 Order Summary:\n\n${itemsList}\n\n💰 Subtotal: ₹${total}\n🚚 Delivery: Free\n🎯 Discount: -₹${Math.floor(total * 0.1)}\n\n💳 Total: ₹${total - Math.floor(total * 0.1)}\n\n✅ Order placed successfully!\n📱 You'll receive confirmation shortly.`;
  }

  // Invoice support
  if (lowerMessage.includes('invoice') || lowerMessage.includes('bill') || lowerMessage.includes('receipt')) {
    return "🧾 Invoice Support:\n\n1️⃣ Enter your Order ID for invoice details\n2️⃣ Invoices are automatically sent to your registered email\n3️⃣ For reprint, provide order number\n\nExample: 'Invoice for order 1234567'\n\nNeed help finding your order ID?";
  }

  // Lead qualification for wholesalers
  if (lowerMessage.includes('wholesale') || lowerMessage.includes('bulk') || lowerMessage.includes('business')) {
    return "🤝 Wholesale Partnership:\n\nGreat! I'd love to help you with bulk orders. Please share:\n\n📋 Business Name:\n🏢 Business Type:\n📞 Contact Number:\n📧 Email Address:\n📦 Expected Monthly Volume:\n📍 Delivery Location:\n\nOur wholesale team will contact you within 24 hours!";
  }

  // Business hours
  if (lowerMessage.includes('hours') || lowerMessage.includes('time') || lowerMessage.includes('open')) {
    return "🕒 Swiggy Instant Delivery Hours:\n\n🌅 Monday - Sunday: 6:00 AM - 11:00 PM\n⚡ Peak Hours: 8-10 AM, 12-2 PM, 7-9 PM\n🎯 Average Delivery: 10-15 minutes\n\n📞 24/7 Support: 1800-123-SWIGGY\n💬 Chat Support: Available during delivery hours";
  }

  // Internal/Admin functions
  if (userRole === 'internal') {
    if (lowerMessage.includes('erp') || lowerMessage.includes('admin') || lowerMessage.includes('dashboard')) {
      return "👔 Internal Access Panel:\n\n🔧 ERP Functions:\n  • Order Management\n  • Inventory Control\n  • Delivery Analytics\n  • Partner Management\n\n📊 Reports Available:\n  • Daily Sales Summary\n  • Delivery Performance\n  • Customer Satisfaction\n  • Wholesale Leads\n\nSelect a function or ask for specific data.";
    }
    
    if (lowerMessage.includes('sales') || lowerMessage.includes('report')) {
      return "📊 Sales Dashboard (Today):\n\n💰 Revenue: ₹2,45,670\n📦 Orders: 1,247\n⚡ Avg Delivery: 12 minutes\n⭐ Rating: 4.6/5\n\n🔥 Top Categories:\n1. Groceries (35%)\n2. Snacks (28%)\n3. Beverages (22%)\n4. Personal Care (15%)";
    }
  }

  // Contact and support
  if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('help')) {
    return "📞 Contact Support:\n\n🏃‍♂️ Instant Chat: You're here!\n📱 Call: 1800-123-SWIGGY\n📧 Email: support@swiggy.com\n💬 WhatsApp: +91 98765-12345\n\n🕒 Support Hours: 24/7\n⚡ Average Response: < 2 minutes";
  }

  // Payment and refunds
  if (lowerMessage.includes('payment') || lowerMessage.includes('refund') || lowerMessage.includes('money')) {
    return "💳 Payment & Refunds:\n\n💰 Payment Methods:\n  • UPI (Recommended)\n  • Cards (All major)\n  • Cash on Delivery\n  • Wallets\n\n🔄 Refund Policy:\n  • Auto-refund for cancellations\n  • 3-5 business days\n  • Original payment method\n\nIssue with a payment? Share your order ID.";
  }

  // Default response
  const responses = [
    "I'm here to help with your Swiggy Instant Delivery queries! You can ask me about:\n\n📦 Order tracking\n📋 Item availability\n🧾 Invoice support\n🤝 Wholesale partnerships\n🕒 Business hours\n📞 Contact information\n\nWhat would you like to know?",
    "Thanks for reaching out! I can help you with orders, deliveries, invoices, and general support. What specific information do you need today?",
    "Hello! I'm SwiggyBot, your instant delivery assistant. I can help track orders, check stock, provide invoices, and answer questions about our services. How can I assist you?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};
