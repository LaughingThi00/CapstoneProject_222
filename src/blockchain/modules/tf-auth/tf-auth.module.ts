import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TFAuthController } from './tf-auth.controller';
import { TFAuthService } from './tf-auth.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
    imports: [
    ],
    controllers: [TFAuthController],
    providers: [TFAuthService],
})
export class TFAuthModule { }
