// src/database/seeds/run-seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app/app.module';
import { QuestionsService } from 'src/questions/questions.service';
import { QUESTIONS_SEED } from './questions.seed';
import { RoleService } from '@/role/role.service';
import { ROLES_SEED } from './roles.seed';
import { UsersService } from 'src/users/users.service';
import { ADMIN_SEED } from './admin.seed';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const questionsService = app.get(QuestionsService);
  const rolesService = app.get(RoleService);
  const usersService = app.get(UsersService);

  console.log('🌱 Iniciando seed iniciais...');

  for (const questionData of QUESTIONS_SEED) {
    try {
      // Verifica se já existe
      const exists = await questionsService.findOne(questionData.id).catch(() => null);
      if (!exists) {
        await questionsService.create({
          question: questionData.texto,
        });
        console.log(`✅ Questão ${questionData.id} criada`);
      } else {
        console.log(`⏭️  Questão ${questionData.id} já existe`);
      }
    } catch (error) {
      console.error(`❌ Erro na questão ${questionData.id}:`, error);
    }
  }

  for (const roleData of ROLES_SEED) {
    try {
      // Verifica se já existe
      const exists = await rolesService.findOne(roleData.id).catch(() => null);
      if (!exists) {
        await rolesService.create({
          name: roleData.name,
        });
        console.log(`✅ Role ${roleData.name} criado`);
      } else {
        console.log(`⏭️  Role ${roleData.name} já existe`);
      }
    } catch (error) {
      console.error(`❌ Erro no role ${roleData.name}:`, error);
    }
  }

  try {
    // Verifica se usuário admin já existe
    const adminExists = await usersService.findByEmail(ADMIN_SEED.email).catch(() => null);
    if (!adminExists) {
      await usersService.create({
        name: ADMIN_SEED.name,
        email: ADMIN_SEED.email,
        password: ADMIN_SEED.password,
        roleId: ADMIN_SEED.roleId,
      });
      console.log(`✅ Usuário Admin criado com sucesso`);
      console.log(`📧 Email: ${ADMIN_SEED.email}`);
      console.log(`🔑 Senha: ${ADMIN_SEED.password}`);
      console.log(`⚠️  IMPORTANTE: Altere a senha na primeira execução!`);
    } else {
      console.log(`⏭️  Usuário Admin já existe`);
    }
  } catch (error) {
    console.error(`❌ Erro ao criar Admin:`, error);
  }

  console.log('🎉 Seed finalizado!');
  await app.close();
}

bootstrap().catch((error) => {
  console.error('Erro ao rodar seed:', error);
  process.exit(1);
});