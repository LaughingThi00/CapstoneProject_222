import { AbstractEntity } from 'src/blockchain/common/entities/abstract-entity';
import { Column, Entity } from 'typeorm';

@Entity('exchange-assets')
export class ExchangeAsset extends AbstractEntity {
  @Column({ default: '' })
  userId: string;

  @Column({ default: '' })
  merchant: string;

  @Column({ default: '' })
  type: string;

  @Column({ default: '' })
  asset: string;

  @Column({ default: 0 })
  assetAmount: number;

  @Column({ default: '' })
  fiat: string;

  @Column({ default: 0 })
  fiatAmount: number;
}
