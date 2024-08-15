import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateFoodDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  foodName: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  price: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  status: string;
}
