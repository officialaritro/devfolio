'use client';

import React from 'react';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import { useChatbotHighlight } from '@/provider/chatbot-highlight';

import { ExternalLink, Info } from 'lucide-react';
// import { GoDotFill } from 'react-icons/go';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const ChatBotProject = () => {
  const { highlight } = useChatbotHighlight();

  const { data, error } = useQuery<{ count: number }>({
    queryKey: ['chatBotUserCtn'],
    queryFn: async () => {
      const response = await fetch('/api/chat/count')

      if (!response.ok)
        throw new Error('Error fetching user count')

      return response.json()
    },
    retry: false,
    refetchOnWindowFocus: false
  })

  return (
    <li className='text-neutral-500 flex w-full gap-4 items-start justify-between'>
      <div className='flex flex-col gap-2 flex-1'>
        <div className='flex gap-2 items-center flex-wrap'>
          <p className='text-white'>
            2.
          </p>
          <div className="flex items-center gap-2">
            <div
              className='text-white underline capitalize hover:text-neutral-300 transition-colors cursor-pointer'
              onClick={() => highlight()}
            >
              <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                  <div>
                    Chatbot
                    <ExternalLink className="inline-block ml-1 w-3 h-3" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className='p-2 bg-gray-500 text-white rounded'>View project</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <Link
              href={'/project/chat-bot'}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className='p-2 bg-gray-500 text-white rounded'>View project details</p>
                </TooltipContent>
              </Tooltip>
            </Link>
          </div>
        </div>
        <p className='text-neutral-400 break-words ml-4'>
          a site-embedded AI assistant trained on my portfolio content.
        </p>
      </div>

      {!error && data &&
        <div className='flex gap-2 items-center shrink-0'>
          <p>{data.count} users</p>

          {/* <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>
              <GoDotFill size={15} className='hover:scale-110 scale-100 transition duration-75 ease-in-out text-green-500' />
            </TooltipTrigger>
            <TooltipContent>
              <p className='p-2 bg-gray-500 text-white rounded'>Actively working on it</p>
            </TooltipContent>
          </Tooltip> */}
        </div>
      }
    </li>
  )
}

export default ChatBotProject