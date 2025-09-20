import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import * as Services from '../services/index.js';
import * as InputValidators from '../validators/input-validators/index.js';
import { AuthGuard } from '../middleware/auth-guard.js';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: Services.EmployeeService) {}

  @UseGuards(AuthGuard)
  @Get()
  async employees() {
    return await this.employeeService.employees();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async employeeById(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    employeeId: string,
  ) {
    return await this.employeeService.employeeById(employeeId);
  }

  @UseGuards(AuthGuard)
  @Post('create-employee')
  async createEmployee(@Body() data: InputValidators.EmployeeInputValidator) {
    return await this.employeeService.createEmployee(data);
  }
}
