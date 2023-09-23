import { AbstractEntity } from 'src/blockchain/common/entities/abstract-entity';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity('deposits')
export class Deposit extends AbstractEntity {
  @Column({ default: '' })
  userId: string;

  @Column({ default: '' })
  merchant: string;

  chainId: number;
  @Column({ default: '' })
  userAddress: string;

  @Column({ default: 0 })
  blockNumber: number;

  @Column({ default: 0 })
  timeStamp: number;

  @Column({ default: '' })
  transactionHash: string;

  @Column({ default: '' })
  symbol: string;

  @Column({ default: 0 })
  amount: number;

  @Column({ default: '' })
  fromAddress: string;

  @Column({ default: '' })
  toAddress: string;

  @Column({ default: '' })
  tokenAddress: string;

  @Column({ default: '' })
  methodId: string;

  @Column({ default: '' })
  functionName: string;
}
