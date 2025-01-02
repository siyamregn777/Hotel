
// src/components/ProtectedPageWrapper.tsx
'use client';

import { useUser } from '@/context/userContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedPageWrapperProps {
  children: React.ReactNode;
}

const ProtectedPageWrapper: React.FC<ProtectedPageWrapperProps> = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If the user is not authenticated, redirect to the login page
    if (!user.isAuthenticated) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user.isAuthenticated) {
    return null; // Return null while redirecting to avoid rendering the page content
  }

  return <>{children}</>; // Only render the protected content if the user is authenticated
};

export default ProtectedPageWrapper;