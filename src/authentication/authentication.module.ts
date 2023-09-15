import { Global, Module } from '@nestjs/common';
import { AuthenticationService } from './service/authentication.service';
import { AuthenticationResolver } from './resolver/authentication.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import Candidate from '../candidate/entity/candidate.entity';
import Employee from '../employee/entity/employee.entity';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Candidate, Employee]), ConfigModule],
  providers: [AuthenticationResolver, AuthenticationService],
})
export class AuthenticationModule {}
