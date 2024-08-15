import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

export class UpdateBillDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @IsArray()
  foods: Array<{ foodId: string; quantity: number; amount: number }>;
}
