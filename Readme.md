# Enciclomotor

## Como usar

### 1. Crie o repositório no GitHub chamado `enciclomotor` e copie os arquivos para lá.

### 2. Configure o Vercel:
- Conecte sua conta GitHub no Vercel.
- Importe o projeto `enciclomotor`.
- Configure as variáveis de ambiente:
  - `CLIENT_ID` = sua credencial Gerencianet
  - `CLIENT_SECRET` = sua credencial Gerencianet
  - `PIX_KEY` = trampoja.oficial@gmail.com
  - `DATABASE_URL` = sqlite://./db.sqlite (ou outra, se quiser)
- Clique em **Deploy**.

### 3. Após deploy, acesse a URL pública gerada pelo Vercel.

### 4. Faça cadastro/login e teste o app.

---

## Tecnologias usadas

- Frontend: React + Tailwind CSS  
- Backend: Node.js + Express  
- Pagamento: Gerencianet PIX  
- Banco: SQLite (local para MVP)

---

## Estrutura de pastas

- `/frontend` — React app  
- `/backend` — API REST  
- `/backend/seed/motors.csv` — motores para seed  
- `/backend/scripts/csv_to_json.js` — converte CSV para JSON

---
