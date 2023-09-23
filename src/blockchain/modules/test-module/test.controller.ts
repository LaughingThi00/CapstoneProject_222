import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TestAppService } from './test.service';

@ApiTags('HealthCheck')
@Controller('/health-check')
export class TestAppController {
  constructor(private readonly testAppService: TestAppService) {}
  @Get('/')
  async getString() {
    const string_test = this.testAppService.getHello();
    return string_test;
  }
}
