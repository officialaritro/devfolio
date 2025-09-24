'use client';

import React from 'react';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import { format } from 'date-fns';

import { Chat } from '@/types/chats.types';

import SiteHeader from '@/components/admin/header';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye } from 'lucide-react';

const fetchChats = async () => {
  const response = await fetch('/api/chat')

  if (!response.ok)
    throw new Error('Error fetching chats')

  return response.json()
}

const ChatsPage = () => {
  const { data: chatsData, isLoading, isFetching } = useQuery<{ chats: Chat[] }>({
    queryKey: ['allChats'],
    queryFn: fetchChats,
    retry: false,
    refetchOnWindowFocus: false
  });

  return (
    <>
      <SiteHeader title="Chats" />

      <div className="flex flex-1 flex-col p-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(isLoading || isFetching) &&
                <TableRow>
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <TableCell className='w-96 space-y-2' key={idx}>
                      <Skeleton className="h-2" />
                      <Skeleton className="h-2" />
                      <Skeleton className="h-2" />
                    </TableCell>
                  ))}
                </TableRow>
              }

              {chatsData?.chats?.map((chat) => (
                <TableRow key={chat.chatId}>
                  <TableCell className='w-96'>{chat.title ?? "No Title"}</TableCell>

                  <TableCell className='w-96'>
                    {format(new Date(chat.createdAt), 'PPpp')}
                  </TableCell>

                  <TableCell className='w-96'>
                    <Link href={`/chat/${chat.chatId}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default ChatsPage