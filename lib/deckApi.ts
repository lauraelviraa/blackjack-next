import type { DeckResponse, DrawResponse } from './types';

const BASE = 'https://deckofcardsapi.com/api/deck';

export async function createDeck(): Promise<DeckResponse> {
  const res = await fetch(`${BASE}/new/shuffle`);
  if (!res.ok) throw new Error('Não foi possível criar o baralho');
  return res.json();
}

export async function draw(deckId: string, count = 1): Promise<DrawResponse> {
  const res = await fetch(`${BASE}/${deckId}/draw/?count=${count}`);
  if (!res.ok) throw new Error('Falha ao puxar carta(s)');
  return res.json();
}
