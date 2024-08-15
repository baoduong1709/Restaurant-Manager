import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
// import { UpdateFoodDto } from './dto/update-food.dto';
import { MODELS } from 'src/libs/database/enum';
import { Model } from 'mongoose';
import { FoodDocument } from 'src/libs/database/schemas/food.shema';
import { CloudinaryService } from 'src/libs/cloudinary/cloudinary.service';

@Injectable()
export class FoodService {
  private readonly logger = new Logger(FoodService.name);
  constructor(
    @Inject(MODELS.FOOD_MODEL) private foodModel: Model<FoodDocument>,
    private cloudinaryService: CloudinaryService,
  ) {}
  async create(createFoodDto: CreateFoodDto, file: Express.Multer.File) {
    try {
      const foodData = {
        foodName: createFoodDto.foodName,
        price: createFoodDto.price,
        category: createFoodDto.category,
        status: createFoodDto.status,
      };

      const food = await this.foodModel.create(foodData);

      this.cloudinaryService.uploadImage(file, food._id.toString());

      return food;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this.foodModel.find().exec();
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} food`;
  }

  // update(id: number, updateFoodDto: UpdateFoodDto) {
  //   return `This action updates a #${id} food`;
  // }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
