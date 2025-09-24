'use client'

import React from 'react'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

import AppSidebar from '@/components/admin/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return null
  }

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default SidebarLayout