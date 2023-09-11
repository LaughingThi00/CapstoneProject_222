import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsNumber, Min, IsString, Validate } from 'class-validator';
import { AddressValidator } from 'src/validators/address.validator';

export class AddressDto {
  @Validate(AddressValidator)
  @IsString()
  @Type(() => String)
  @ApiProperty()
  @Transform((param) => param.value.toLowerCase())
  address: string;
}
