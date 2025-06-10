import { X } from "lucide-react";
import { useChatAction } from "../hooks/useChatAction";
import { socketStore } from "../store/socketStore";


const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatAction()
    const onlineUsers = socketStore((state) => state.onlineUsers)

    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img src={selectedUser?.profilePic || "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.X5naQoiwYnyTgyvrWoFNPgHaHa%26r%3D0%26pid%3DApi&f=1&ipt=480c1325d8dd600379b58b3105436cf76112113ae4a4bf650a3fa5956807b119&ipo=images"} alt={selectedUser?.fullName} />
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium">{selectedUser?.fullName}</h3>
                        <p className="text-sm text-base-content/70">
                            {onlineUsers?.includes(selectedUser?._id as string) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>

                {/* Close button */}
                <button onClick={() => setSelectedUser(null)}>
                    <X />
                </button>
            </div>
        </div>
    );
};
export default ChatHeader;