// documents.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../entity/document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  async create(documentData: Partial<Document>): Promise<Document> {
    const document = this.documentRepository.create(documentData);
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
