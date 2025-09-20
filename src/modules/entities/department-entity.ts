import * as TypeORM from 'typeorm';
import { BaseAuditableEntity } from './base-auditable-entity.js';
import * as Entities from './index.js';

@TypeORM.Entity()
export class Department extends BaseAuditableEntity {
  @TypeORM.Column({ type: 'varchar', nullable: false, unique: true })
  name!: string;

  @TypeORM.OneToMany(() => Entities.Employee, (employee) => employee.department)
  employees?: TypeORM.Relation<Entities.Employee[]>;
}
