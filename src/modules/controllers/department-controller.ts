import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import * as Services from '../services/index.js';
import * as InputValidators from '../validators/input-validators/index.js';
import { AuthGuard } from '../middleware/auth-guard.js';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: Services.DepartmentService) {}

  @UseGuards(AuthGuard)
  @Get()
  async departments() {
    return await this.departmentService.departments();
  }

  @UseGuards(AuthGuard)
  @Post('create-department')
  async createDepartment(
    @Body() data: InputValidators.DepartmentInputValidator,
  ) {
    return await this.departmentService.createDepartment(data);
  }
}
