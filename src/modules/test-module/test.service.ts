import { Injectable } from '@nestjs/common';

@Injectable()
export class TestAppService {
  getHello(): string {
    return "Hello, I'm fine";
  }
}
