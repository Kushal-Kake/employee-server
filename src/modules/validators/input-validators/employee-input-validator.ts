import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class EmployeeInputValidator {
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsString()
  lastName?: string;

  @IsNotEmpty()
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsDate()
  joinDate!: Date;
}
