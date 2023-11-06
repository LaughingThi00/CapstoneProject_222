import { Controller, Get, Post, Res, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TFAuthService } from './tf-auth.service';
import path from 'path'
import { Response } from 'express';
import { LoginAuthDto } from './dto/login-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
const dirname = path.resolve()
console.log('__dirname:', dirname)
@ApiTags('Auth')
@Controller('/2fa')
export class TFAuthController {
    constructor(private readonly tfAuthService: TFAuthService) { }
    // @Get('/')
    // async homePage(@Res() res: Response) {
    //     return res.sendFile(path.join(__dirname, 'views/home.html'));
    // }
    // @Get('/login')
    // async loginPage(@Res() res: Response) {
    //     return res.sendFile(path.join(__dirname, 'views/login.html'));
    // }
    @Post('/login')
    async postLogin(@Body() info: LoginAuthDto) {
        const transactions = await this.tfAuthService.login(info);
        return transactions;
    }

    // @Get('/enable-2fa')
    // async enable2FA(@Res() res: Response) {
    //     return res.sendFile(path.join(__dirname, 'views/enable2FA.html'));
    // }
    @Post('/enable-2fa')
    async postEnable2FA(
    ) {
        const transactions = await this.tfAuthService.enable2FA();
        return transactions;
    }
    // @Get('/verify-2fa')
    // async verify2FA(@Res() res: Response) {
    //     return res.sendFile(path.join(__dirname, 'views/verify2FA.html'));
    // }
    @Post('/verify-2fa')
    async postVerify2FA(
        @Body() otp: VerifyAuthDto
    ) {
        const transactions = await this.tfAuthService.verify2FA(otp);
        return transactions;
    }
}
