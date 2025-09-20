import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import * as Services from '../services/index.js';
import { LoginOutput } from '../types.js';
import * as InputValidators from '../validators/input-validators/index.js';
import { AuthGuard, Public } from '../middleware/auth-guard.js';

@Controller()
export class UserController {
  constructor(private readonly userService: Services.UserService) {}

  @UseGuards(AuthGuard)
  @Get('users')
  async allUsers() {
    return await this.userService.users();
  }

  @UseGuards(AuthGuard)
  @Post('newUser')
  async createUser(@Body() data: InputValidators.UserInputValidator) {
    return await this.userService.createUser(data);
  }

  @Public()
  @Post('register')
  async register(
    @Body() data: InputValidators.UserInputValidator,
  ): Promise<string> {
    return await this.userService.register(data);
  }

  @Public()
  @Post('login')
  async login(
    @Body() data: InputValidators.UserInputValidator,
  ): Promise<LoginOutput> {
    return await this.userService.login(data);
  }
}
