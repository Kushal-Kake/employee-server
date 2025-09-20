import { IsString } from "class-validator";


export class UserInputValidator {
    @IsString()
    email!: string

    @IsString()
    password!: string
}