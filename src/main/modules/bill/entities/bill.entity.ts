import { AbstractEntity } from 'src/blockchain/common/entities/abstract-entity';
import { Column, Entity } from 'typeorm';

@Entity('bill')
export class Bill extends AbstractEntity {
  @Column({ unique: true })
  id_: string;

  @Column({ default: '' })
  platform: string;
}
