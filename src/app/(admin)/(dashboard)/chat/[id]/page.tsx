'use client'

import React from 'react'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import { useQuery } from '@tanstack/react-query'

import { chatIdRegex } from '@/lib/constants/path-names'

import SiteHeader from '@/components/admin/header'
import { fetchMessages, MessageItem } from '@/components/chat-bot'
import { ArrowLeft, Loader } from 'lucide-react'

const ChatPage = () => {
  const { id: chatId } = useParams<{ id: string }>()

  const {
    data: chatDocument,
    isLoading,
    isFetching,
    error
  } = useQuery({
    queryKey: ['chat', chatId],
    queryFn: () => fetchMessages(chatId),
    enabled: chatIdRegex.test("/chat/" + chatId),
    retry: false,
    refetchOnWindowFocus: false
  });

  if (isLoading || isFetching) {
    return (
      <>
        <SiteHeader title='Chat - ' loading />

        <div className="flex flex-1 flex-col p-4">
          <Loader className='animate-spin' />
        </div>
      </>
    )
  }

  return (
    <>
      <SiteHeader title={`Chat - ${chatDocument?.chat.title ?? "No title"}`} />

      <div className="flex flex-1 flex-col p-4">
        <Link href="/chat" className='text-sm text-blue-500 flex gap-1 items-center'>
          <ArrowLeft className='w-4 h-4' />
          Go back
        </Link>

        <div className="space-y-4 py-4">
          {error ?
            <div className=''>
              <p>{error.message}</p>
            </div>
            :
            <>
              {chatDocument?.chat.conversation.map((message, i) => (
                <MessageItem key={i} message={message} />
              ))}
            </>
          }
        </div>
      </div>
    </>
  )
}

export default ChatPage