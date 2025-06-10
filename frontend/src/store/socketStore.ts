import { create } from "zustand"
import { authStore } from "./authStore"
import { io, Socket } from "socket.io-client"


const base_Url = "http://localhost:3500/"

interface SocketStore {
    socket: Socket | null;
    onlineUsers: string[] | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
}


export const socketStore = create<SocketStore>((set, get) => ({
    socket: null,
    onlineUsers : null,
    
    connectSocket: () => {
        const user = authStore.getState().user
        if (!user || get()?.socket?.connected) return
        const socket = io(base_Url, {
            query: {
                userId : user.id
            }
        })
        socket.connect()
        set({ socket: socket })
        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers : userIds})
        })
        
    },
    disconnectSocket: () => {
        if (get().socket?.connected) {
            get().socket?.disconnect();
            set({ socket: null });
        }

    }
}))