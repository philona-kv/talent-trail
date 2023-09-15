// experiences.service.ts
import { Injectable } from '@nestjs/common';
import { RequestUtil } from '../../util/request.util';
import { LeetCodeProfileInfo } from '../types/social.profile.types';

@Injectable()
export class SocialProfileService {
  private leetcodeProfileUrl = 'https://leetcode-stats-api.herokuapp.com';

  async getLeetCodeProfile(userName: string) {
    const url = `${this.leetcodeProfileUrl}/${userName}`;
    const response = await RequestUtil.sendRequest<LeetCodeProfileInfo>(
      'GET',
      url,
    );
    return response.data;
  }
}
