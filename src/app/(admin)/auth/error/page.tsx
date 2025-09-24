'use client';

import React, { Suspense } from 'react';

import Link from 'next/link';
import { redirect, useSearchParams } from 'next/navigation';

import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const ErrorMessage = () => {
  const searchParams = useSearchParams();
  const errorMsg = searchParams.get('error');

  return (
    <section className='flex justify-center items-center w-full h-screen'>
      <div className='flex flex-col gap-2 items-center'>
        <h1 className='text-white text-xl'>{errorMsg}</h1>
        <Link href="/">
          <Button
            className='bg-zinc-800 border-none outline-none md:px-4 px-2 text-white hover:text-black'
            variant="outline"
          >
            Go to Home
          </Button>
        </Link>
      </div>
    </section>
  );
};

const AuthErrorPage = () => {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return null
  }

  if (session) {
    redirect('/dashboard')
  }

  return (
    <Suspense
      fallback={
        <section className='flex flex-col justify-center items-center h-screen w-full'>
          <Loader2 className='animate-spin text-white w-6 h-6' />
        </section>
      }
    >
      <ErrorMessage />
    </Suspense>
  )
}

export default AuthErrorPage