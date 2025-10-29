'use client';

import { isLogged } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    if (!isLogged()) router.replace('/login');
  }, [router]);
  return <>{children}</>;
}
