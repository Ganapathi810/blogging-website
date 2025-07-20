'use client'; // This is a client component

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

// You might want a simple loading spinner component.
// If you don't have one, you can use a basic div or create a dedicated component.
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
    // If the session is still loading, do nothing.
    // This is crucial to prevent premature redirects.
    if (status === 'loading') {
      return;
    }

    // If the session is unauthenticated, redirect to the sign-in page.
    // Ensure you're not already on the sign-in page to prevent a client-side loop.
    if (status === 'unauthenticated' && pathname !== '/api/auth/signin') {
      console.log("AuthGuard: User is unauthenticated, redirecting to sign-in.");
      router.push('/api/auth/signin');
    }
  }, [status, router, pathname]); // Re-run effect when status, router, or pathname changes

  // While loading, show a loading indicator.
  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  // If authenticated, render the children (your protected content).
  if (status === 'authenticated') {
    return <>{children}</>;
  }

  // If unauthenticated and not currently redirecting, return null or a simple message.
  // This state should be brief as the redirect will happen quickly.
  return null;
}