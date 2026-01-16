import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import Messages from "./components/Messages";
import MessageInput from "./components/MessageInput";
import StreakBanner from "./components/StreakBanner";

export default function ChatPage() {
  return (
    <div className="h-screen flex bg-blue-950 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader />

        {/* Messages + Input wrapper */}
        <div className="flex-1 flex flex-col min-h-0">
          <Messages />
          <MessageInput />
        </div>

        <StreakBanner />
      </div>
    </div>
  );
}
