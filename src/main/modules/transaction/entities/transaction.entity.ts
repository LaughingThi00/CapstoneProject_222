import { AbstractEntity } from 'src/blockchain/common/entities/abstract-entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { TransactionType } from '../dto/transaction.dto';
import { getCurrentInSeconds } from 'src/blockchain/utils/helper';

@Entity('transaction')
export class Transaction extends AbstractEntity {
  @Column({ nullable: false })
  type: TransactionType;

  @Column({ nullable: false })
  timestamp: number;

  @Column({ nullable: false })
  from_: string;

  @Column({ nullable: false })
  to_: string;

  @Column()
  forToken?: string = null;

  @Column()
  forAmount?: number = null;

  @Column()
  byToken?: string = null;

  @Column()
  byAmount?: number = null;

  @Column()
  platformWithdraw?: string = null;

  @Column()
  commission?: number = 0;

  @Column()
  hash?: string = null;

  @BeforeInsert()
  insertDefault() {
    this.timestamp = getCurrentInSeconds();
  }
}
