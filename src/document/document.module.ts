import { Module } from '@nestjs/common';
import { DocumentService } from './service/document.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entity/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  providers: [DocumentService],
  exports: [DocumentService],
})
export class DocumentModule {}
