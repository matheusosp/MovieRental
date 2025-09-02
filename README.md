# Sistema de Gerenciamento de Locadora de Filmes

Este projeto é uma aplicação web desenvolvida com React para gerenciar clientes e aluguéis de uma locadora de filmes. A aplicação conta com autenticação, rotas protegidas e operações de CRUD (Criar, Ler, Atualizar, Excluir) para clientes e aluguéis, utilizando o `LocalStorage` do navegador para persistência de dados e a API OMDb para busca de informações de filmes.

## Funcionalidades Principais

-   **Autenticação**:
    -   Tela de login (`/login`) com um perfil de administrador estático.
    -   Validação de formato de e-mail e comprimento mínimo de senha.
    -   Redirecionamento para a página de clientes após o login bem-sucedido.
    -   Funcionalidade de Logout para encerrar a sessão.

-   **Gerenciamento de Estado com Redux**:
    -   O estado de autenticação do usuário (se está logado ou não) é controlado globalmente pela biblioteca Redux.
    -   Componentes como `Header` e `PrivateRoute` reagem em tempo real às mudanças no estado de autenticação.

-   **Rotas Protegidas**:
    -   Apenas usuários autenticados podem acessar as páginas de gerenciamento (`/clientes`, `/alugueis`, etc.).
    -   Tentativas de acesso a rotas protegidas sem login redirecionam o usuário para a página de login.

-   **CRUD de Clientes**:
    -   Funcionalidades completas para listar, cadastrar, editar e excluir clientes.
    -   Os dados dos clientes são inicializados a partir de um JSON estático e depois persistidos no `LocalStorage`.
    -   Interface construída com componentes estilizados para formulários e tabelas.

-   **CRUD de Aluguéis**:
    -   Funcionalidades para listar, cadastrar, editar e excluir aluguéis.
    -   **Integração com a API OMDb**: Permite buscar filmes em tempo real pelo título para associá-los a um aluguel.
    -   Dropdown para selecionar um cliente (da lista do CRUD de Clientes) ao criar um novo aluguel.
    -   Os dados dos aluguéis são salvos e lidos do `LocalStorage`.

## Tecnologias Utilizadas

-   **React**: Biblioteca principal para a construção da interface de usuário.
-   **React Router (v5)**: Para gerenciamento de rotas e navegação na aplicação.
-   **Redux**: Para gerenciamento de estado global, principalmente o estado de autenticação.
-   **Redux Thunk**: Middleware para lidar com a lógica assíncrona nas actions do Redux.
-   **OMDb API**: API externa para busca de dados e pôsteres de filmes.
-   **LocalStorage**: Para persistência de dados no navegador.
-   **CSS**: Estilização customizada para os componentes, com um tema escuro.

---

## Pré-requisitos

Antes de começar, você precisará ter o seguinte instalado em sua máquina:
-   [Node.js](https://nodejs.org/) (versão 20.0.0 ou superior)
-   [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

## Instalação e Execução

Siga os passos abaixo para executar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/nome-do-repositorio.git](https://github.com/seu-usuario/nome-do-repositorio.git)
    cd nome-do-repositorio
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute a aplicação:**
    ```bash
    npm start
    ```
    A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

---

## Credenciais de Acesso (Admin)

Para acessar a área administrativa, utilize as seguintes credenciais estáticas:

-   **E-mail**: `userMaster@gmail.com`
-   **Senha**: `123456`

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start`

Executa a aplicação em modo de desenvolvimento.

### `npm test`

Inicia o executor de testes no modo interativo.

### `npm run build`

Compila a aplicação para produção na pasta `build`.
