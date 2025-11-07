export interface User {
  id: number;
  name: string;
}

export interface Message {
  id: number;
  content: string;
  senderId: number;
  createdAt: string;
  sender: User;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface CreateUserInput {
  name: string;
}

export interface CreateMessageInput {
  content: string;
  senderId: string;
}

// Context types
export interface UserContextType {
  selectedUserId: number | null;
  users: User[];
  setSelectedUserId: (id: number | null) => void;
  setUsers: (users: User[] | ((prev: User[]) => User[])) => void;
  refreshUser: () => Promise<void>;
}

export interface MessageContextType {
  messages: Message[];
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
  addMessage: (message: Message) => void;
}

export interface Toast {
  message: string;
  type: 'success' | 'error' | '';
}

export interface ToastContextType {
  toast: Toast;
  setToast: (toast: Toast) => void;
  clearToast: () => void;
}

// Component prop types
export interface ChatBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

export interface ToastProps {
  message: string;
  type: Toast['type'];
  onClose: () => void;
}

export interface ChatHeaderProps {
  className?: string;
}

export interface ChatFooterProps {
  className?: string;
}

// API response types
export interface HealthStatus {
  status: 'OK' | 'ERROR' | 'UNKNOWN';
  message: string;
  timestamp: string;
  error?: string;
}