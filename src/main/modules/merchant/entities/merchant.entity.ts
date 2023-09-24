import { AbstractEntity } from 'src/blockchain/common/entities/abstract-entity';
import { Column, Entity } from 'typeorm';

@Entity('merchant')
export class Merchant extends AbstractEntity {
  @Column({ unique: true, nullable: false })
  partner_code: String;

  @Column({ default: '' })
  name: String;

  @Column({ nullable: false })
  privateKey: String;

  @Column({ nullable: false })
  publicKey: String;
}
