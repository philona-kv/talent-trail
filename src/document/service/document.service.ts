import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../entity/document.entity';
import { DocumentType } from '../../schema/graphql.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(documentData: Partial<Document>): Promise<Document> {
    const document = this.documentRepository.create(documentData);
    if (
      document.type == DocumentType.RESUME &&
      document.entityName === 'CANDIDATE'
    ) {
      // this.eventEmitter.emit('resume.upload', document);
    }
    return this.documentRepository.save(document);
  }

  async findAll(): Promise<Document[]> {
    return this.documentRepository.find();
  }

  async findOne(id: number): Promise<Document | undefined> {
    return this.documentRepository.findOne(id);
  }

  async update(
    id: number,
    documentData: Partial<Document>,
  ): Promise<Document | undefined> {
    await this.documentRepository.update(id, documentData);
    return this.documentRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.documentRepository.delete(id);
  }
}
