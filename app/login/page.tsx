'use client';

import React, { useState } from 'react';
import { saveSession } from '@/lib/auth';
import type { LoginRequest, LoginResponse } from '@/lib/types';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginRequest>({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify(form) });
      if (!res.ok) throw new Error('Credenciais inválidas');
      const data = (await res.json()) as LoginResponse;
      saveSession(data.access_token, form.username);
      router.push('/blackjack');
    } catch (err:any) {
      setError(err.message || 'Erro no login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <form className="form" onSubmit={onSubmit}>
        <label>Nome de Usuário</label>
        <input
          className="input"
          type="email"
          placeholder="email@teste.com"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <label>Senha</label>
        <input
          className="input"
          type="password"
          placeholder="••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="btn primary" disabled={loading} type="submit">
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        {error && <small style={{color:'#fca5a5'}}>{error}</small>}
      </form>
    </>
  );
}
