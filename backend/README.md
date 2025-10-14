# Projeto 15 - Mini API Express - Around Us

## 📖 Descrição

API completa usando Node.js, Express e MongoDB, permitindo gerenciar usuários e cards.  
Funcionalidades incluem criação, listagem, atualização, deleção e curtidas em cards, além de atualização de perfil e avatar de usuários.

## 🛠 Tecnologias

Node.js, Express, MongoDB + Mongoose, JavaScript (ES Modules), middleware para usuário logado (`req.user._id`), validação de campos obrigatórios e URLs, tratamento de erros 400 e 404, Nodemon para desenvolvimento.

## ✅ Funcionalidades

### Usuários

- `GET /users` → Lista todos os usuários
- `GET /users/:userId` → Retorna um usuário pelo `_id`
- `POST /users` → Cria um novo usuário com `{ "name": "Nome do usuário", "about": "Sobre o usuário", "avatar": "URL da imagem" }`
- `PATCH /users/me` → Atualiza perfil (`name`, `about`)  
  Exemplo: `{ "name": "Novo nome", "about": "Nova descrição" }`
- `PATCH /users/me/avatar` → Atualiza avatar (`avatar`)  
  Exemplo: `{ "avatar": "URL da nova imagem" }`

### Cards

- `GET /cards` → Lista todos os cards
- `GET /cards/:cardId` → Retorna um card pelo `_id`
- `POST /cards` → Cria um novo card (`name`, `link`) com `owner = req.user._id`  
  Exemplo: `{ "name": "Nome do card", "link": "URL da imagem" }`
- `DELETE /cards/:cardId` → Deleta um card pelo `_id`
- `PUT /cards/:cardId/likes` → Adiciona like do usuário logado
- `DELETE /cards/:cardId/likes` → Remove like do usuário logado

### Erros

- Rotas inexistentes retornam `{ "message": "A solicitação não foi encontrada" }`
- IDs inválidos ou não encontrados retornam mensagens apropriadas (`ID inválido` ou `Cartão/Usuário não encontrado`)

## ⚡ Como Rodar

1. Clone o repositório: `git clone <URL_DO_REPOSITORIO>`
2. Instale dependências: `npm install`
3. Inicie o servidor: `npm run start`

### Teste os endpoints no Postman ou navegador:

**Usuários**:  
`GET http://localhost:3000/users`  
`GET http://localhost:3000/users/:userId`  
`POST http://localhost:3000/users`  
`PATCH http://localhost:3000/users/me`  
`PATCH http://localhost:3000/users/me/avatar`

**Cards**:  
`GET http://localhost:3000/cards`  
`GET http://localhost:3000/cards/:cardId`  
`POST http://localhost:3000/cards`  
`DELETE http://localhost:3000/cards/:cardId`  
`PUT http://localhost:3000/cards/:cardId/likes`  
`DELETE http://localhost:3000/cards/:cardId/likes`
