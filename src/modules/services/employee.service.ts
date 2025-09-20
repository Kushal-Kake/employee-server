import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as TypeORM from 'typeorm';
import * as Entities from '../entities/index.js';
import { Maybe } from '../types.js';
import * as InputValidators from '../validators/input-validators/index.js';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly dataSource: TypeORM.DataSource,
    @InjectRepository(Entities.Employee)
    private readonly employeeRepository: TypeORM.Repository<Entities.Employee>,
  ) {}

  async employees() {
    try {
      const employees = await this.employeeRepository.find();
      if (employees) {
        return employees;
      }
    } catch (error: any) {
      throw new Error(`Failed to fetch employees`);
    }
  }

  async employeeById(id: string): Promise<Entities.Employee> {
    try {
      const fetchedEmployee: Maybe<Entities.Employee> =
        await this.employeeRepository.findOne({
          where: { id },
        });
      if (fetchedEmployee) {
        return fetchedEmployee;
      }
      throw new Error(`Failed to fetch employee Employees`);
    } catch (error: any) {
      throw new Error(`Failed to fetch employee Employees`);
    }
  }

  async createEmployee(data: InputValidators.EmployeeInputValidator) {
    try {
      const employeeToCreate = this.employeeRepository.create(
        data as Entities.Employee,
      );
      const employee = await this.employeeRepository.save(employeeToCreate);
      if (employee) {
        return employee;
      }
      throw new Error(`Failed to create Employee`);
    } catch (error: any) {
      throw new Error(`Failed to fetch Employees`);
    }
  }
}
