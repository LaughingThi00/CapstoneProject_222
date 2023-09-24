import { AbstractEntity } from 'src/blockchain/common/entities/abstract-entity';
import { Column, Entity } from 'typeorm';

@Entity('transaction')
export class Transaction extends AbstractEntity {
  @Column({ default: '' })
  platform: String;

  @Column({ default: '' })
  hash: { type: String; required: true; unique: true };

  @Column({ default: '' })
  transaction_type: { type: String; required: true; unique: true };

  @Column({ default: '' })
  timestamp: { type: String; required: true };

  @Column({ default: '' })
  from_merchant: { type: String };

  @Column({ default: '' })
  from_userId: { type: String };

  @Column({ default: '' })
  to_merchant: { type: String };

  @Column({ default: '' })
  to_userId: { type: String };

  @Column({ default: '' })
  token: { type: String; required: true };

  @Column({ default: '' })
  amount: { type: Number; required: true };

  @Column({ default: '' })
  commission: { type: Number; required: true };
}
