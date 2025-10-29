import { NextRequest, NextResponse } from 'next/server';
import type { LoginRequest, LoginResponse } from '@/lib/types';

export async function POST(req: NextRequest) {
  const body = (await req.json()) as LoginRequest;
  const apiSecret = process.env.API_SECRET;

  if (!apiSecret) {
    return NextResponse.json({ error: 'API_SECRET não configurado' }, { status: 500 });
  }

  const isValid = body.password === apiSecret;

  if (!isValid) {
    return NextResponse.json({ error: 'Usuário ou senha inválidos' }, { status: 401 });
  }

  const resp: LoginResponse = { access_token: 'fake-' + Buffer.from(Date.now().toString()).toString('base64') };
  return NextResponse.json(resp);
}
