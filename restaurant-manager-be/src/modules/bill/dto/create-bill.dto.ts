import { IsNotEmpty, ValidateNested, IsArray } from 'class-validator';

export class CreateBillDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  foods: Array<{ foodId: string; quantity: number; amount: number }>;

  @IsNotEmpty()
  tableId: string;
}
