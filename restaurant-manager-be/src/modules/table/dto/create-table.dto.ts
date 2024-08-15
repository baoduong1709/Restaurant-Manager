import { IsBoolean, IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTableDto {
  @IsNotEmpty()
  @IsDefined()
  @IsNumber()
  no: number;

  @IsNotEmpty()
  @IsDefined()
  @IsBoolean()
  status: boolean;
}
