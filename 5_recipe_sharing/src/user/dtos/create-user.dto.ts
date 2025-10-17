import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Please enter a valid email address.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Username cannot be empty.' })
  @Length(3, 20, { message: 'Username must be between 3 and 20 characters long.' })
  username: string;

  @IsString()
  @Length(6, 30, { message: 'Password must be between 6 and 30 characters long.' })
  password: string;
}
