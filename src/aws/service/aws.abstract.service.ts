import { Service } from 'aws-sdk';
import { ClientConfiguration } from 'aws-sdk/clients/acm';
import { AWSConfig } from '../config/aws.config';

export abstract class AmazonWebService<T extends Service> {
  protected readonly client: T;

  constructor(awsConfig: AWSConfig) {
    this.client = this.buildClient(this.buildClientConfig(awsConfig));
  }

  protected abstract buildClient(clientConfig: ClientConfiguration): T;

  protected buildClientConfig(awsConfig: AWSConfig): ClientConfiguration {
    return {
      s3ForcePathStyle: true,
      endpoint: awsConfig.localEndpoint,
    };
  }
}
