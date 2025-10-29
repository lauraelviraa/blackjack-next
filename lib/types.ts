export type LoginRequest = { username: string; password: string };
export type LoginResponse = { access_token: string };

export type DeckResponse = {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
};

export type Card = {
  code: string;
  image: string;
  images: { svg: string; png: string };
  value: string; // 'ACE' | '2' ... 'KING'
  suit: string;  // 'SPADES' | 'HEARTS' | ...
};

export type DrawResponse = {
  success: boolean;
  deck_id: string;
  cards: Card[];
  remaining: number;
};

export type GameStatus = 'Idle' | 'Jogando' | 'Blackjack' | 'Perdeu' | 'Dealer' | 'Empate' | 'Fim';
