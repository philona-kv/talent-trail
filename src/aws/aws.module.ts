import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AWSConfig } from './config/aws.config';
import { S3Service } from './service/aws.s3.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [AWSConfig, S3Service],
  exports: [S3Service],
})
export class AWSModule {}
