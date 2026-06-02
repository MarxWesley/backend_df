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
✔ Gerenciamento de empresas e associação com pessoas  
✔ Fichas de monitoramento contínuo  
✔ Sistema completo de roles e autorizações  

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

### Modo Desenvolvimento

```bash
# com watch mode (hot reload)
npm run start:dev
```

O servidor iniciará em `http://localhost:3000`

### Build e Produção

```bash
# compilar TypeScript para JavaScript
npm run build

# rodar a versão compilada
npm run start:prod
```

### Scripts Disponíveis

```bash
npm run start              # iniciar servidor uma vez
npm run start:dev          # watch mode com hot reload
npm run start:debug        # debug mode com inspector
npm run build              # compilar TS para JS
npm run seed               # executar seeds (roles, questões, admin)
npm run lint               # rodar ESLint
npm run format             # formatar código com Prettier
npm test                   # rodar testes unitários
npm run test:watch         # testes em watch mode
npm run test:cov           # testes com coverage
npm run test:e2e           # testes end-to-end
```

---

## 📄 Documentação da API

Após iniciar o servidor, acesse o Swagger em:

```
http://localhost:3000/api
```

A documentação é **interativa** e fornece:
- ✅ Todos os endpoints disponíveis
- ✅ Parâmetros obrigatórios e opcionais
- ✅ Exemplos de requisição e resposta
- ✅ Autenticação JWT integrada ("Authorize" button)
- ✅ Schemas de modelos (User, Person, Review, etc)

**Exemplo de uso no Swagger:**
1. Clique em "Authorize"
2. Cole o token JWT recebido do `/auth/login`
3. Todos os endpoints protegidos estarão desbloqueados

---

## 🔐 Fluxo de Inicialização do Projeto

Siga **exatamente** essa sequência para não encontrar erros:

### 1️⃣ Instalação e Configuração

```bash
git clone https://github.com/MarxWesley/backend_df.git
cd backend_df
npm install
```

### 2️⃣ Configurar Banco de Dados

Certifique-se de que PostgreSQL está rodando e crie um banco (ou use um existente).

Atualize o `.env` com suas credenciais:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASS=sua_senha
DB_NAME=df_system
```

### 3️⃣ Executar Seeds (OBRIGATÓRIO) ⚠️

```bash
npm run seed
```

Isso irá:
- ✅ Criar 4 roles (ADMIN, PROFESSOR, ALUNO, RESPONSAVEL)
- ✅ Inserir 46 questões padrão de avaliação
- ✅ Criar usuário admin pré-configurado

> Se algum elemento já existir, o seed pulará (idempotente).

### 4️⃣ Iniciar o Servidor

```bash
npm run start:dev
```

Acesse o Swagger em: **http://localhost:3000/api**

### 5️⃣ Autenticar

Use as credenciais do admin:
- **Email:** `admin@example.com`
- **Senha:** `Admin@12345`

Endpoint: `POST /auth/login`

---

## 📋 Detalhes das Seeds

### Roles Criadas

| ID | Nome | Descrição |
|---|---|---|
| 1 | ADMIN | Administrador do sistema |
| 2 | PROFESSOR | Educador / Instrutor |
| 3 | ALUNO | Estudante |
| 4 | RESPONSAVEL | Responsável/Tutor |

### Questões de Avaliação

46 questões comportamentais divididas em categorias:
- **Comportamento em grupo** (socialização, isolamento, conflitos)
- **Atenção & Concentração** (sonolência, distração, iniciativa)
- **Humor & Emoção** (oscilação, irritabilidade, ansiedade)
- **Autonomia & Higiene** (banho, escovação, limpeza, medicação)
- **Participação & Engajamento** (interesse, atividades, comunicação)
- **Família & Suporte** (interação, superproteção, incentivo)
- **Documentação** (documentos enviados/assinados)

### Usuário Admin Padrão

```json
{
  "name": "Administrador",
  "email": "admin@example.com",
  "password": "Admin@12345",
  "roleId": 1
}
```

> ⚠️ **Altere a senha imediatamente após primeira execução!**

---

## 🔑 Autenticação JWT

O sistema usa **JWT (JSON Web Tokens)** para autenticação stateless.

### Fluxo de Autenticação

1. **Login** - Envie credenciais para `/auth/login`
   ```bash
   POST /auth/login
   {
     "email": "admin@example.com",
     "password": "Admin@12345"
   }
   ```

2. **Receber Token** - API retorna o JWT
   ```json
   {
     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "user_id": 1,
     "role": "ADMIN"
   }
   ```

3. **Usar Token** - Inclua no header `Authorization`
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **Acessar Rotas Protegidas** - Token será validado automaticamente

### Segurança

- ✅ Senhas criptografadas com **bcrypt**
- ✅ Tokens assinados com **HS256**
- ✅ Expiração configurável (padrão: 3600s)
- ✅ Guard `@UseGuards(JwtAuthGuard)` em rotas protegidas
- ✅ Guard `@Roles('ADMIN')` para controle por role

---

## 📚 Estrutura do Projeto

A arquitetura segue o padrão modular do NestJS com separação clara de responsabilidades:

```
src/
├── app/
│   └── app.module.ts                 # Módulo raiz que importa todos os módulos
│
├── auth/                             # Autenticação & Autorização
│   ├── dto/                          # LoginDto, CreateAuthDto
│   ├── guards/                       # JwtAuthGuard, RolesGuard
│   ├── strategies/                   # JwtStrategy (validação de token)
│   ├── entities/                     # AuthToken, PasswordToken
│   ├── auth.controller.ts            # Endpoints: /auth/login, /auth/me
│   ├── auth.service.ts               # Lógica de autenticação e JWT
│   └── auth.module.ts
│
├── users/                            # Gerenciamento de Usuários
│   ├── dto/                          # CreateUserDto, UpdateUserDto
│   ├── entities/                     # User (relação com Role)
│   ├── users.controller.ts           # CRUD: GET, POST, PUT, DELETE /users
│   ├── users.service.ts              # Lógica de negócio
│   └── users.module.ts
│
├── role/                             # Sistema de Roles/Perfis
│   ├── dto/                          # CreateRoleDto
│   ├── entities/                     # Role (relação com User e Person)
│   ├── role.controller.ts            # CRUD de roles
│   ├── role.service.ts
│   └── role.module.ts
│
├── people/                           # Cadastro de Pessoas (Alunos)
│   ├── dto/                          # CreatePersonDto
│   ├── entities/                     # Person (relação com Role, Reviews)
│   ├── people.controller.ts
│   ├── people.service.ts
│   └── people.module.ts
│
├── companies/                        # Cadastro de Empresas
│   ├── dto/
│   ├── entities/                     # Company
│   ├── companies.controller.ts
│   ├── companies.service.ts
│   └── companies.module.ts
│
├── people_company/                   # Relação Pessoa x Empresa
│   ├── dto/                          # CreatePeopleCompanyDto
│   ├── entities/                     # PeopleCompany (chave estrangeira)
│   ├── people_company.controller.ts
│   ├── people_company.service.ts
│   └── people_company.module.ts
│
├── questions/                        # Questões de Avaliação
│   ├── dto/                          # CreateQuestionDto
│   ├── entities/                     # Question (46 questões padrão)
│   ├── questions.controller.ts
│   ├── questions.service.ts
│   └── questions.module.ts
│
├── reviews/                          # Avaliações/Formulários
│   ├── dto/                          # CreateReviewDto
│   ├── entities/                     # Review (relação com Person, ReviewAnswers)
│   ├── reviews.controller.ts
│   ├── reviews.service.ts
│   └── reviews.module.ts
│
├── review_answer/                    # Respostas das Avaliações
│   ├── dto/                          # CreateReviewAnswerDto
│   ├── entities/                     # ReviewAnswer (relação com Review e Question)
│   ├── review_answer.controller.ts
│   ├── review_answer.service.ts
│   └── review_answer.module.ts
│
├── monitoring_sheets/                # Fichas de Monitoramento
│   ├── dto/                          # CreateMonitoringSheetDto
│   ├── entities/                     # MonitoringSheet (acompanhamento contínuo)
│   ├── monitoring_sheets.controller.ts
│   ├── monitoring_sheets.service.ts
│   └── monitoring_sheets.module.ts
│
├── database/
│   └── seeds/
│       ├── run-seed.ts               # Executor principal das seeds
│       ├── roles.seed.ts             # Seed das 4 roles do sistema
│       ├── questions.seed.ts         # Seed das 46 questões
│       ├── admin.seed.ts             # Seed do usuário admin
│       └── [seedNames].seed.ts       # Padrão para novas seeds
│
├── config/                           # Configurações gerais
│   ├── typeorm.config.ts             # Configuração do TypeORM
│   └── jwt.config.ts                 # Configuração de JWT
│
└── main.ts                           # Entry point da aplicação
```

### Arquitetura de Dados (Relacionamentos)

```
User (1:N) ← Role ← (1:N) Person
  ↓
AuthToken (1:N)
  ↓
PasswordToken (1:N)

Person (1:N) ← Reviews (1:N) ← ReviewAnswers (N:1) → Questions

PeopleCompany ← Person (N:1)
                Company (1:N)

MonitoringSheet ← Person (1:N)
```

### Padrão de Cada Módulo

Cada módulo segue a estrutura:

```
[nome]/
├── [nome].controller.ts          # HTTP Routes
├── [nome].service.ts             # Business Logic
├── [nome].module.ts              # Module Configuration
├── dto/                          # Data Transfer Objects (validação)
│   ├── create-[nome].dto.ts
│   ├── update-[nome].dto.ts
│   └── [nome].dto.ts
└── entities/                     # TypeORM Entities (DB Schema)
    └── [nome].entity.ts
```

---

## � Documentação Completa dos Endpoints

Todos os endpoints estão disponíveis no **Swagger** em `http://localhost:3000/api` após iniciar o servidor.

### 🔐 Autenticação (Auth Module) `/auth`

| Método | Rota | Autenticado | Descrição |
|--------|------|-------------|----------|
| POST | `/auth/login` | ❌ | Realizar login e obter token JWT |
| GET | `/auth/me` | ✅ | Obter perfil do usuário logado |

**Exemplo POST `/auth/login`:**
```json
{
  "email": "admin@example.com",
  "password": "Admin@12345"
}
```

**Resposta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user_id": 1,
  "role": "ADMIN"
}
```

---

### 👥 Usuários (Users Module) `/users`

| Método | Rota | Autenticado | Descrição |
|--------|------|-------------|----------|
| POST | `/users` | ❌ | Criar novo usuário |
| GET | `/users` | ❌ | Listar todos os usuários |
| GET | `/users/:id` | ❌ | Obter usuário por ID |
| PATCH | `/users/:id` | ❌ | Atualizar usuário |
| DELETE | `/users/:id` | ❌ | Deletar usuário |

**Exemplo POST `/users`:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "Senha@12345",
  "roleId": 3
}
```

---

### 🎭 Roles (Role Module) `/role`

| Método | Rota | Requer | Descrição |
|--------|------|--------|----------|
| POST | `/role` | JWT + ADMIN | Criar nova role |
| GET | `/role` | JWT + ADMIN | Listar todas as roles |
| GET | `/role/:id` | JWT + ADMIN | Obter role por ID |
| PATCH | `/role/:id` | JWT + ADMIN | Atualizar role |
| DELETE | `/role/:id` | JWT + ADMIN | Deletar role |

**Exemplo POST `/role`:**
```json
{
  "name": "SUPERVISOR",
  "description": "Supervisor do sistema"
}
```

---

### 🏢 Empresas (Companies Module) `/companies`

| Método | Rota | Autenticado | Descrição |
|--------|------|-------------|----------|
| POST | `/companies` | ❌ | Criar empresa |
| GET | `/companies/search?search=...` | ❌ | Buscar por nome ou CNPJ |
| GET | `/companies` | ❌ | Listar todas |
| GET | `/companies/:id` | ❌ | Obter por ID |
| PATCH | `/companies/:id` | ❌ | Atualizar |
| DELETE | `/companies/:id` | ❌ | Deletar |

**Exemplo POST `/companies`:**
```json
{
  "name": "Empresa XYZ",
  "cnpj": "12.345.678/0001-90",
  "address": "Rua das Flores, 123",
  "city": "São Paulo"
}
```

**Exemplo GET `/companies/search?search=Nestle`:**
Busca por nome ou CNPJ.

---

### 👤 Pessoas (People Module) `/people`

| Método | Rota | Autenticado | Descrição |
|--------|------|-------------|----------|
| POST | `/people` | ❌ | Criar pessoa |
| GET | `/people/search?search=...` | ❌ | Buscar por CPF ou nome |
| GET | `/people/role/:roleName` | ❌ | Listar por role (ex: ALUNO) |
| GET | `/people` | ❌ | Listar todas |
| GET | `/people/:id` | ❌ | Obter por ID |
| PATCH | `/people/:id` | ❌ | Atualizar |
| PATCH | `/people/:id/status` | ❌ | Mudar status (ativo/inativo) |

**Exemplo POST `/people`:**
```json
{
  "name": "João da Silva",
  "cpf": "123.456.789-00",
  "birthDate": "2010-05-15",
  "roleId": 3
}
```

**Exemplo GET `/people/search?search=João`:**
Busca por nome ou CPF.

**Exemplo GET `/people/role/ALUNO`:**
Lista todas as pessoas com a role "ALUNO".

---

### ❓ Questões (Questions Module) `/questions`

| Método | Rota | Requer | Descrição |
|--------|------|--------|----------|
| POST | `/questions` | JWT + ADMIN/PROFESSOR | Criar questão |
| GET | `/questions` | JWT | Listar todas (46 questões padrão) |
| GET | `/questions/:id` | JWT | Obter por ID |
| PATCH | `/questions/:id` | JWT + ADMIN/PROFESSOR | Atualizar |
| DELETE | `/questions/:id` | JWT + ADMIN/PROFESSOR | Deletar |

**Exemplo POST `/questions`:**
```json
{
  "title": "Demonstra isolamento social",
  "description": "Quando a criança evita interagir com seus pares",
  "category": "Comportamento em grupo"
}
```

---

### ⭐ Avaliações (Reviews Module) `/reviews`

| Método | Rota | Autenticado | Descrição |
|--------|------|-------------|----------|
| POST | `/reviews` | ❌ | Criar avaliação |
| GET | `/reviews` | ❌ | Listar todas |
| GET | `/reviews/personName/:name` | ❌ | Buscar avaliações por nome da pessoa |
| GET | `/reviews/:id` | ❌ | Obter por ID |
| DELETE | `/reviews/:id` | ❌ | Deletar |

**Exemplo POST `/reviews`:**
```json
{
  "personId": 5,
  "evaluatorId": 2,
  "date": "2024-06-01",
  "answers": [
    { "questionId": 1, "score": 3, "notes": "Alguma dificuldade" }
  ]
}
```

---

### 📋 Fichas de Monitoramento (Monitoring Sheets Module) `/monitoring-sheets`

| Método | Rota | Autenticado | Descrição |
|--------|------|-------------|----------|
| POST | `/monitoring-sheets` | ❌ | Criar ficha de monitoramento |
| GET | `/monitoring-sheets` | ❌ | Listar todas |
| GET | `/monitoring-sheets/:id` | ❌ | Obter por ID |
| PATCH | `/monitoring-sheets/:id` | ❌ | Atualizar |
| DELETE | `/monitoring-sheets/:id` | ❌ | Deletar |

**Exemplo POST `/monitoring-sheets`:**
```json
{
  "personId": 5,
  "date": "2024-06-01",
  "observations": "Comportamento adequado observado",
  "status": "ACTIVE"
}
```

---

### 🔗 Associação Pessoa-Empresa (People Company Module) `/people-company`

| Método | Rota | Autenticado | Descrição |
|--------|------|-------------|----------|
| POST | `/people-company` | ❌ | Associar pessoa com empresa |
| GET | `/people-company` | ❌ | Listar todas as associações |
| GET | `/people-company/:id` | ❌ | Obter associação por ID |
| PATCH | `/people-company/:id` | ❌ | Atualizar associação |
| DELETE | `/people-company/:id` | ❌ | Remover associação |

**Exemplo POST `/people-company`:**
```json
{
  "personId": 5,
  "companyId": 2,
  "startDate": "2024-01-15",
  "position": "Estagiário",
  "status": "ACTIVE"
}
```

---

### 📊 Resumo de Autenticação

| Tipo | Significado | Como usar |
|------|-------------|----------|
| ❌ Sem autenticação | Endpoint público | Nenhum header necessário |
| ✅ JWT | Requer token JWT | Header: `Authorization: Bearer <token>` |
| + ADMIN | Requer role ADMIN | Token de usuário com roleId = 1 |
| + PROFESSOR | Requer role PROFESSOR | Token de usuário com roleId = 2 |
| + Roles (1,2) | Requer ADMIN OU PROFESSOR | Token de qualquer um dos dois |

---

## �💼 Scripts úteis

```bash
# Desenvolvimento
npm run start              # iniciar servidor uma vez
npm run start:dev          # watch mode (recomendado para dev)
npm run start:debug        # debug com inspector

# Build & Deploy
npm run build              # compilar TS → JS
npm run start:prod         # rodar versão otimizada

# Seeds & Dados
npm run seed               # rodar todas as seeds

# Testes
npm test                   # rodar testes unitários
npm run test:watch         # testes em watch mode
npm run test:cov           # testes com coverage
npm run test:e2e           # testes end-to-end

# Code Quality
npm run lint               # verificar ESLint
npm run format             # formatar com Prettier
```

---

## 🚀 Deploy

### Variáveis de Ambiente em Produção

```env
# Database
POSTGRES_HOST=your-db-host.com
POSTGRES_PORT=5432
POSTGRES_USER=prod_user
POSTGRES_PASS=strong_password
DB_NAME=df_prod

# JWT
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRES_IN=7200s

# Server
NODE_ENV=production
PORT=3000
```

### Checklist de Deploy

- ✅ Configure variáveis de ambiente com valores seguros
- ✅ Gere build: `npm run build`
- ✅ Teste a build localmente: `npm run start:prod`
- ✅ Use um process manager (PM2, systemd, Docker)
- ✅ Configure HTTPS/SSL
- ✅ Implemente rate limiting
- ✅ Configure backups automáticos do banco
- ✅ Monitore logs e performance

### Deploy com PM2

```bash
npm install -g pm2

# Build
npm run build

# Iniciar com PM2
pm2 start dist/main.js --name "backend-df"

# Salvar configuração
pm2 save

# Restart automático na reboot
pm2 startup
```

### Deploy com Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]
```

Para mais detalhes, consulte: [NestJS Docs - Deployment](https://docs.nestjs.com/deployment)

---

## 📌 Observações

✔ O projeto usa **Validação global** (ValidationPipe)
✔ Rotas não autorizadas retornam erro adequado
✔ Melhor prática: não exponha dados sensíveis nas respostas
✔ **Review Answers** são gerenciadas via o módulo de Reviews (sem endpoints públicos dedicados)
✔ Endpoints sem autenticação podem ser protegidos adicionando `@UseGuards(AuthGuard('jwt'))` nos controllers
✔ O endpoint `/auth/me` retorna os dados do usuário autenticado a partir do token JWT

---

## 🧑‍💻 Autor

MarxWesley
📍 Desenvolvedor Backend