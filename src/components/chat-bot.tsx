'use client'

import React, { useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { cn } from '@/lib/utils';
import { differenceInMinutes, format, formatDistanceToNow } from 'date-fns';

import { useChatbotHighlight } from '@/provider/chatbot-highlight';

import { useChatBotActions, useChatBotId } from '@/store/chatbot-store';

import { ChatDocument, ConversationMessage } from '@/types/chats.types';

import { chatSchema, ChatSchemaT } from '@/schema/chat';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowDownRight, Bot, Ellipsis, Loader2, MessageCircle, Send, User, X } from 'lucide-react';

export async function fetchMessages(chatId: string): Promise<{ chat: ChatDocument }> {
  const response = await fetch(`/api/chat/${chatId}`);

  if (!response.ok) {
    let errMsg = 'Failed to fetch messages'

    if (response.status === 404) {
      errMsg += ': Chat not found'
    }

    throw new Error(errMsg);
  }

  return response.json();
}

async function sendMessage(chatId: string | null, content: string) {
  if (!chatId)
    return

  const response = await fetch(`/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: content, chatId }),
  });

  if (!response.ok)
    throw new Error('Failed to send message');

  return response.json();
}

async function initializeChat(): Promise<{ chatId: string }> {
  const response = await fetch(`/api/chat/initialize`, {
    method: 'GET',
  });

  if (!response.ok)
    throw new Error('Failed to initialize chat');

  return response.json();
}

export const MessageItem = ({ message }: { message: ConversationMessage }) => {
  const isRecent = differenceInMinutes(new Date(), new Date(message.createdAt)) < 60;

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        message.type === 'user' ? 'flex-row-reverse' : ''
      )}
    >
      <Avatar className={cn(
        "h-8 w-8 flex justify-center items-center",
        message.type === 'user' ? 'bg-primary' : 'bg-muted'
      )}>
        {message.type === 'user'
          ? <User className="h-4 w-4 text-primary-foreground" />
          : <Bot className="h-4 w-4 text-muted-foreground" />
        }
      </Avatar>

      <div className={cn(
        "flex flex-col gap-2",
        message.type === 'user' ? 'items-end' : ''
      )}>
        <div
          className={cn(
            "rounded-lg max-w-[80%] p-3 flex justify-center",
            message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
          )}
        >
          <p>{message.message}</p>
        </div>

        {message.createdAt && (
          <p className="text-xs text-gray-500 pl-1">
            {isRecent
              ? `${formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}`
              : format(new Date(message.createdAt), 'MMM d, yyyy h:mm a')}
          </p>
        )}
      </div>
    </div>
  )
};

const ChatBot = () => {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [open, setOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null);

  const chatId = useChatBotId()
  const { setChatId, resetChatId } = useChatBotActions()

  const { isHighlighted, disableHighlight } = useChatbotHighlight();

  const queryClient = useQueryClient()

  // Fetch chat history if chatId exists
  const {
    data: chatDocument,
    refetch: refetchChat,
    isLoading,
    error
  } = useQuery({
    queryKey: ['chat', chatId],
    queryFn: () => fetchMessages(chatId!),
    enabled: !!chatId,
    retry: false,
    refetchOnWindowFocus: false
  });

  // Populate messages on load
  useEffect(() => {
    if (chatDocument?.chat.conversation) {
      setMessages(chatDocument.chat.conversation);
    }
  }, [chatDocument]);

  const form = useForm<ChatSchemaT>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      chatId: chatId ?? "",
      message: ''
    },
    mode: 'all'
  });

  const { isPending, mutateAsync } = useMutation<{ chatId: string }, Error, string>({
    mutationFn: (message) => sendMessage(chatId, message),
    onSuccess: async () => {
      if (chatId && open) {
        // Always refetch the conversation
        await refetchChat();
      }
    },
    onError: (error) => {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        { message: 'Sorry, something went wrong. Please try again.', type: 'bot', createdAt: new Date().toString() },
      ]);
    }
  })

  const onSubmit = async (values: ChatSchemaT) => {
    const userMessage: ConversationMessage = {
      message: values.message,
      type: 'user',
      createdAt: new Date().toISOString(),
    };

    // Append user message immediately
    setMessages((prev) => [...prev, userMessage]);

    // Reset input
    form.reset();

    try {
      await mutateAsync(values.message);
    } catch (error) {
      console.error(error);
    }
  }

  // Scroll to bottom after any new message
  useEffect(() => {
    if (!open)
      return;

    const timeout = setTimeout(() => {
      const scrollContainer = scrollRef.current?.parentElement?.parentElement;

      scrollContainer?.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
    }, 100); // Give time for panel to open and content to render

    return () => clearTimeout(timeout);
  }, [messages, open])

  // Chat initialization
  const { mutate: initChat } = useMutation({
    mutationFn: () => initializeChat(),
    onSuccess: async (res) => {
      setChatId(res.chatId)

      queryClient.invalidateQueries({ queryKey: ['allChats'] })
      queryClient.invalidateQueries({ queryKey: ['chatBotUserCtn'] })
    },
    onError: (err) => {
      console.error("Failed to initialize chat", err)
    }
  });

  useEffect(() => {
    if (open && !chatId)
      initChat()
  }, [open, chatId, initChat])

  useEffect(() => {
    if (chatId)
      form.reset({ chatId, message: '' })
  }, [chatId, form])

  useEffect(() => {
    if (isHighlighted && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [isHighlighted])

  return (
    <Popover open={open} onOpenChange={(value) => {
      setOpen(value)

      if (value) // turn off highlight once opened
        disableHighlight()
    }}>
      <PopoverTrigger asChild>
        <div className='fixed bottom-4 right-4'>
          {isHighlighted &&
            <ArrowDownRight size={40} className="animate-bounce absolute -left-6 -top-8 text-green-400" />
          }
          <Button
            ref={buttonRef}
            className={cn(
              "border border-white h-12 w-12 rounded-full p-0 hover:bg-black",
              isHighlighted && "ring-4 ring-green-400"
            )}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      </PopoverTrigger>

      <PopoverContent className='mx-4 mb-2 text-sm min-w-96 max-w-96 w-full p-0'>
        <div className="flex items-center justify-between border-b p-4">
          {chatDocument?.chat?.title ?
            <div className='flex gap-1 items-center'>
              <h3 className="font-semibold">{chatDocument?.chat?.title}</h3>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Ellipsis size={15} className='cursor-pointer' />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className='cursor-pointer' onClick={() => resetChatId()}>Reset Chat</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            :
            <h3>Chat Assistant</h3>
          }
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-[400px] p-4">
          <div className="space-y-4" ref={scrollRef}>
            {error ?
              <div className=''>
                <p>{error.message}</p>
                <p>Click <span className='underline cursor-pointer' onClick={() => resetChatId()}>here</span> to reset</p>
              </div>
              :
              <>
                {messages.map((message, i) => (
                  <MessageItem key={i} message={message} />
                ))}

                {isLoading || isPending &&
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 flex justify-center items-center bg-muted">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                    </Avatar>

                    <div className="rounded-lg px-3 py-2 max-w-[80%] bg-muted">
                      <Loader2 className="animate-spin" />
                    </div>
                  </div>
                }
              </>
            }
          </div>
        </ScrollArea>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 border-t flex w-full gap-2">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} placeholder="Type your message..." className="w-full" />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" size='icon' disabled={isPending} className="cursor-pointer">
              {isPending ?
                <Loader2 className="animate-spin" />
                :
                <Send className="h-4 w-4" />
              }
            </Button>
          </form>
        </Form>

        <div className='flex justify-center pb-3'>
          <p className='text-center text-xs'>Note: Responses aren&apos;t always accurate or complete.</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ChatBot