import {
  CanActivate,
  CustomDecorator,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import * as Entities from '../entities/index.js';
import { JwtPayloadType, Maybe } from '../types.js';

export const IS_PUBLIC_KEY: string = 'isPublic';
export const Public: () => CustomDecorator<string> = () =>
  SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
    private dataSource: DataSource,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const executionContextArgs: Array<
      Record<string, Record<string, Record<string, string>>>
    > = context?.getArgs();

    const requestDictionary: Maybe<
      Record<string, Record<string, Record<string, string>>>
    > = executionContextArgs.find((executionContextArg) => {
      return (
        executionContextArg?.req?.headers ??
        executionContextArg?.headers ??
        executionContextArg?.req?.req?.headers
      );
    });

    const headersDictionary: Maybe<
      string | Record<string, string> | Record<string, Record<string, string>>
    > =
      requestDictionary?.req?.headers ??
      requestDictionary?.headers ??
      requestDictionary?.req?.req?.headers;

    const authorizationInfo: string = (
      headersDictionary as Record<string, string>
    )?.authorization;

    const token: Maybe<string> = this.extractTokenFromHeader(authorizationInfo);

    if (!token) {
      throw new Error(`Access denied.`);
    }

    try {
      const payload: JwtPayloadType = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('jwtSecret'),
      });

      if (!payload) {
        throw new UnauthorizedException(`Access denied!`);
      }

      const fetchedUser: Maybe<Entities.User> = await this.dataSource
        .getRepository(Entities.User)
        .findOne({
          where: {
            id: payload?.id,
          },
        });

      if (!fetchedUser) {
        throw new UnauthorizedException(`Access denied!`);
      }
    } catch (error: any) {
      throw new UnauthorizedException(`Access denied`);
    }
    return true;
  }

  private extractTokenFromHeader(authorizationInfo: string): Maybe<string> {
    if (!authorizationInfo) {
      throw new UnauthorizedException(`Access denied!`);
    }

    const [type, token]: string[] = authorizationInfo.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
