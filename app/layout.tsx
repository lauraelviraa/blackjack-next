import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Simulador de Blackjack',
  description: 'Tente chegar o mais próximo de 21 sem ultrapassar!'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="wrapper">
          <h1>Simulador de Blackjack</h1>
          <p className="subtitle">Tente chegar o mais próximo de 21 sem ultrapassar!</p>
          {children}
          <p className="footer">Projeto desenvolvido por Laura Elvira — Simulador de Blackjack 🎲</p>
        </div>
      </body>
    </html>
  );
}
