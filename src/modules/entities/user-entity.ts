import * as TypeORM from 'typeorm';
import { BaseAuditableEntity } from './base-auditable-entity.js';

@TypeORM.Entity()
export class User extends BaseAuditableEntity {
  @TypeORM.Column({ type: 'varchar', nullable: false })
  email!: string;

  @TypeORM.Column({ type: 'varchar', nullable: false })
  password!: string;
}
