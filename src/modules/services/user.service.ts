import { Inject, Injectable } from '@nestjs/common';
import * as TypeORM from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as Entities from '../entities/index.js';
import * as InputValidators from '../validators/input-validators/index.js';
import * as bcrypt from 'bcryptjs';
import { LoginOutput, Maybe } from '../types.js';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly dataSource: TypeORM.DataSource,
    @InjectRepository(Entities.User)
    private readonly userRepository: TypeORM.Repository<Entities.User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async users() {
    try {
      const users = await this.userRepository.find();
      if (users) {
        return users;
      }
    } catch (error: any) {
      throw new Error(`Failed to fetch users`);
    }
  }

  async createUser(data: InputValidators.UserInputValidator) {
    try {
      const userToCreate = this.userRepository.create(data as Entities.User);
      const user = await this.userRepository.save(userToCreate);
      if (user) {
        return user;
      }
      throw new Error(`Failed to create user`);
    } catch (error: any) {
      throw new Error(`Failed to create users`);
    }
  }

  async register(data: InputValidators.UserInputValidator) {
    try {
      const existingUser: Maybe<Entities.User> =
        await this.userRepository.findOne({ where: { email: data.email } });
      if (existingUser) {
        throw new Error(`User with the email already registered`);
      }
      data.password = await bcrypt.hash(data.password, 10);
      const userToCreate = this.userRepository.create(data as Entities.User);
      const user = await this.userRepository.save(userToCreate);
      if (user) {
        return `Registration successful.`;
      }
      throw new Error(`Failed to register user`);
    } catch (error: any) {
      throw error?.message;
    }
  }

  async login(data: InputValidators.UserInputValidator): Promise<LoginOutput> {
    try {
      const existingUser: Maybe<Entities.User> =
        await this.userRepository.findOne({ where: { email: data.email } });
      if (!existingUser) {
        throw new Error(`User not registered`);
      }
      const isValidPassword: boolean = await bcrypt.compare(
        data.password,
        existingUser.password,
      );
      if (!isValidPassword) {
        throw new Error(`Please provide a valid email/password.`);
      }

      const accessToken: string = await this.jwtService.signAsync(
        { email: existingUser?.email, id: existingUser?.id },
        {
          secret: this.configService.get('jwtSecret'),
        },
      );
      if (accessToken) {
        return {
          accessToken: accessToken,
        };
      }
      throw new Error(`Login failed due to invalid creds`);
    } catch (error: any) {
      throw error?.message;
    }
  }
}
