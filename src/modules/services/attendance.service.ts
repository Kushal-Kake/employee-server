import { Inject, Injectable } from '@nestjs/common';
import * as TypeORM from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as Entities from '../entities/index.js';
import * as InputValidators from '../validators/input-validators/index.js';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly dataSource: TypeORM.DataSource,
    @InjectRepository(Entities.Attendance)
    private readonly attendanceRepository: TypeORM.Repository<Entities.Attendance>,
  ) {}

  async attendances() {
    try {
      const attendances = await this.attendanceRepository.find();
      if (attendances) {
        return attendances;
      }
    } catch (error: any) {
      throw new Error(`Failed to fetch attendances`);
    }
  }

  async attendanceByEmployeeId(
    employeeId: string,
  ): Promise<Entities.Attendance[]> {
    try {
      const fetchedEmployeeAttendances: Entities.Attendance[] =
        await this.attendanceRepository.find({
          where: { employeeId: employeeId },
        });
      if (fetchedEmployeeAttendances) {
        return fetchedEmployeeAttendances;
      }
      throw new Error(`Failed to fetch employee attendances`);
    } catch (error: any) {
      throw new Error(`Failed to fetch employee attendances`);
    }
  }

  async createAttendance(data: InputValidators.AttendanceInputValidator) {
    try {
      const attendanceToCreate = this.attendanceRepository.create(
        data as Entities.Attendance,
      );
      const attendance =
        await this.attendanceRepository.save(attendanceToCreate);
      if (attendance) {
        return attendance;
      }
      throw new Error(`Failed to create Attendance`);
    } catch (error: any) {
      throw new Error(`Failed to fetch Attendances`);
    }
  }
}
