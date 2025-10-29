'use client';

import React, { useEffect, useMemo, useState } from 'react';
import AuthGuard from '@/components/AuthGuard';
import Header from '@/components/Header';
import { createDeck, draw } from '@/lib/deckApi';
import type { Card, GameStatus } from '@/lib/types';

function cardValue(value: string): number {
  if (['KING', 'QUEEN', 'JACK'].includes(value)) return 10;
  if (value === 'ACE') return 11; // will adjust later if bust
  return parseInt(value, 10);
}

function calcScore(cards: Card[]): number {
  let sum = cards.reduce((acc, c) => acc + cardValue(c.value), 0);
  let aces = cards.filter((c) => c.value === 'ACE').length;
  // Turn ACE 11 -> 1 while busting
  while (sum > 21 && aces > 0) {
    sum -= 10;
    aces -= 1;
  }
  return sum;
}

export default function BlackjackPage() {
  const [deckId, setDeckId] = useState<string | null>(null);
  const [player, setPlayer] = useState<Card[]>([]);
  const [dealer, setDealer] = useState<Card[]>([]);
  const [status, setStatus] = useState<GameStatus>('Idle');
  const [message, setMessage] = useState<string>('');

  const playerScore = useMemo(()=>calcScore(player), [player]);
  const dealerScore = useMemo(()=>calcScore(dealer), [dealer]);

  async function startGame() {
    setMessage('');
    setPlayer([]); setDealer([]);
    setStatus('Jogando');
    const deck = await createDeck();
    setDeckId(deck.deck_id);
    const first = await draw(deck.deck_id, 4);
    const [p1,p2,d1,d2] = first.cards;
    setPlayer([p1,p2]);
    setDealer([d1]); // esconde segunda carta para simular mesa simples
    // guarda a carta do dealer para depois
    setTimeout(()=>{
      setDealer([d1,d2]);
    }, 200);
  }

  async function hit() {
    if (!deckId) return;
    const more = await draw(deckId, 1);
    const next = [...player, ...more.cards];
    setPlayer(next);
    const score = calcScore(next);
    if (score === 21) { setStatus('Blackjack'); setMessage('BLACKJACK! Você cravou 21.'); }
    if (score > 21) { setStatus('Perdeu'); setMessage('Estourou 21!'); }
  }

  async function stand() {
    if (!deckId) return;
    setStatus('Dealer');
    // Dealer compra até 17
    let cur = [...dealer];
    while (calcScore(cur) < 17) {
      const more = await draw(deckId, 1);
      cur = [...cur, ...more.cards];
      setDealer(cur);
    }
    // Decide vencedor
    const ps = calcScore(player);
    const ds = calcScore(cur);
    if (ds > 21 || ps > ds) { setStatus('Fim'); setMessage('Você venceu!'); }
    else if (ps < ds) { setStatus('Fim'); setMessage('Dealer venceu.'); }
    else { setStatus('Empate'); setMessage('Empate.'); }
  }

  function reset() {
    setDeckId(null); setPlayer([]); setDealer([]);
    setStatus('Idle'); setMessage('');
  }

  useEffect(() => { startGame(); }, []);

  return (
    <AuthGuard>
      <Header />
      <div className="cardgrid">
        <div className="panel">
          <h3>Jogador</h3>
          <div className="stack">
            {player.map((c) => <img key={c.code} src={c.image} className="cardimg" alt={c.code} />)}
          </div>
          <div className="meta">Pontuação: {playerScore}</div>
        </div>
        <div className="panel">
          <h3>Dealer</h3>
          <div className="stack">
            {dealer.map((c) => <img key={c.code} src={c.image} className="cardimg" alt={c.code} />)}
          </div>
          <div className="meta">Pontuação: {dealerScore}</div>
        </div>
      </div>

      <div className="actions">
        {(status === 'Jogando') && (
          <>
            <button onClick={hit} className="btn primary">Pedir Carta</button>
            <button onClick={stand} className="btn danger">Parar</button>
          </>
        )}
        {(status !== 'Jogando') && <button className="btn gray" onClick={startGame}>Reiniciar Jogo</button>}
      </div>
      {message && <p style={{textAlign:'center', marginTop:10}}>{message}</p>}
    </AuthGuard>
  );
}
