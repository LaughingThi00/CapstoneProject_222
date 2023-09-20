import { PartialType } from '@nestjs/swagger';
import { CreateBuyAssetDto } from './create-buy-asset.dto';

export class UpdateBuyAssetDto extends PartialType(CreateBuyAssetDto) { }
