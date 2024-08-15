import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  password: string;
}
