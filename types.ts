export enum ConnectionStatus {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
  senderName?: string;
  senderId?: string;
  isGift?: boolean;
  giftName?: string;
}

export interface RoomSettings {
  name: string;
  isPublic: boolean;
  moderationLevel: 'chill' | 'strict' | 'bouncer';
  pkMode: boolean;
}

export type UserRole = 'admin' | 'moderator' | 'user';

export interface User {
  id: string;
  displayId: string;
  name: string;
  avatar: string;
  role: UserRole;
  isMuted: boolean;
  isBlocked: boolean;
  level: number;
  isVip: boolean;
  coins: number;
}

export interface MicSlot {
  index: number;
  user: User | null;
  isLocked: boolean;
}

export interface Gift {
  id: string;
  name: string;
  icon: string;
  cost: number;
  animationClass: string;
}

export interface GiftAnimation {
  id: string;
  gift: Gift;
  senderName: string;
}
