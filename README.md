# Projeto de Autenticação Front-end

## Descrição

Este projeto é uma **interface de autenticação front-end** construída em **React**, incluindo telas de **Login**, **Registro** e gerenciamento básico de usuários.  
Ele permite que os usuários criem contas, façam login e acessem áreas protegidas da aplicação.  
O foco principal é a **validação de formulários e interação com uma API de autenticação**.

## Funcionalidades

- Tela de **Registro** com validação de email e senha (mínimo de caracteres).
- Tela de **Login** com autenticação de usuário.
- Feedback de erros para campos inválidos ou respostas da API.
- Proteção de rotas (páginas privadas apenas para usuários logados).
- Responsivo, adaptado para **desktop e mobile**.
- Uso de **Context API** para gerenciamento do usuário logado.

## Tecnologias Utilizadas

- **React** (componentes funcionais e Hooks: `useState`, `useEffect`, `useContext`)
- **React Router Dom** (navegação entre páginas)
- **CSS** para estilos responsivos
- **Context API** para gerenciamento de estado global (usuário)
- **Validação de formulários** com atributos HTML (`required`, `minLength`) e mensagens customizadas

## Como ver mais

Você pode acessar o projeto diretamente no meu GitHub:  
[Ver no GitHub](https://github.com/ArthurBarbo/web_project_around_auth)

Ou clonar o repositório e executar localmente:

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/projeto-autenticacao-frontend.git
```

2. entre na pasta do projeto:

```bash
 cd projeto-autenticacao-frontend
```

3. Instale as dependências:

```bash
 npm install
```

4. Execute o projeto:

```bash
 npm run dev
```
