
# QR Momentos – momentos anônimos via QR Code

Pequeno serviço em Node.js + Express + SQLite para coletar momentos anônimos
escaneando um QR Code.

## Como rodar

1. Instale o Node.js (versão 18 ou superior recomendada).
2. Dentro da pasta do projeto, rode:

   ```bash
   npm install
   npm start
   ```

3. Acesse no navegador:

   - Página do participante (formulário): `http://localhost:3000/participar`
   - Página de leitura/admin (lista de respostas): `http://localhost:3000/leitura`

Para colocar na internet, você pode subir esse projeto em algum serviço de hospedagem
Node (Railway, Render, Fly.io, etc.). Depois disso, gere um QR Code apontando para
a URL pública da página `/participar`.
