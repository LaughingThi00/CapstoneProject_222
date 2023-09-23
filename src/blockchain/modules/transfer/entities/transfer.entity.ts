import { AbstractEntity } from 'src/blockchain/common/entities/abstract-entity';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity('transfers')
export class Transfer extends AbstractEntity {
  @Column({ default: '' })
  userId: string;

  @Column({ default: '' })
  merchant: string;

  @Column({ default: 0 })
  blockNumber: number;

  @Column({ default: 0 })
  timeStamp: number | string;

  @Column({ default: '' })
  transactionHash: string;

  @Column({ default: 0 })
  amount: number;

  @Column({ default: '' })
  asset: string;

  @Column({ default: '' })
  toAddress: any;

  @Column({ default: '' })
  tokenAddress: string;

  @Column({ default: 0 })
  effectiveGasPrice: number;

  @Column({ default: 0 })
  gasUsed: number;
}
