import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as TypeORM from 'typeorm';
import * as Entities from '../entities/index.js';
import { departmentsInfo, employeesInfo } from './data.js';
import {
  AttendanceDataType,
  EmployeeDataType,
  PerformanceDataType,
} from '../types.js';

@Injectable()
export class SeedingService implements OnApplicationBootstrap {
  constructor(private readonly dataSource: TypeORM.DataSource) {}

  async seedEmployeeData() {
    try {
      //Checking whether the employees exists or not, seeding data if there are no employees
      const isEmployeeExists: boolean =
        (await this.dataSource.getRepository(Entities.Employee).count()) > 0;
      if (isEmployeeExists) {
        console.log(`Employees already exiists`);
        return false;
      }

      //Arranging everything in a transaction for efficiency
      const isDataSeeded: boolean = await this.dataSource.manager.transaction(
        async (transactionalEntityManager: TypeORM.EntityManager) => {
          //Initialinzing all the repositories
          const departmentRepository: TypeORM.Repository<Entities.Department> =
            transactionalEntityManager.getRepository(Entities.Department);

          const employeeRepository: TypeORM.Repository<Entities.Employee> =
            transactionalEntityManager.getRepository(Entities.Employee);

          const attendanceRepository: TypeORM.Repository<Entities.Attendance> =
            transactionalEntityManager.getRepository(Entities.Attendance);

          const performanceRepository: TypeORM.Repository<Entities.Performance> =
            transactionalEntityManager.getRepository(Entities.Performance);

          const departMentsToCreate =
            departmentRepository.create(departmentsInfo);
          const departments: Entities.Department[] =
            await departmentRepository.save(departMentsToCreate);
          console.log(`Departments created successfully!`);
          const employeesToCreate: Entities.Employee[] = employeesInfo.map(
            (employeeInfo: EmployeeDataType) => {
              const departmentIndex: number = this.getRandomIndex(
                departments.length,
              );
              console.log(`Preparing employee data to store`);
              const employeeToCreate: Entities.Employee =
                employeeRepository.create({
                  firstName: employeeInfo.firstName,
                  lastName: employeeInfo.lastName,
                  email: employeeInfo.email,
                  joinDate: employeeInfo.joinDate,
                  departmentId: departments[departmentIndex].id,
                });
              return employeeToCreate;
            },
          );

          const createdEmployees: Entities.Employee[] =
            await employeeRepository.save(employeesToCreate);
          console.log(`Created all the employees.`);
          const allAttendance: Entities.Attendance[] = [];

          for (const employee of createdEmployees) {
            const empInfo = employeesInfo.find(
              (info) => info.firstName === employee.firstName,
            );
            if (empInfo && empInfo.attendance) {
              empInfo.attendance.forEach((attendance: AttendanceDataType) => {
                allAttendance.push(
                  attendanceRepository.create({
                    date: attendance.date,
                    isPresent: attendance.isPresent,
                    employeeId: employee.id,
                  }),
                );
              });
            }
          }

          await attendanceRepository.save(allAttendance);
          console.log(`Employee attendance were seeded successfully!`);

          const allPerformances: Entities.Performance[] = [];

          for (const employee of createdEmployees) {
            const empInfo = employeesInfo.find(
              (info) => info.firstName === employee.firstName,
            );
            if (empInfo && empInfo.performance) {
              empInfo.performance.forEach(
                (empPerformance: PerformanceDataType) => {
                  allPerformances.push(
                    performanceRepository.create({
                      rating: empPerformance.rating,
                      review: empPerformance.review,
                      employeeId: employee.id,
                    }),
                  );
                },
              );
            }
          }

          await performanceRepository.save(allPerformances);
          console.log(`Employee performance seeded successfully`);
          return true;
        },
      );
      return isDataSeeded;
    } catch (error: any) {
      console.error(`Failed to seed employee data`);
      return false;
    }
  }

  getRandomIndex(length: number): number {
    const randomIndex = Math.floor(Math.random() * length);
    return randomIndex;
  }

  async onApplicationBootstrap(): Promise<void> {
    const isEmployeeDataSeeded: boolean = await this.seedEmployeeData();
    if (isEmployeeDataSeeded) {
      console.log(`Employee data seeding  was successful!`);
    }
  }
}
