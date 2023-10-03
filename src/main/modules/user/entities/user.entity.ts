import { AbstractEntity } from 'src/blockchain/common/entities/abstract-entity';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

class WalletObject {
  token: string;
  amount: number;
}

@Entity('user')
export class User extends AbstractEntity {
  @ObjectIdColumn()
  public _id: ObjectID;

  @Column({ unique: true, nullable: false })
  userId: string;

  @Column({ default: '' })
  merchant: string;

  @Column({ default: '' })
  address: string;

  @Column({
    default: [
      { token: 'USDT', amount: 0 },
      { token: 'ETH', amount: 0 },
      { token: 'BTC', amount: 0 },
      { token: 'VND', amount: 0 },
    ],
  })
  asset: Array<WalletObject>;
}
