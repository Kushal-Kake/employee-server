import { IsBoolean, IsDate, IsNotEmpty } from 'class-validator';

export class AttendanceInputValidator {
  @IsNotEmpty()
  @IsDate()
  date!: Date;

  @IsBoolean()
  isPresent?: boolean;
}
