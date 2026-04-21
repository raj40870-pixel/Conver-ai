import React from 'react';
import Topbar from './Topbar';
import { Toaster } from 'sonner';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function AppLayout({ children, className = '' }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      <Topbar />
      <main className={`pt-16 ${className}`}>
        {children}
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#18181b',
            border: '1px solid #3f3f46',
            color: '#fafafa',
            fontFamily: 'DM Sans, sans-serif',
          },
        }}
      />
    </div>
  );
}