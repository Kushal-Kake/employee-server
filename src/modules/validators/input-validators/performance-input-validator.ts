import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class PerformanceInputValidator {
  @IsNotEmpty()
  @IsInt()
  rating!: number;

  @IsNotEmpty()
  @IsString()
  review!: string;
}
