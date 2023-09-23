import { AbstractEntity } from 'src/blockchain/common/entities/abstract-entity';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

export enum ConfigurationKeys {
  LastBlockFetchNativeDeposit = 'lastBlockFetchNativeDeposit',
  LastBlockFetchTokenDeposit = 'lastBlockFetchTokenDeposit',
}

@Entity('configuration')
export class Configuration {
  @ObjectIdColumn()
  public _id: ObjectID;

  @Column()
  key: ConfigurationKeys;

  @Column()
  value: any;

  @Column()
  chainId: number;
}
