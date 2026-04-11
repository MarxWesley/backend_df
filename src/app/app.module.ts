import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from 'src/role/role.module';
import { UsersModule } from 'src/users/users.module';
import { PeopleModule } from 'src/people/people.module';
import { AuthModule } from 'src/auth/auth.module';
import { QuestionsModule } from 'src/questions/questions.module';
import { ReviewAnswerModule } from 'src/review_answer/review_answer.module';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { PeopleCompanyModule } from 'src/people_company/people_company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    RoleModule,
    PeopleModule,
    AuthModule,
    QuestionsModule,
    ReviewAnswerModule,
    ReviewsModule,
    CompaniesModule,
    PeopleCompanyModule,
  ],
  providers: [AppService],
})
export class AppModule {}