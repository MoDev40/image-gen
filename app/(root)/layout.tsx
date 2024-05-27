"use client"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from "next/image"
import { TooltipProvider } from "@radix-ui/react-tooltip"
import { Input } from "@/components/ui/input"
import { navLinks } from "@/constants"
import { UserButton } from "@clerk/nextjs"
import UnAuth from '@/components/shared/UnAuth'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import React from 'react'
import { Button } from '@/components/ui/button'

function Layout({children}:{children:React.ReactNode}) {
  return (
    <div>
      <SignedOut>
        <UnAuth/>
      </SignedOut>
      <SignedIn>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Link
            href="/"
          >
            <Image src="/assets/images/logo-icon.svg" alt="logo" width={200} height={100}/>
          </Link>
          {
              navLinks.slice(0,6).map( nav =>(
                <Tooltip key={nav.route}>
                <TooltipTrigger asChild>
                  <Link
                    href={nav.route}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Image src={nav.icon} alt={nav.label} width={25} height={18}/>
                    <span className="sr-only">{nav.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{nav.label}</TooltipContent>
              </Tooltip>
            ))
          }
        </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
              {
                  navLinks.slice(6).map( nav =>(
                    <Tooltip key={nav.route}>
                    <TooltipTrigger asChild>
                      <Link
                        href={nav.route}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                      >
                        <Image src={nav.icon} alt={nav.label} width={25} height={18}/>
                        <span className="sr-only">{nav.label}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{nav.label}</TooltipContent>
                  </Tooltip>
                ))
              }
          </nav>
        </TooltipProvider>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <Image src='/assets/icons/menu.svg' alt="menu" width={25} height={18}/>
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
            <Link href="/" className="flex flex-row space-x-3 items-center" >
              <Image src="/assets/images/logo-icon.svg" alt="logo" width={30} height={20}/>
              <h3 className="text-indigo-600 text-xl font-black">ImageGen</h3>
            </Link>
              <ul className="flex flex-col space-y-5">
                {
                    navLinks.slice(0,6).map(nav =>(
                        <li key={nav.route}>
                        <Link
                        href="#"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                        <Image src={nav.icon} alt={nav.label} width={25} height={18}/>
                        <span>{nav.label}</span>
                        </Link>
                        </li>
                    ))
                }
                </ul>
              </nav>
              {
                Array.from({ length: 2 }).map((_,index )=>(
                <div key={index} className="mt-10 flex items-center justify-center gap-x-6">
                </div>
                ))
              }
              <nav className="grid gap-6 text-lg font-medium">
              <ul className="flex flex-col space-y-5">
                {
                    navLinks.slice(6).map(nav =>(
                        <li key={nav.route}>
                        <Link
                        href="#"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                        <Image src={nav.icon} alt={nav.label} width={25} height={18}/>
                        <span>{nav.label}</span>
                        </Link>
                        </li>
                    ))
                }
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Image src="/assets/icons/search.svg" alt="search" width={80} height={28} className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <UserButton afterSignOutUrl="/"/>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {children}
            </div>
          </div>
        </main>
      </div>
      </div>
      </SignedIn>
    </div>
  )
}

export default Layout