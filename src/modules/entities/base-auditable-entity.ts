import * as TypeORM from 'typeorm';
import { BaseEntity } from './base-entity.js';
import { Transform } from 'class-transformer';

export abstract class BaseAuditableEntity extends BaseEntity {
  @TypeORM.Column({ nullable: true })
  @Transform((property) => {
    if (property && property.value) {
      return new Date(property.value);
    }
    return null;
  })
  public updatedOn?: Date;

  @TypeORM.Column({ nullable: false })
  @Transform((property) => {
    if (property && property.value) {
      return new Date(property.value);
    }
    return null;
  })
  public createdOn!: Date;

  @TypeORM.BeforeUpdate()
  public setUpdatedAt() {
    this.updatedOn = new Date();
  }

  @TypeORM.BeforeInsert()
  public setCreatedOn() {
    this.createdOn = new Date();
  }
}
