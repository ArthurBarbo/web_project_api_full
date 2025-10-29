# 🌍 Around — Rede Social de Compartilhamento de Imagens

Este é um projeto **Full-Stack** desenvolvido com **React (Frontend)** e **Node.js/Express (Backend)**.  
A aplicação funciona como uma **rede social de compartilhamento de imagens**, permitindo que usuários:

- Criem uma conta e façam login com validações e uso de **JWT**;
- Atualizem seus perfis e avatares;
- Adicionem, curtam e deletem cartões (posts com imagens e descrições);
- Interajam com outros usuários em tempo real através da API.

---

## 🚀 Demonstração

🖥 **Frontend (React)**: [https://www.around.developer.li]  
⚙️ **Backend (API Express)**: [https://api.around.mambodev.com]

🎥 **Vídeo de Demonstração**: [https://screenpal.com/content/video/cT6UYRnFimp]

---

## 📦 Tecnologias Utilizadas

### 🖼️ **Frontend**
- React.js (Vite)
- React Router DOM
- Context API
- Componentização modular (BEM + CSS puro)
- Validação de formulários customizada
- Fetch API para comunicação com o backend


### ⚙️ **Backend**
- Node.js + Express.js
- MongoDB + Mongoose (ODM)
- Middleware de autenticação com JWT
- Validação de dados com Joi/Celebrate
- CORS configurado para integração com o frontend
- Estrutura MVC (controllers, routes, models)
- Tratamento global de erros
- Logging (Winston)

### ☁️ **Infraestrutura e Deploy**
- **Servidor:** NGINX (reverse proxy para frontend e backend)
- **Gerenciamento de processos:** PM2
- **Banco de dados:** MongoDB 
- **Ambiente:** Ubuntu Server (ou VPS)
- **Domínio e HTTPS:** Certbot + Let's Encrypt

---

## 🗂️ Estrutura do Projeto

📁 web_project_api_full/
├── 📁 backend/
│ ├── app.js
│ ├── package.json
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ ├── middlewares/
│ └── utils/
│
├── 📁 frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── contexts/
│ │ ├── utils/
│ │ ├── App.jsx
│ │ └── index.jsx
│ ├── public/
│ └── package.json
│
└── README.md


## 🔗 Endpoints da API

### 👤 **Usuários**
| Método | Endpoint | Descrição |
|--------|-----------|------------|
| `POST` | `/signup` | Cadastra novo usuário |
| `POST` | `/signin` | Login e geração de token JWT |
| `GET` | `/users/me` | Retorna informações do usuário logado |
| `PATCH` | `/users/me` | Atualiza nome e descrição |
| `PATCH` | `/users/me/avatar` | Atualiza avatar do usuário |

### 🏞️ **Cards**
| Método | Endpoint | Descrição |
|--------|-----------|------------|
| `GET` | `/cards` | Retorna todos os cards |
| `POST` | `/cards` | Cria um novo card |
| `DELETE` | `/cards/:cardId` | Deleta um card (somente se for o dono) |
| `PUT` | `/cards/:cardId/likes` | Adiciona like |
| `DELETE` | `/cards/:cardId/likes` | Remove like |

---

## 🔐 Autenticação

A autenticação é feita via **JWT (JSON Web Token)**.  
Após o login bem-sucedido, o token é armazenado no **localStorage** e enviado automaticamente no **Authorization Header** de todas as requisições protegidas.

Exemplo de header:
```http
Authorization: Bearer <seu_token_aqui>
⚙️ Configuração e Execução
🧭 Pré-requisitos
Node.js 18+

MongoDB (local)

PM2 instalado globalmente

NGINX configurado no servidor


🧠 Conceitos aplicados
Programação assíncrona (async/await, Promises)

Arquitetura REST

Controle de acesso baseado em token

Componentização e hooks do React

Validação de formulários e mensagens de erro customizadas

Deploy profissional com PM2 e NGINX

🧑‍💻 Autor
Arthur Oliveira
🌐 https://www.around.developer.li
✉️ arthurbarbo177@gmail.com
💼 Linkedin: https://www.linkedin.com/in/arthur-barbosa-3519941ba/
 • Github [@ArthurBarbo]


💬 “Construído com dedicação e café ☕ — integrando frontend, backend e banco de dados em um só projeto.”

