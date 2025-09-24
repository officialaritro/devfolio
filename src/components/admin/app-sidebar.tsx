"use client"

import React from "react"

import { useSession } from "next-auth/react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, MessageSquare } from "lucide-react"

import NavUser from "./nav-user"

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboardIcon
  },
  {
    title: 'Chats',
    url: '/chat',
    icon: MessageSquare
  },
]

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { data: userData, status } = useSession()

  if (status === 'loading') {
    return null
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={cn(
                  pathname === item.url && 'bg-sidebar-accent'
                )}
              >
                <Link href={item.url}>
                  {<item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userData?.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar