import { Inject, Injectable } from '@nestjs/common';
import * as TypeORM from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as Entities from '../entities/index.js';
import * as InputValidators from '../validators/input-validators/index.js';

@Injectable()
export class PerformanceService {
  constructor(
    private readonly dataSource: TypeORM.DataSource,
    @InjectRepository(Entities.Performance)
    private readonly performanceRepository: TypeORM.Repository<Entities.Performance>,
  ) {}

  async performances() {
    try {
      const performances = await this.performanceRepository.find();
      if (performances) {
        return performances;
      }
    } catch (error: any) {
      throw new Error(`Failed to fetch performances`);
    }
  }

  async performanceByEmployeeId(
    employeeId: string,
  ): Promise<Entities.Performance[]> {
    try {
      const fetchedEmployeePerformance: Entities.Performance[] =
        await this.performanceRepository.find({
          where: { employeeId: employeeId },
        });
      if (fetchedEmployeePerformance) {
        return fetchedEmployeePerformance;
      }
      throw new Error(`Failed to fetch employee performances`);
    } catch (error: any) {
      throw new Error(`Failed to fetch employee performances`);
    }
  }

  async createPerformance(data: InputValidators.PerformanceInputValidator) {
    try {
      const performanceToCreate = this.performanceRepository.create(
        data as Entities.Performance,
      );
      const performance =
        await this.performanceRepository.save(performanceToCreate);
      if (performance) {
        return performance;
      }
      throw new Error(`Failed to create Performance`);
    } catch (error: any) {
      throw new Error(`Failed to fetch Performances`);
    }
  }
}
