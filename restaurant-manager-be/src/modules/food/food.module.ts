import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { Lau39DatabaseModule } from 'src/libs/database/connection/lau39';
import { CloudinaryModule } from 'src/libs/cloudinary/cloudinary.module';

@Module({
  imports: [Lau39DatabaseModule, CloudinaryModule],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
