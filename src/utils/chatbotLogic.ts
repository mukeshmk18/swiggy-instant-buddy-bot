
import { UserRole } from '@/types/chatTypes';

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

  // Inventory queries
  if (lowerMessage.includes('stock') || lowerMessage.includes('available') || lowerMessage.includes('inventory')) {
    if (/\b[a-zA-Z0-9]{3,}\b/.test(message) && (lowerMessage.includes('sku') || lowerMessage.includes('product'))) {
      return "✅ Product Status:\n\n📦 In Stock: 45 units\n🏪 Warehouse: Central Delhi\n⚡ Instant Delivery: Available\n🕒 Estimated Delivery: 10-15 minutes\n\nWould you like to place an order?";
    }
    return "📋 Please provide the Product SKU or item name to check availability. Example: 'Check stock for SKU ABC123' or 'Is Maggi available?'";
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
