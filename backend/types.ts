import { Request, Response, NextFunction } from 'express';

export interface User {
  id: number;
  name: string;
}

export interface Message {
  id: number;
  content: string;
  senderId: number;
  createdAt: string;
}

export interface MessageWithSender extends Message {
  sender: User;
}

export interface CreateUserInput {
  name: string;
}

export interface CreateMessageInput {
  content: string;
  senderId: number;
}

// Express handler types
export type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export type ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

// Storage service types
export interface StorageService {
  user: {
    getUsers: () => Promise<User[]>;
    createUser: (input: CreateUserInput) => Promise<User>;
  };
  message: {
    getMessages: () => Promise<MessageWithSender[]>;
    createMessage: (input: CreateMessageInput) => Promise<Message>;
  };
}