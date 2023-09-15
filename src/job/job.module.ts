import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Job from './entity/job.entity';
import { JobResolver } from './resolver/job.resolver';
import { JobService } from './service/job.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  providers: [JobResolver, JobService],
  exports: [JobService],
  controllers: [],
})
export class JobModule {}
