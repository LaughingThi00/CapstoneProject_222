import { PartialType } from '@nestjs/swagger';
import { CreateExchangeAssetDto } from './create-exchange-asset.dto';

export class UpdateExchangeAssetDto extends PartialType(CreateExchangeAssetDto) { }
