import { Inject, Injectable } from '@nestjs/common';
import * as TypeORM from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as Entities from '../entities/index.js';
import * as InputValidators from '../validators/input-validators/index.js';

@Injectable()
export class DepartmentService {
  constructor(
    private readonly dataSource: TypeORM.DataSource,
    @InjectRepository(Entities.Department)
    private readonly departmentRepository: TypeORM.Repository<Entities.Department>,
  ) {}

  async departments() {
    try {
      const departments = await this.departmentRepository.find();
      if (departments) {
        return departments;
      }
    } catch (error: any) {
      throw new Error(`Failed to fetch Departments`);
    }
  }

  async createDepartment(data: InputValidators.DepartmentInputValidator) {
    try {
      const departmentToCreate = this.departmentRepository.create(
        data as Entities.Department,
      );
      const department =
        await this.departmentRepository.save(departmentToCreate);
      if (department) {
        return department;
      }
      throw new Error(`Failed to create Department`);
    } catch (error: any) {
      throw new Error(`Failed to fetch Departments`);
    }
  }
}
