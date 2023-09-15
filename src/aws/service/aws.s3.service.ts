import { S3 } from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ClientConfiguration } from 'aws-sdk/clients/acm';

import { AWSConfig } from '../config/aws.config';
import { AmazonWebService } from './aws.abstract.service';

@Injectable()
class SimpleStorageService extends AmazonWebService<S3> {
  private readonly DEFAULT_BUCKET: string;
  private readonly DEFAULT_URL_EXP_TIME: number;

  constructor(awsConfig: AWSConfig) {
    super(awsConfig);
    this.DEFAULT_BUCKET = awsConfig.s3.defaultBucket;
    this.DEFAULT_URL_EXP_TIME = awsConfig.s3.UrlDefaultExpireTimeInSecs;
  }

  protected buildClient(clientConfig: ClientConfiguration): S3 {
    return new S3(clientConfig);
  }

  public async deleteFile(objectKey: string, bucket?: string) {
    let result: { status: string; reason?: string };
    try {
      await this.client
        .deleteObject({
          Key: objectKey,
          Bucket: bucket || this.DEFAULT_BUCKET,
        })
        .promise();
      result = { status: 'success' };
    } catch (e) {
      result = { status: 'failure', reason: e };
    }
    return result;
  }

  public async generatePresignedUrlForGet(
    key: string,
    bucket: string = this.DEFAULT_BUCKET,
    expireTimeInSecs: number = this.DEFAULT_URL_EXP_TIME,
  ): Promise<string> {
    const presignedUrl = this.client.getSignedUrl('getObject', {
      Key: key,
      Bucket: bucket,
      Expires: expireTimeInSecs,
    });
    return presignedUrl;
  }

  public generatePresignedUrlForPut(
    key: string,
    expireTimeInSecs: number = this.DEFAULT_URL_EXP_TIME,
    bucket: string = this.DEFAULT_BUCKET,
  ) {
    return {
      key,
      extension: key.split('.').pop(),
      url: this.client.getSignedUrl('putObject', {
        Key: key,
        Bucket: bucket,
        Expires: expireTimeInSecs,
      }),
    };
  }

  public fetchFile(key: string, bucket = this.DEFAULT_BUCKET) {
    return this.client.getObject({ Bucket: bucket, Key: key }).promise();
  }
}

export { SimpleStorageService as S3Service };
