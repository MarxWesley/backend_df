# 📌 Backend - Sistema Díomicio Freitas (NestJS)

API construída com **NestJS** que fornece endpoints para gerenciamento de usuários, pessoas e avaliações.

Este projeto segue a arquitetura modular do NestJS e utiliza **TypeORM**, **PostgreSQL**, **JWT com Passport** e **Swagger** para documentação da API.

---

## 🧰 Tecnologias Utilizadas

✔ NestJS (Node.js framework para APIs) :contentReference[oaicite:1]{index=1}  
✔ TypeScript  
✔ PostgreSQL  
✔ TypeORM  
✔ JWT Authentication  
✔ Swagger (OpenAPI)  
✔ class-validator / class-transformer  

---

## 🚀 Funcionalidades Principais

✔ Cadastro de usuários com roles (perfil)  
✔ Autenticação com JWT  
✔ Cadastro de pessoas (*persons*)  
✔ Sistema de avaliações vinculado a usuários e pessoas  
✔ Documentação de API automática com Swagger  

---

## 📌 Pré‑Requisitos

Antes de rodar o projeto, você precisa:

1. Ter o **PostgreSQL** rodando  
2. Criar um banco de dados para a aplicação  
3. Criar as roles obrigatórias (ex: ADMIN)

---

## ⚙️ Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/MarxWesley/backend_df.git
cd backend_df
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz com as configurações do banco:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=seu_usuario
DATABASE_PASSWORD=sua_senha
DATABASE_NAME=nome_do_banco

JWT_SECRET=chave-secreta-super-segura
JWT_EXPIRES_IN=3600s
```

Ajuste de acordo com suas credenciais locais.

---

## 🧠 Como rodar

```bash
# modo de desenvolvimento
npm run start:dev

# build e produção
npm run build
npm run start:prod
```

---

## 📄 Documentação da API

Após iniciar o servidor, acesse o Swagger em:

```
http://localhost:3000/api
```

Essa documentação fornece todos os endpoints disponíveis, parâmetros, modelos e exemplos de requisição.

---

## 🔐 Fluxo Obrigatório de Criação

Para o sistema funcionar sem erros, siga essa sequência obrigatória:

### 1️⃣ Criar a Role ADMIN

Antes de criar usuários, insira no banco:

```sql
INSERT INTO role (id, name) VALUES (1, 'ADMIN');
```

Isso garante que exista uma role válida para user ADMIN.

### 2️⃣ Criar Usuário ADMIN

Utilize o endpoint `/users` para cadastrar usuário:

Exemplo:

```json
{
  "name": "Administrador",
  "email": "admin@email.com",
  "password": "12345678",
  "roleId": 1
}
```

Se o email já existir, o sistema retornará erro de conflito.

### 3️⃣ Criar Person

Depois de criado um usuário, cadastre uma *person* (pessoa) no sistema.

### 4️⃣ Criar Avaliação

Somente após ter usuário + person será possível criar avaliações vinculadas a ambos.

---

## 🔑 Autenticação JWT

Para acessar rotas protegidas, é necessário:

1. Fazer login com `/auth/login`
2. Recuperar o token JWT
3. Incluir o token no header:

```
Authorization: Bearer <TOKEN>
```

---

## 📚 Estrutura do Projeto

```bash
src/
 ├── app/                        # Módulo principal (AppModule, configs globais)
 │
 ├── auth/                       # Autenticação (JWT, Guards, strategies)
 │   ├── dto/
 │   ├── guards/
 │   ├── strategies/
 │   └── services/
 │
 ├── users/                      # CRUD de usuários
 │   ├── dto/
 │   └── entities/
 │
 ├── people/                     # Cadastro de pessoas
 │   ├── dto/
 │   └── entities/
 │
 ├── companies/                  # Empresas
 │   ├── dto/
 │   └── entities/
 │
 ├── people_company/             # Relação pessoa x empresa
 │   ├── dto/
 │   └── entities/
 │
 ├── role/                       # Perfis e permissões
 │   ├── dto/
 │   └── entities/
 │
 ├── questions/                  # Questões
 │   ├── dto/
 │   └── entities/
 │
 ├── reviews/                    # Avaliações / provas
 │   ├── dto/
 │   └── entities/
 │
 ├── review_answer/              # Respostas das avaliações
 │   ├── dto/
 │   └── entities/
 │
 ├── monitoring_sheets/          # Monitoramento / acompanhamento
 │   ├── dto/
 │   └── entities/
 │
 ├── config/                     # Configurações (env, database, etc)
 │
 └── main.ts                     # Entry point
```

---

## 💼 Scripts úteis

```bash
npm run start           # iniciar servidor
npm run start:dev       # watch mode com hot reload
npm run build           # compilar TS para JS
```

---

## 🚀 Deploy

Quando for colocar em produção:
✔ Configure variáveis de ambiente
✔ Gere build com `npm run build`
✔ Use PM2 ou similar para manter o app rodando

Consulte também as docs oficiais do NestJS para detalhes de deploy. ([Nest JS Docs](https://docs.nestjs.com/))

---

## 📌 Observações

✔ O projeto usa **Validação global** (ValidationPipe)
✔ Rotas não autorizadas retornam erro adequado
✔ Melhor prática: não exponha dados sensíveis nas respostas

---

## 🧑‍💻 Autor

MarxWesley
📍 Desenvolvedor Backend