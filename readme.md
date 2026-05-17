# SPS Group – Users API

API RESTful de gerenciamento de usuários com autenticação JWT.

## Requisitos

- [Node.js](https://nodejs.org/) v18+
- [Yarn](https://yarnpkg.com/)

## Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd test-sps-server-main

# Instale as dependências
yarn install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
JWT_SECRET=sua_chave_secreta_aqui
```

> O projeto já inclui um `.env` de exemplo. Caso não exista, os valores padrão são `PORT=3000` e um secret de desenvolvimento.

## Executando

```bash
# Desenvolvimento
yarn dev

# Produção
yarn start
```

O servidor estará disponível em `http://localhost:3000`.

## Documentação (Swagger)

Acesse `http://localhost:3000/docs` para a interface interativa da API.

### Como autenticar no Swagger

1. Execute **POST /auth/login** com as credenciais abaixo
2. Copie o `token` retornado
3. Clique em **Authorize** 🔒 no topo da página
4. Insira o valor no formato: `Bearer <token>`

## Credenciais do administrador

```json
{
  "email": "admin@spsgroup.com.br",
  "password": "1234"
}
```

## Rotas

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/auth/login` | ❌ | Gera token JWT |
| GET | `/users` | ✅ | Lista usuários |
| POST | `/users` | ✅ | Cadastra usuário |
| PUT | `/users/:id` | ✅ | Edita usuário |
| DELETE | `/users/:id` | ✅ | Remove usuário |

## Dependências principais

| Pacote | Descrição |
|---|---|
| `express` | Framework HTTP |
| `jsonwebtoken` | Geração e verificação de JWT |
| `swagger-ui-express` | Interface visual da documentação |
| `swagger-jsdoc` | Geração da spec OpenAPI via comentários |
| `cors` | Liberação de CORS |
