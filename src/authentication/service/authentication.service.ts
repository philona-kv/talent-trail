import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

import Candidate from '../../candidate/entity/candidate.entity';
import Employee from '../../employee/entity/employee.entity';
import { LoginInput } from '../../schema/graphql.schema';
import { GroupNames } from '../../common/constants/group.constants';
import { CommonUtil } from '../../common/util/common.util';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private configService: ConfigService,
    private commonUtil: CommonUtil,
  ) {}

  async login(input: LoginInput) {
    const { email, password } = input;
    const employee = await this.employeeRepository.findOne({ email });
    if (employee) {
      const isPasswordValid = this.commonUtil.isPasswordValid(
        password,
        employee.password,
      );
      if (!isPasswordValid) throw new UnauthorizedException('Wrong password');
      return this.generateToken(employee, employee.role);
    }
    const candidate = await this.candidateRepository.findOne({ email });
    if (candidate) {
      const isPasswordValid = this.commonUtil.isPasswordValid(
        password,
        candidate.password,
      );
      if (!isPasswordValid) throw new UnauthorizedException('Wrong password');
      return this.generateToken(candidate, [GroupNames.CANDIDATE]);
    }
  }

  private getCookieConfiguration() {
    return {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: this.configService.get('COOKIE_EXPIRY'),
    };
  }

  setCookie(resp: any, token: any) {
    const name = this.configService.get('COOKIE_NAME');
    resp.cookie(name, token, this.getCookieConfiguration());
    return resp;
  }

  clearCookie(resp: any) {
    const name = this.configService.get('COOKIE_NAME');
    resp.clearCookie(name, this.getCookieConfiguration());
    return resp;
  }

  generateToken(user: any, groups: string[]) {
    const details = {
      id: user.id,
      groups,
    };
    const secret = this.configService.get('JWT_SECRET');
    const expiresIn = this.configService.get('JWT_EXPIRY_TIME');
    return jwt.sign(details, secret, { expiresIn });
  }

  validateToken(token: string) {
    const secret = this.configService.get('JWT_SECRET');
    const verificationResponse: any = jwt.verify(token, secret);
    return verificationResponse;
  }
}
