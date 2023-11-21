import path from 'path';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionService } from '../../../common/service/exception.service';
import { Repository } from 'typeorm';
import {
  generateUniqueSecret,
  verifyOTPToken,
  generateOTPToken,
  generateQRCode,
} from '../../utils/2fa.js';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
const MOCK_USER = {
  username: 'dinhthanh',
  password: 'dinhthanh123',
  is2FAEnabled: true,
  secret: generateUniqueSecret(),
};
@Injectable()
export class TFAuthService {
  constructor() {}

  public async test() {
    return 0;
  }
  public async login(req: LoginAuthDto) {
    try {
      let user = MOCK_USER;
      const { username, password } = req;
      if (username === user.username && password === user.password) {
        if (user.is2FAEnabled) {
          return {
            isCorrectIdentifier: true,
            is2FAEnabled: true,
            isLoggedIn: false,
          };
        }
        return {
          isCorrectIdentifier: true,
          is2FAEnabled: false,
          isLoggedIn: true,
        };
      }
      return {
        isCorrectIdentifier: false,
        is2FAEnabled: false,
        isLoggedIn: false,
      };
    } catch (error) {
      console.log('error:', error);
      return ExceptionService.throwInternalServerError();
    }
  }
  public async enable2FA() {
    try {
      let user = MOCK_USER;

      const serviceName = 'api.com';

      const otpAuth = generateOTPToken(user.username, serviceName, user.secret);
      const QRCodeImage = await generateQRCode(otpAuth);
      return { QRCodeImage };
    } catch (error) {
      console.log('error:', error);
      return ExceptionService.throwInternalServerError();
    }
  }
  public async verify2FA(req: VerifyAuthDto) {
    try {
      let user = MOCK_USER;
      const { otpToken } = req;
      const isValid = verifyOTPToken(otpToken, user.secret);
      return { isValid };
    } catch (error) {
      return ExceptionService.throwInternalServerError();
    }
  }
}
