import * as TypeORM from 'typeorm';
import { BaseAuditableEntity } from './base-auditable-entity.js';
import * as Entities from './index.js';

@TypeORM.Entity()
export class Performance extends BaseAuditableEntity {
  @TypeORM.Column({ type: 'int', nullable: false })
  rating!: number;

  @TypeORM.Column({ type: 'text', nullable: false })
  review!: string;

  @TypeORM.Column({ type: 'uuid', nullable: false })
  employeeId!: string;

  @TypeORM.ManyToOne(
    () => Entities.Employee,
    (employee) => employee.performanceRecords,
    {
      onDelete: 'CASCADE',
    },
  )
  employee?: TypeORM.Relation<Entities.Employee>;
}
