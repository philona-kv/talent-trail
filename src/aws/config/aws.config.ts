import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AWSConfig {
  //   public readonly region: string;
  //   public readonly accessKey: string;
  //   public readonly secretKey: string;
  public readonly accountId: string;
  public readonly environment: string;
  public readonly localEndpoint: string;
  public readonly s3: {
    readonly defaultBucket: string;
    readonly UrlDefaultExpireTimeInSecs: number;
  };

  constructor(configService: ConfigService) {
    // this.region = configService.get('AWS_REGION', '');
    // this.accessKey = configService.get('AWS_ACCESS_KEY', '');
    // this.secretKey = configService.get('AWS_SECRET_KEY', '');
    this.localEndpoint = configService.get(
      'AWS_LOCAL_ENDPOINT',
      'http://localhost:5566',
    );
    this.accountId = configService.get('AWS_ACCOUNT_ID', '000000000000');
    this.s3 = {
      defaultBucket: configService.get('AWS_S3_DEFAULT_BUCKET', ''),
      UrlDefaultExpireTimeInSecs: configService.get(
        'AWS_S3_URL_DEFAULT_EXPIRY_TIME_SECS',
        24 * 60 * 60,
      ),
    };
  }
}
