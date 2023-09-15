import { join } from 'path';
import { render } from 'mustache';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

import { FileUtils } from '../../common/util/file.util';
import { EmailMessage, MailType } from '../types/mail.send.type';

@Injectable()
export class NotificationService {
  private emailUrl: string;
  private apiKey: string;

  constructor(private configService: ConfigService) {
    this.emailUrl = this.configService.get('EMAIL_API_ENDPOINT');
    this.apiKey = Buffer.from(
      this.configService.get('EMAIL_API_KEY').toString(),
      'base64',
    ).toString('utf-8');
  }

  public async sendEmail(
    emailInfo: EmailMessage,
    type: string,
    jobTitle: string,
  ) {
    let template: string;
    let candidateName: string;
    switch (type) {
      case MailType.SELECTED:
        template = await FileUtils.readFile(
          join(__dirname, '../../templates/selected.html'),
        );
        candidateName = emailInfo.to[0].name;
        break;
      case MailType.REJECTED:
        template = await FileUtils.readFile(
          join(__dirname, '../../templates/rejected.html'),
        );
        candidateName = emailInfo.to[0].name;
        break;
    }
    if (template) {
      const htmlContent = render(template, {
        JOB_TITLE: jobTitle,
        CANDIDATE_NAME: candidateName,
      });
      return this.send({ ...emailInfo, htmlContent });
    }
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
      const response: AxiosResponse<T> = await axios(config);
      return { isSuccess: true, data: response.data };
    } catch (error) {
      return {
        isSuccess: false,
        error: `Request failed: ${JSON.stringify(error?.response?.data)}`,
        errorStack: error,
      };
    }
  }
}
