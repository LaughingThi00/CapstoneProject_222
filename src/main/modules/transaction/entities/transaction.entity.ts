import { AbstractEntity } from 'src/blockchain/common/entities/abstract-entity';
import { Column, Entity } from 'typeorm';

@Entity('transaction')
export class Transaction extends AbstractEntity {
  @Column({ unique: true, nullable: false })
  hash: string;

  @Column({ nullable: false })
  timestamp: string;

  @Column({ default: null })
  platform: string;

  @Column({ nullable: false })
  from_: string;

  @Column({ nullable: false })
  to_: string;

  @Column({ nullable: false })
  token: string;

  @Column({ nullable: false })
  amount: number;

  @Column({ default: 0.005 })
  commission: number;
}
