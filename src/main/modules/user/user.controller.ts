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
    return await this.userService.findOneWithCondition(address, userId);
  }

  @Get('/findAll-with-condition')
  async findThoseUsers(@Body() conditionUser: ConditionUserDto) {
    return await this.userService.findAllWithCondition(conditionUser);
  }

  @Get('/find-deleted-user-of-one-merchant')
  async findDeletedUsersOfOneMerchant(@Body() conditionUser: ConditionUserDto) {
    return await this.userService.findDeadWithCondition(conditionUser);
  }

  @Post('/')
  async createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createOne(createUser);
  }

  @Put('/increase')
  async increaseToken(@Body() info: ChangeAmountDto) {
    return this.userService.increaseToken(info);
  }

  @Put('/decrease')
  async decreaseToken(@Body() info: ChangeAmountDto) {
    return this.userService.decreaseToken(info);
  }

  @Put('/change-info')
  async changeAccountInfo(@Body() info: ChangeInfoDto) {
    return this.userService.changeInfo(info);
  }

  @Put('/delete-account')
  async softDeleteAccount(@Body() info: ChangeInfoDto) {
    return this.userService.deleteAccount(info);
  }

  @Put('/recover-account')
  async recoverAccount(@Body() info: ChangeInfoDto) {
    return this.userService.recoverAccount(info);
  }

  @Delete('/delete-pernamently')
  async hardDeleteAccount(@Body() info: ChangeInfoDto) {
    return this.userService.deleteForever(info);
  }
}
