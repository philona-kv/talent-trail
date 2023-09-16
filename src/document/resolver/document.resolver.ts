import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { DocumentService } from '../service/document.service';
import { S3Service } from '../../aws/service/aws.s3.service';
import { CreateDocumentInput } from '../../schema/graphql.schema';
import { Document } from '../entity/document.entity';

@Resolver('Document')
export class DocumentResolver {
  constructor(
    private documentService: DocumentService,
    private s3Service: S3Service,
  ) {}

  @Mutation()
  createDocument(@Args('input') input: CreateDocumentInput) {
    return this.documentService.create(input);
  }

  @Query()
  getDocumentById(@Args('id') id: number) {
    return this.documentService.findOne(id);
  }

  @Query()
  getDocumentUploadUrl(@Args('key') key: string) {
    return this.s3Service.generatePresignedUrlForPut(key);
  }

  @ResolveField('url')
  __presignedUrl(document: Document) {
    // return this.s3Service.generatePresignedUrlForGet(document.key);
  }
}
