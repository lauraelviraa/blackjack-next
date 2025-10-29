'use client';

import React from 'react';
import { clearSession, getUsername, isLogged } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const logged = isLogged();
  const username = getUsername();

  function handleLogout() {
    clearSession();
    router.push('/login');
  }

  return (
    <div className="header">
      <div>
        {logged ? <small>Logado como: <strong>{username}</strong></small> : <small>Não logado</small>}
      </div>
      {logged && <button className="btn gray" onClick={handleLogout}>Logout</button>}
    </div>
  );
}
