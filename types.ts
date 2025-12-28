
export interface Product {
  id: string;
  name: string;
  category: 'GPU' | 'CPU' | 'RAM' | 'Case' | 'Motherboard' | 'Storage' | 'PSU' | 'Prebuilt';
  price: number;
  image: string;
  description: string;
  specs: Record<string, string>;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface BuildAssistantMessage {
  role: 'user' | 'assistant';
  content: string;
}
