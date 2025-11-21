"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Settings, Shield, Activity, Menu, ReceiptIcon, LayoutDashboard, LineChart, Home } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Overview' },
    { href: '/dashboard/reports', icon: LineChart, label: 'Reports' },
    { href: '/dashboard/team', icon: Users, label: 'Team' },
    { href: '/dashboard/general', icon: Settings, label: 'General' },
    { href: '/dashboard/activity', icon: Activity, label: 'Activity' },
    { href: '/dashboard/security', icon: Shield, label: 'Security' }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100dvh-42px)] mx-auto w-full">
      {/* Mobile header */}
      <div className="flex items-center justify-between px-2 pt-4 lg:hidden backdrop-blur-sm">
        <Button
          className="-mr-3"
          variant="ghost"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="w-5 h-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      <div className="flex flex-1 h-full overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`w-48 lg:bg-gradient-to-t lg:from-primary/10 lg:block ${
            isSidebarOpen ? 'block' : 'hidden'
          } lg:relative absolute inset-y-0 left-0 z-40 transform transition-transform duration-100 ease-in-out lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-2 pt-4 lg:hidden backdrop-blur-sm">
            <Button
              className="-mr-3"
              variant="ghost"
              onClick={ () => setIsSidebarOpen(!isSidebarOpen) }
            >
              <Menu className="w-5 h-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </div>
          <nav className="h-full p-4 overflow-y-auto bg-background lg:bg-transparent">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  variant={ pathname === item.href ? 'ghost' : 'ghost'}
                  className={`w-full justify-start hover:bg-background/50 ${
                    pathname === item.href ? 'bg-background/50 inset-shadow-xs' : ''
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-0 overflow-y-auto lg:p-4">{children}</main>
      </div>
    </div>
  );
}
