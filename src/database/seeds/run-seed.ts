// src/database/seeds/run-seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app/app.module';
import { QuestionsService } from 'src/questions/questions.service';
import { QUESTIONS_SEED } from './questions.seed';
import { RoleService } from '@/role/role.service';
import { ROLES_SEED } from './roles.seed';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const questionsService = app.get(QuestionsService);
  const rolesService = app.get(RoleService);

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

  console.log('🎉 Seed finalizado!');
  await app.close();
}

bootstrap().catch((error) => {
  console.error('Erro ao rodar seed:', error);
  process.exit(1);
});