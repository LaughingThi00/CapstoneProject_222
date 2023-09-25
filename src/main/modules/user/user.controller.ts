import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ConditionUserDto } from './dto/conditionUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { ChangeAmountDto } from './dto/changeAmount.dto';
import { ChangeInfoDto } from './dto/changeInfo.dto';

@ApiTags('(Main)-User')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async createUser(@Body() createUser: CreateUserDto) {
    return await this.userService.createOne(createUser);
  }

  @Get('/')
  async findAllUser() {
    return await this.userService.findAll();
  }

  @Get('/findOne-with-condition')
  @ApiQuery({ name: 'address', required: false, type: String })
  @ApiQuery({ name: 'userId', required: false, type: String })
  async findThisUser(
    @Query('address') address?: string,
    @Query('userId') userId?: string,
  ) {
    return await this.userService.findOneWithCondition({ address, userId });
  }

  @Get('/findAll-with-condition')
  async findThoseUsers(@Body() conditionUser: ConditionUserDto) {
    return await this.userService.findAllWithCondition(conditionUser);
  }

  @Get('/find-deleted-user-of-one-merchant')
  async findDeletedUsersOfOneMerchant(@Body() conditionUser: ConditionUserDto) {
    return await this.userService.findDeadWithCondition(conditionUser);
  }

  @Put('/increase')
  async increaseToken(@Body() info: ChangeAmountDto) {
    return await this.userService.increaseToken(info);
  }

  @Put('/decrease')
  async decreaseToken(@Body() info: ChangeAmountDto) {
    return await this.userService.decreaseToken(info);
  }

  @Put('/change-info')
  async changeAccountInfo(@Body() info: ChangeInfoDto) {
    return await this.userService.changeInfo(info);
  }

  @Put('/delete-account')
  async softDeleteAccount(@Body() info: ChangeInfoDto) {
    return await this.userService.deleteAccount(info);
  }

  @Put('/recover-account')
  async recoverAccount(@Body() info: ChangeInfoDto) {
    return await this.userService.recoverAccount(info);
  }

  @Delete('/delete-permanently')
  async hardDeleteAccount(@Body() info: ChangeInfoDto) {
    return await this.userService.deleteForever(info);
  }
}
