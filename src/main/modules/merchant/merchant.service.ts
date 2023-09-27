import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from './entities/merchant.entity';
import { ExceptionService } from '../../../common/service/exception.service';
import { MerchantCustomDto } from './dto/merchantCustom.dto';
import { genKey } from 'src/main/service/RSA';

@Injectable()
export class MerchantService {
  constructor(
    @InjectRepository(Merchant)
    private MerchantRep: Repository<Merchant>,
  ) {}

  public async findOne({
    partner_code,
    isDead,
  }: {
    partner_code: string;
    isDead: boolean;
  }) {
    const merchant = await this.MerchantRep.findOne({
      partner_code,
      isDeleted: isDead,
    });

    return merchant ? merchant : ExceptionService.throwNotFound();
  }

  public async findAll() {
    const merchants = await this.MerchantRep.find({ isDeleted: false });

    return merchants.length ? merchants : ExceptionService.throwNotFound();
  }

  public async findDead() {
    const merchants = await this.MerchantRep.find({ isDeleted: true });

    return merchants.length ? merchants : ExceptionService.throwNotFound();
  }

  public async findAllAndDead() {
    const merchants = await this.MerchantRep.find();

    return merchants.length ? merchants : ExceptionService.throwNotFound();
  }

  public async createOne(info: MerchantCustomDto) {
    if (await this.MerchantRep.findOne({ partner_code: info.partner_code })) {
      return ExceptionService.throwBadRequest();
    } else {
      const { privateKey, publicKey } = genKey();
      console.log('EXPECTED:', {
        ...info,
        privateKey,
        publicKey,
      });
      const merchant = this.MerchantRep.create({
        ...info,
        privateKey,
        publicKey,
      });

      return await this.MerchantRep.save(merchant);
    }
  }

  public async changeInfo(info: MerchantCustomDto) {
    let merchant: Merchant = null;

    merchant = await this.MerchantRep.findOne({
      partner_code: info.partner_code,
      isDeleted: false,
    });

    if (!merchant) return ExceptionService.throwBadRequest();

    return await this.MerchantRep.save({ ...merchant, info });
  }

  public async changeKey(partner_code: string) {
    let merchant: Merchant = null;

    merchant = await this.MerchantRep.findOne({
      partner_code: partner_code,
      isDeleted: false,
    });

    if (!merchant) return ExceptionService.throwBadRequest();
    const { privateKey, publicKey } = genKey();

    return await this.MerchantRep.save({ ...merchant, privateKey, publicKey });
  }

  public async deleteOne(partner_code: string) {
    let merchant: Merchant = null;

    merchant = await this.MerchantRep.findOne({
      partner_code,
    });

    if (!merchant || merchant.isDeleted === true)
      return ExceptionService.throwBadRequest();

    merchant.isDeleted = true;

    return await this.MerchantRep.save(merchant);
  }

  public async recoverOne(partner_code: string) {
    let merchant: Merchant = null;

    merchant = await this.MerchantRep.findOne({
      partner_code,
    });

    if (!merchant || merchant.isDeleted === false)
      return ExceptionService.throwBadRequest();

    merchant.isDeleted = true;

    return await this.MerchantRep.save(merchant);
  }

  public async deleteForever(partner_code: string) {
    let merchant: Merchant = null;

    merchant = await this.MerchantRep.findOne({
      partner_code,
    });

    if (!merchant) return ExceptionService.throwBadRequest();

    return await this.MerchantRep.remove(merchant);
  }
}
