import { useCallback } from 'react'
import type { Users, Messages } from '../store/chatStore'
import { chatStore } from '../store/chatStore'
import { useAxiosPrivate } from './useAxiosPrivate'
import toast from 'react-hot-toast'
import { socketStore } from '../store/socketStore'


interface UsersResponse {
    message: string,
    filteredUsers : Users[],
}

interface MessagesResponse {
    message: string,
    messages : Messages[],
}


const useChatAction = () => {
    const socket = socketStore((state) => state.socket)
    const messages = chatStore((state) => state.messages);
    const users = chatStore((state) => state.users);
    const selectedUser = chatStore((state) => state.selectedUser);
    const isUsersLoading = chatStore((state) => state.isUsersLoading);
    const isMessagesLoading = chatStore((state) => state.isMessagesLoading);

    const setUsers = chatStore((state) => state.setUsers);
    const setMessages = chatStore((state) => state.setMessages);
    const setIsUsersLoading = chatStore((state) => state.setIsUsersLoading);
    const addMessage = chatStore((state) => state.addMessage)
    const setIsMessagesLoading = chatStore(
        (state) => state.setIsMessagesLoading
    );
    const setSelectedUser = chatStore((state) => state.setSelectedUser);
    // const addMessage = chatStore((state) => state.addMessage);


    const axiosPrivate = useAxiosPrivate()

    const getUsers = useCallback(async () => {
        setIsUsersLoading(true)
        try {
            const res = await axiosPrivate.get<UsersResponse>("/messages/users")
            setUsers(res.data.filteredUsers)
            console.log(users)
        } catch (error) {
            toast.error("Failed to fetch users");
            console.log(error)
        } finally {
            setIsUsersLoading(false)
        }
    }, [])

    const getMessages = useCallback(async (userId: string) => {
        setIsMessagesLoading(true)
        try {
            const res = await axiosPrivate.get<MessagesResponse>(`/messages/${userId}`)
            setMessages(res.data.messages)
        } catch (error) {
            toast.error(
                "Failed to fetch messages"
            );
            console.log(error)
        } finally {
            setIsMessagesLoading(false)
        }
    }, [])


    const sendMessage = async (messageData : Messages) => {
        try {
          const res = await axiosPrivate.post<Messages>(
            `/messages/send/${selectedUser?._id}`,
            messageData
          );
          addMessage(res.data)
        } catch (error) {
            toast.error("Message couldnt be sent");
            console.log(error)
        }
    }


    const subscribeToMessages = () => {
        if (!selectedUser) return

        if (!socket) return

        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (!isMessageSentFromSelectedUser) return;
      
            addMessage(newMessage)
        });
    }

    const unsubscribeFromMessages = () => {
        if (!socket) return
        socket.off("newMessage");
    }


    return {
      getUsers,
      getMessages,
      messages,
      users,
      selectedUser,
      isUsersLoading,
        isMessagesLoading,
        setSelectedUser,
        subscribeToMessages,
        unsubscribeFromMessages,
      sendMessage
    };

}

export  {useChatAction}