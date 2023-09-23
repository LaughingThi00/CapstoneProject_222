import {
  ObjectIdColumn,
  ObjectID,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { getCurrentInSeconds } from 'src/blockchain/utils/helper';

export abstract class AbstractEntity {
  @ObjectIdColumn()
  public id: ObjectID;

  @Column({ type: 'number' })
  public createdAt: number;

  @Column({ type: 'number' })
  public updatedAt: number;

  @Column({ type: 'boolean' })
  public isDeleted: boolean;

  @BeforeInsert()
  insertDefault() {
    this.createdAt = getCurrentInSeconds();
    this.updatedAt = getCurrentInSeconds();
    this.isDeleted = false;
  }

  @BeforeUpdate()
  updateDates() {
    this.updatedAt = getCurrentInSeconds();
  }
}
