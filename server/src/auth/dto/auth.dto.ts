import { IsEmail, IsString, MaxLength, MinLength, Matches } from "class-validator";

export class SignUpDto {
  @IsString()
  @MinLength(3, {
    message: 'First Name must not be empty'
  })
  @MaxLength(50, {
    message: 'First Name too long',
  })
  firstName: string;

  @IsString()
  @MinLength(3, {
    message: 'Last Name must not be empty'
  })
  @MaxLength(50, {
    message: 'Last Name too long',
  })
  lastName: string;

  @IsEmail()
  email: string

  @IsString()
  @MinLength(8, {
    message: 'Password must be a minimum of 8 characters'
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password must contain a letter, a number and a special character' })
  password: string;

}


export class LoginDto {
  @IsEmail()
  email: string

  @IsString()
  password: string
}
