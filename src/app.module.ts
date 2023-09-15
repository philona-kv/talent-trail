import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CandidateModule } from './candidate/candidate.module';
import { CommonModule } from './common/common.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required().min(10),
      }),
    }),
    DatabaseModule,
    CandidateModule,
    CommonModule,
    EmployeeModule,
  ],
  providers: [],
})
export class AppModule {}
