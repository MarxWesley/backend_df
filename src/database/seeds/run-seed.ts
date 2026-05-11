// src/database/seeds/run-seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app/app.module';
import { QuestionsService } from 'src/questions/questions.service';
import { QUESTIONS_SEED } from './questions.seed';
 
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const questionsService = app.get(QuestionsService);
 
  console.log('🌱 Iniciando seed de questões...');
 
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
 
  console.log('🎉 Seed finalizado!');
  await app.close();
}

bootstrap().catch((error) => {
  console.error('Erro ao rodar seed:', error);
  process.exit(1);
});