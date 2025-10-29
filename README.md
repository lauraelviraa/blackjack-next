# Simulador de Blackjack (Next.js + TypeScript)

Este projeto implementa o exercício solicitado: login via **Next Handler** (`/app/api/login/route.ts`) com `API_SECRET`, proteção de rota via `localStorage`, consumo da **Deck of Cards API** e regras básicas do Blackjack (Ás = 1 ou 11).

## Como rodar

```bash
# 1) Instale as dependências
npm install

# 2) Configure o .env
cp .env.example .env
# edite o API_SECRET conforme desejar

# 3) Dev
npm run dev
# acesse http://localhost:3000/login
```

## Fluxo
1. Faça login em **/login** usando qualquer e-mail e a senha igual a `API_SECRET` do `.env`.
2. Ao logar, o token simulado é salvo no `localStorage` e você é redirecionado para **/blackjack**.
3. Na página do jogo: **Pedir Carta (Hit)**, **Parar (Stand)**, dealer compra até 17 e o resultado é exibido.
4. **Logout** limpa `localStorage` e redireciona para `/login`.

## Onde estão as partes principais

- **Next Handler obrigatório**
  - `app/api/login/route.ts`
- **Proteção de rota**
  - `components/AuthGuard.tsx` (verifica token no `localStorage` e redireciona)
- **Sessão / token no localStorage**
  - `lib/auth.ts`
- **Integração com API externa**
  - `lib/deckApi.ts` (criar baralho e puxar cartas)
- **Tipagem estrita**
  - `lib/types.ts`
- **Lógica do jogo**
  - `app/blackjack/page.tsx` (pontuação com Ás valendo 1 ou 11, dealer >= 17)

> Observação: O único endpoint implementado como **Next Handler** é o de login, conforme exigido.
