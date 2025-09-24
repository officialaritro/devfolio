import { createContext, useCallback, useContext, useState } from "react";

type ChatbotHighlightContextType = {
  isHighlighted: boolean;
  highlight: () => void;
  disableHighlight: () => void;
};

const ChatbotHighlightContext = createContext<ChatbotHighlightContextType | null>(null);

const ChatbotHighlightProvider = ({ children }: { children: React.ReactNode }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const highlight = useCallback(() => {
    setIsHighlighted(true);
    setTimeout(() => setIsHighlighted(false), 2000); // 2s auto-reset
  }, []);

  const disableHighlight = useCallback(() => {
    setIsHighlighted(false);
  }, []);

  return (
    <ChatbotHighlightContext.Provider value={{ isHighlighted, highlight, disableHighlight }}>
      {children}
    </ChatbotHighlightContext.Provider>
  )
}

export default ChatbotHighlightProvider

export const useChatbotHighlight = () => {
  const context = useContext(ChatbotHighlightContext);

  if (!context)
    throw new Error("useChatbotHighlight must be used within ChatbotHighlightProvider");
  
  return context;
};