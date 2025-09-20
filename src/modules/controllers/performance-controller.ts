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

@Controller('performances')
export class PerformanceController {
  constructor(
    private readonly performanceService: Services.PerformanceService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async performances() {
    return await this.performanceService.performances();
  }

  @UseGuards(AuthGuard)
  @Get(':employeeId')
  async performanceByEmployeeId(
    @Param('employeeId', new ParseUUIDPipe({ version: '4' }))
    employeeId: string,
  ) {
    return await this.performanceService.performanceByEmployeeId(employeeId);
  }

  @UseGuards(AuthGuard)
  @Post('create-performance')
  async createPerformance(
    @Body() data: InputValidators.PerformanceInputValidator,
  ) {
    return await this.performanceService.createPerformance(data);
  }
}
