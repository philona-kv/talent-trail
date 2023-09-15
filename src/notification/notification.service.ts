import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { ConfigService } from '@nestjs/config';
import { EmailMessage } from './types/mail.send.type';

@Injectable()
export class NotificationService {
  private emailUrl;
  private apiKey;

  constructor(private configService: ConfigService) {
    this.emailUrl = this.configService.get('EMAIL_API_ENDPOINT');
    this.apiKey = Buffer.from(
      this.configService.get('EMAIL_API_KEY').toString(),
      'base64',
    ).toString('utf-8');
  }
  public async send(emailInfo: EmailMessage) {
    return await this.makeRequest('POST', this.emailUrl, emailInfo);
  }

  private async getHeader() {
    return {
      'Content-Type': 'application/json',
      'api-key': this.apiKey,
    };
  }

  private async makeRequest<T>(method: Method, url: string, data?: any) {
    try {
      const config: AxiosRequestConfig = {
        method,
        url,
        data,
        timeout: 5000,
        headers: { ...(await this.getHeader()) },
      };
      // this.logger.info(`axios - ${JSON.stringify(config)}`);
      const response: AxiosResponse<T> = await axios(config);
      return { isSuccess: true, data: response.data };
    } catch (error) {
      //   this.logger.error(
      //     `makeRequest - Request failed: ${JSON.stringify(
      //       error?.response?.data,
      //     )}`,
      //   );
      return {
        isSuccess: false,
        error: `Request failed: ${JSON.stringify(error?.response?.data)}`,
        errorStack: error,
      };
    }
  }
}
