import { AbstractEntity } from 'src/common/entities/abstract-entity';
import { Column, Entity } from 'typeorm';

@Entity('wallets')
export class Wallet extends AbstractEntity {
  @Column({ default: '' })
  userId: string;

  @Column({ default: '' })
  merchant: string;

  @Column({ default: {} })
  key: object;
}
