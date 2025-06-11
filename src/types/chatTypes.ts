
export interface MessageType {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface QuickActionType {
  text: string;
  action: string;
  icon: string;
}

export type UserRole = 'customer' | 'internal';
