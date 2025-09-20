import { IsNotEmpty, IsString } from 'class-validator';

export class DepartmentInputValidator {
  @IsNotEmpty()
  @IsString()
  name!: string;
}
