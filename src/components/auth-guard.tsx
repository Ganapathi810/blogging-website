'use client'; 

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen w-screen bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    <p className="ml-4 text-lg text-gray-700">Loading session...</p>
  </div>
);

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {

  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (status === 'unauthenticated' && pathname !== '/api/auth/signin') {
      router.push('/api/auth/signin');
    }
  }, [status, router, pathname]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'authenticated') {
    return <>{children}</>;
  }

  return null;
}