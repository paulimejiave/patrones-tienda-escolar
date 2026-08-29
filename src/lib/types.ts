export type Product = {
  id: string;
  name: string;
  emoji: string;
  price: number;
  stock: number;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

export type Customer = {
  name: string;
  email: string;
  address: string;
};

export type AddonId = "gift-wrap" | "express-shipping" | "shipping-insurance";

export type Order = {
  id: string;
  createdAt: string;
  items: CartItem[];
  customer: Customer;
  note?: string;
  scheduledDelivery?: string;
  addonIds: AddonId[];
  discountCode: string;
  paymentMethodType: string;
};
