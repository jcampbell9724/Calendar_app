"use client"

import type React from "react"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, CheckSquare, Home, Menu, NotebookPen, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserProfile } from "@/components/user-profile"
import { cn } from "@/lib/utils"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()

  // Set dark mode by default
  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  const navItems = [
    { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    { href: "/goals", label: "Goals", icon: <CheckSquare className="h-5 w-5" /> },
    { href: "/notes", label: "Notes", icon: <NotebookPen className="h-5 w-5" /> },
    { href: "/calendar", label: "Calendar", icon: <Calendar className="h-5 w-5" /> },
    { href: "/settings", label: "Settings", icon: <Settings className="h-5 w-5" /> },
  ]

  return (
    <div className="dark min-h-screen bg-black text-white">
      <div className="flex min-h-screen">
        {/* Sidebar for desktop */}
        <aside className="hidden w-64 border-r border-white/10 bg-zinc-900 md:block">
          <div className="flex h-16 items-center border-b border-white/10 px-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-semibold">Taskflow</span>
            </Link>
          </div>
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto p-4">
            <div className="rounded-md bg-zinc-800 p-4 text-sm">
              <p className="text-zinc-400">Streamline your workflow with Taskflow</p>
            </div>
          </div>
        </aside>

        {/* Mobile sidebar */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed left-4 top-4 z-50 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 border-r border-white/10 bg-zinc-900 p-0">
            <div className="flex h-16 items-center border-b border-white/10 px-6">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-semibold">Taskflow</span>
              </Link>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white",
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto p-4">
              <div className="rounded-md bg-zinc-800 p-4 text-sm">
                <p className="text-zinc-400">Streamline your workflow with Taskflow</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-end border-b border-white/10 bg-black px-4 md:px-6">
            <UserProfile />
          </header>
          <div className="container mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">{children}</div>
        </main>
      </div>
    </div>
  )
}

