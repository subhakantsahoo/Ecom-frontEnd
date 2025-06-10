export type Product = {
  id: string | number;
  name: string;
  price: number;
  description?: string;
  stock: string;
  imageUrl?:string;
};

export type CartItem = {
  id: string | number;
  name: string;
  quantity: number;
  price: number;
};

export type OrderItem = {
  productId: string | number;
  productName: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string | number;
  date: string;
  total: number;
  items: OrderItem[];
};
