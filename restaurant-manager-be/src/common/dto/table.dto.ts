import {
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

export class TableDto {
  @IsOptional()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsNumber()
  no: number;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
