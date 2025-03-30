import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class MailDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;


  @IsString()
  @IsNotEmpty()
  message: string;
}
