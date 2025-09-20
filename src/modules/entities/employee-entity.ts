import * as TypeORM from 'typeorm';
import { BaseAuditableEntity } from './base-auditable-entity.js';
import * as Entities from './index.js';

@TypeORM.Entity()
export class Employee extends BaseAuditableEntity {
  @TypeORM.Column({ type: 'varchar', nullable: false })
  firstName!: string;

  @TypeORM.Column({ type: 'varchar', nullable: true })
  lastName?: string;

  @TypeORM.Column({ type: 'varchar', unique: true, nullable: false })
  email!: string;

  @TypeORM.Column({ type: 'timestamp', nullable: false })
  joinDate!: Date;

  @TypeORM.Column({ type: 'uuid', nullable: false })
  departmentId!: string;

  @TypeORM.ManyToOne(() => Entities.Department, (dept) => dept.employees, {
    eager: true,
  })
  department?: TypeORM.Relation<Entities.Department>;

  @TypeORM.OneToMany(
    () => Entities.Attendance,
    (attendance) => attendance.employee,
  )
  attendanceRecords?: TypeORM.Relation<Entities.Attendance[]>;

  @TypeORM.OneToMany(
    () => Entities.Performance,
    (performance) => performance.employee,
  )
  performanceRecords?: TypeORM.Relation<Entities.Performance[]>;
}
