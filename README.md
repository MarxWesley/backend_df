# 📌 Backend - Sistema Diômicio Freitas (NestJS)

API RESTful construída com **NestJS** para gerenciamento completo de um sistema de monitoramento e avaliação de pessoas em instituições educacionais e assistenciais.

O sistema permite o acompanhamento comportamental, desenvolvimento de habilidades e evolução acadêmica de alunos, com suporte a múltiplos usuários (administradores, professores, responsáveis) e análise detalhada através de formulários e avaliações estruturadas.

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

✔ **Autenticação & Autorização** - JWT com roles (ADMIN, PROFESSOR, ALUNO, RESPONSAVEL)  
✔ **Gerenciamento de Usuários** - Cadastro, atualização, permissões por role  
✔ **Cadastro de Pessoas** - Registro de alunos e monitores  
✔ **Empresas & Vínculo** - Cadastro de empresas e relação com pessoas  
✔ **Sistema de Questões** - 46 questões pré-configuradas para avaliação comportamental  
✔ **Avaliações (Reviews)** - Formulários estruturados para análise de desempenho  
✔ **Respostas de Avaliações** - Registro de respostas e pontuações  
✔ **Fichas de Monitoramento** - Acompanhamento contínuo de progressão  
✔ **Seeds Automáticas** - Criação automática de roles, questões e admin na primeira execução  
✔ **Documentação Swagger** - API documentada e interativa

---

## 📌 Pré‑Requisitos

Antes de rodar o projeto, você precisa:

1. **Node.js** (v18+) e **npm**
2. **PostgreSQL** (v12+) instalado e rodando
3. Conhecimento básico de terminal/PowerShell
4. Variáveis de ambiente configuradas (`.env`)

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
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=seu_usuario
POSTGRES_PASS=sua_senha
DB_NAME=seu_banco_dados

JWT_SECRET=sua-chave-secreta-super-segura
JWT_EXPIRES_IN=3600s
```

Ajuste de acordo com suas credenciais locais.

### 4. Executar as Seeds (Importante! ⚠️)

As seeds criam automaticamente:
- **Roles** do sistema (ADMIN, PROFESSOR, ALUNO, RESPONSAVEL)
- **Questões padrão** (46 perguntas de avaliação comportamental)
- **Usuário Admin** pré-configurado

Execute as seeds logo após instalar as dependências:

```bash
npm run seed
```

**Saída esperada:**
```
🌱 Iniciando seed iniciais...
✅ Questão 1 criada
✅ Questão 2 criada
...
✅ Role ADMIN criado
✅ Role PROFESSOR criado
✅ Role ALUNO criado
✅ Role RESPONSAVEL criado
✅ Usuário Admin criado com sucesso
📧 Email: admin@example.com
🔑 Senha: Admin@12345
⚠️  IMPORTANTE: Altere a senha na primeira execução!
🎉 Seed finalizado!
```

> **IMPORTANTE:** Após a primeira execução, altere a senha do admin através do endpoint `/auth/change-password` ou atualizar manualmente no banco de dados.

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

### Renovação de Token

Se o token expirar, use `/auth/refresh` para obter um novo sem fazer login novamente:

```bash
POST /auth/refresh
Authorization: Bearer <TOKEN_EXPIRADO>
```

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
│   ├── dto/                          # LoginDto, ChangePasswordDto
│   ├── guards/                       # JwtAuthGuard, RolesGuard
│   ├── strategies/                   # JwtStrategy (validação de token)
│   ├── entities/                     # AuthToken, PasswordToken
│   ├── auth.controller.ts            # Endpoints: /auth/login, /auth/refresh
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

## 💼 Scripts úteis

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

## 📌 Observações Importantes

✔ O projeto usa **Validação global** (ValidationPipe) em `main.ts`  
✔ Rotas não autorizadas retornam erro `401` ou `403`  
✔ Dados sensíveis (senhas) nunca são expostos nas respostas  
✔ TypeORM está configurado com `synchronize: true` (dev apenas!)  
✔ Emails devem ser únicos (constraint no banco)  
✔ Todas as seeds são **idempotentes** (seguro rodar múltiplas vezes)  
✔ JWT expirado retorna `401 Unauthorized` - renovar com `/auth/refresh`  
✔ Roles controlam acesso a endpoints específicos via `@Roles()` decorator  

### Troubleshooting

**Erro: "Roles not found"**
```bash
# Solução: executar seeds
npm run seed
```

**Erro: "Relation 'Role' not found"**
```bash
# Solução: aguardar TypeORM sincronizar (ou reiniciar servidor)
# TypeORM cria tabelas automaticamente com synchronize: true
```

**Erro: "Duplicate key value violates unique constraint 'Users_email_key'"**
```bash
# Solução: email já existe. Use outro ou delete do banco:
DELETE FROM "Users" WHERE email = 'admin@example.com';
```

**Conexão recusada ao banco**
```bash
# Verificar:
1. PostgreSQL está rodando? (pg_isready -h localhost)
2. Credenciais no .env estão corretas?
3. Banco existe? (CREATE DATABASE df_system;)
```

---

## 🧑‍💻 Autor

**MarxWesley**  
Desenvolvedor Backend | NestJS | TypeScript | PostgreSQL

📍 Repositório: [github.com/MarxWesley/backend_df](https://github.com/MarxWesley/backend_df)

---

## 📞 Contato & Suporte

Em caso de dúvidas ou problemas:
- Abra uma **issue** no repositório
- Consulte a [documentação oficial do NestJS](https://docs.nestjs.com/)
- Verifique os logs do servidor com `npm run start:dev`

---

**Última atualização:** 2026-05-25  
**Versão:** 1.0.0