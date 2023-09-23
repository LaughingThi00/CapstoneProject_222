import { AbstractEntity } from 'src/blockchain/common/entities/abstract-entity';
import { Column, Entity } from 'typeorm';

class WalletObject {
  token: String;
  amount: Number;
}

@Entity('exchange-assets')
export class ExchangeAsset extends AbstractEntity {
  @Column({ unique: true, nullable: false })
  userId: string;

  @Column({ default: '' })
  merchant: string;

  @Column({ default: '' })
  address: string;

  @Column({})
  asset: Array<WalletObject>[];
}
