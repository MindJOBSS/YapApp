// store/chatStore.ts
import { create } from "zustand";


export interface Users {
    _id: string,
    email: string,
  fullName: string,
  profilePic : string,
    createdAt?: string,
    updatedAt?: string,
    __v? : number
}

export interface Messages {
  senderId?: string;
  receiverId?: string;
  text: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  _id ?: string
}

interface ChatState {
  messages: Messages[];
  users: Users[] | null;
  selectedUser: Users | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  setUsers: (users: Users[] | null) => void;
  setMessages: (messages: Messages[]) => void;
  setSelectedUser: (user: Users | null) => void;
  setIsUsersLoading: (loading: boolean) => void;
  setIsMessagesLoading: (loading: boolean) => void;
  addMessage: (message: Messages) => void;
}

export const chatStore = create<ChatState>((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  setUsers: (users) => set({ users }),
  setMessages: (messages) => set({ messages }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setIsUsersLoading: (loading) => set({ isUsersLoading: loading }),
  setIsMessagesLoading: (loading) => set({ isMessagesLoading: loading }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));
