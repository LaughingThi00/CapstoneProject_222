import { AbstractEntity } from 'src/blockchain/common/entities/abstract-entity';
import { Column, Entity } from 'typeorm';

@Entity('merchant')
export class Merchant extends AbstractEntity {
  @Column({ unique: true, nullable: false })
  partner_code: string;

  @Column({ default: '' })
  name: string;

  @Column({ nullable: false })
  privateKey: string;

  @Column({ nullable: false })
  publicKey: string;
}
