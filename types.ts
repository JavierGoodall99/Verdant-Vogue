export interface Product {
  id: string;
  name: string;
  botanicalName: string;
  price: number;
  description: string;
  image: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Expert';
  light: 'Low' | 'Medium' | 'Bright';
  water: 'Weekly' | 'Bi-weekly' | 'Monthly';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
