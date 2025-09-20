import * as TypeORM from 'typeorm';
import { BaseAuditableEntity } from './base-auditable-entity.js';
import * as Entities from './index.js';

@TypeORM.Entity()
export class Attendance extends BaseAuditableEntity {
  @TypeORM.Column({ type: 'timestamp', nullable: false })
  date!: Date;

  @TypeORM.Column({ type: 'boolean', default: false })
  isPresent: boolean = false;

  @TypeORM.Column({ type: 'uuid', nullable: false })
  employeeId!: string;

  @TypeORM.ManyToOne(
    () => Entities.Employee,
    (employee) => employee.attendanceRecords,
    {
      onDelete: 'CASCADE',
    },
  )
  employee?: TypeORM.Relation<Entities.Employee>;
}
