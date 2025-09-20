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

@Controller('attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: Services.AttendanceService) {}

  @UseGuards(AuthGuard)
  @Get()
  async attendances() {
    return await this.attendanceService.attendances();
  }

  @UseGuards(AuthGuard)
  @Get(':employeeId')
  async attendanceByEmployeeId(
    @Param('employeeId', new ParseUUIDPipe({ version: '4' }))
    employeeId: string,
  ) {
    return await this.attendanceService.attendanceByEmployeeId(employeeId);
  }

  @UseGuards(AuthGuard)
  @Post('create-attendance')
  async createAttendance(
    @Body() data: InputValidators.AttendanceInputValidator,
  ) {
    return await this.attendanceService.createAttendance(data);
  }
}
