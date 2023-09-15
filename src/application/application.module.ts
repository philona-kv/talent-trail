import { Module } from '@nestjs/common';
import { ApplicationService } from './service/application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationResolver } from './resolver/application.resolver';
import Application from './entity/application.entity';
import { EmployeeModule } from '../employee/employee.module';
import { CandidateModule } from '../candidate/candidate.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application]),
    EmployeeModule,
    CandidateModule,
  ],
  providers: [ApplicationService, ApplicationResolver],
})
export class ApplicationModule {}