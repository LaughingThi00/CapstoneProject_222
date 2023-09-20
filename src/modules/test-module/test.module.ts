import { Module } from '@nestjs/common';
import { TestAppController } from './test.controller';
import { TestAppService } from './test.service';
@Module({
  imports: [],
  controllers: [TestAppController],
  providers: [TestAppService],
})
export class TestModule {}
