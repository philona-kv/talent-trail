import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AppGraphQLModule } from './graphql/graphql.module';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';
import { EmployeeModule } from './employee/employee.module';
import { CandidateModule } from './candidate/candidate.module';
import { HealthModule } from './health/health.module';
import { ApplicationModule } from './application/application.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { InterviewModule } from './interview/interview.module';
import { JobModule } from './job/job.module';
import { DocumentModule } from './document/document.module';
import { CommonModule } from './common/common.module';
import { AWSModule } from './aws/aws.module';

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
    AWSModule,
    DatabaseModule,
    AppGraphQLModule,
    NotificationModule,
    AuthenticationModule,
    EmployeeModule,
    CandidateModule,
    CommonModule,
    HealthModule,
    ApplicationModule,
    InterviewModule,
    JobModule,
    DocumentModule,
  ],
})
export class AppModule {}
