import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsString,
  IsOptional,
} from 'class-validator';
import { FOOD_STATUS } from 'src/libs/database/enum';

export class FoodDto {
  @IsOptional() // id không phải là bắt buộc khi tạo mới, có thể là bắt buộc khi cập nhật
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsString()
  foodName: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsEnum(FOOD_STATUS)
  status: FOOD_STATUS;
}
