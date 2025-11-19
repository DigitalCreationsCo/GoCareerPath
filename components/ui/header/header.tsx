"use client"
import Link from 'next/link';
import { CircleIcon, Home, LogOut, Activity, Menu, ReceiptIcon, PlusCircleIcon } from 'lucide-react';
import { useState, Suspense } from 'react';
import { Button } from '@/components/ui/button/button';
import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar/avatar';
// import { signOut } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/types';
import useSWR, { mutate } from 'swr';
import { Logo } from '@/components/logo';
import { signOut } from 'next-auth/react';

// --- fetcher and UserMenu (unchanged) ---
const fetcher = (url: string) => fetch(url).then((res) => res.json());

function UserMenu({ session }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { data: user } = useSWR<User>('/api/user', fetcher);
  const router = useRouter();

  async function handleNewChat() {
    localStorage.removeItem("chatId");
    router.push('/chat'); 
  }

  async function handleSignOut() {
    await signOut();
    mutate('/api/user');
    router.push('/');
  }

  if (!session?.user) {
    return (
      <>
        {/* <Link
          href="/pricing"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Pricing
        </Link> */}
        <Button>
          <Link href="/sign-up" className='flex flex-row items-center'>
          AI-Proof Your Career Today</Link>
        </Button>
      </>
    );
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer size-9">
          <AvatarImage alt={session?.user.name || ''} />
          <AvatarFallback>
            {session?.user.name
              .split(' ')
              .map((n: any) => n[0])
              .join('')
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col bg-background">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/chat" className="flex items-center w-full">
            <span>Get My Career Path Report</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleNewChat} className="cursor-pointer">
          <div className="flex items-center w-full">
            <PlusCircleIcon className="w-4 h-4 mr-2" />
            <span>New Chat</span>
          </div>
        </DropdownMenuItem>
        {/* <DropdownMenuItem className="cursor-pointer">
          <Link href="/dashboard" className="flex items-center w-full">
            <Home className="w-4 h-4 mr-2" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem> */}
        <form action={handleSignOut} className="w-full">
          <button type="submit" className="flex w-full">
            <DropdownMenuItem className="flex-1 w-full cursor-pointer">
              <LogOut className="w-4 h-4 mr-2" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header({ session }: any) {
  return (
    <header className="hidden w-full transition-all duration-300 md:block">
      <div className="flex items-center justify-between px-3 pt-2 mx-auto">
        <Link href="/" className="flex items-center">
          <div className='hidden'>
            <Logo />
          </div>
          <span className="ml-2 text-lg font-semibold text-muted-foreground">GoCareerPath</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Suspense fallback={<div className="h-9" />}>
            <UserMenu session={session} />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
