import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Job from './entity/job.entity';
import { JobResolver } from './resolver/job.resolver';
import { JobService } from './service/job.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), ConfigModule],
  providers: [JobResolver, JobService],
  exports: [JobService],
  controllers: [],
})
export class JobModule {}
