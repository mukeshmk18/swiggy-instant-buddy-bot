
export interface Product {
  sku: string;
  name: string;
  price: number;
  stock: number;
}

export const products: Product[] = [
  { sku: 'SKU001', name: 'Maggi 2-Minute Noodles', price: 14, stock: 150 },
  { sku: 'SKU002', name: 'Coca Cola 500ml', price: 40, stock: 200 },
  { sku: 'SKU003', name: 'Lay\'s Classic Chips', price: 20, stock: 120 },
  { sku: 'SKU004', name: 'Amul Fresh Milk 1L', price: 62, stock: 80 },
  { sku: 'SKU005', name: 'Britannia Good Day Cookies', price: 30, stock: 90 },
  { sku: 'SKU006', name: 'Red Bull Energy Drink', price: 125, stock: 45 },
  { sku: 'SKU007', name: 'Parle-G Biscuits', price: 18, stock: 180 },
  { sku: 'SKU008', name: 'Himalaya Face Wash', price: 85, stock: 35 },
  { sku: 'SKU009', name: 'Dairy Milk Chocolate', price: 45, stock: 110 },
  { sku: 'SKU010', name: 'Kurkure Masala Munch', price: 25, stock: 95 }
];

export const getProductBySku = (sku: string): Product | undefined => {
  return products.find(product => product.sku.toLowerCase() === sku.toLowerCase());
};

export const getProductList = (): string => {
  return products.map((product, index) => 
    `${index + 1}. ${product.sku} - ${product.name} - ₹${product.price}`
  ).join('\n');
};
