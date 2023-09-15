import { Module } from '@nestjs/common';
import { DocumentService } from './service/document.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entity/document.entity';
import { DocumentResolver } from './resolver/document.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  providers: [DocumentResolver, DocumentService],
  exports: [DocumentService],
})
export class DocumentModule {}
