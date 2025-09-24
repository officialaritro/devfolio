'use client';

import Link from "next/link";

import { useChatbotHighlight } from "@/provider/chatbot-highlight";

function HighlightChatbot() {
  const { highlight } = useChatbotHighlight()

  return (
    <ul className="flex list-disc ml-4 flex-col gap-2">
      <li className='text-neutral-400 relative w-fit' onClick={() => highlight()}>
        <span className="text-white cursor-pointer hover-animation">View Live Project</span>
      </li>

      <li className='text-neutral-400 relative w-fit' onClick={() => highlight()}>
        <Link
          href="https://github.com/shiivamtaneja/Portfolio-Website/tree/design-v2"
          rel="noopener noreferrer"
          target="_blank"
          className="text-white relative overflow-hidden"
        >
          <span className="hover-animation">View source code</span>
        </Link>
      </li>
    </ul>
  )
}

export default HighlightChatbot