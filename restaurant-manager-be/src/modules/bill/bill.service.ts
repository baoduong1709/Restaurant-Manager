import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { MODELS } from 'src/libs/database/enum';
import { Model } from 'mongoose';
import { BillDocument } from 'src/libs/database/schemas/bill.schema';
import { FoodDocument } from 'src/libs/database/schemas/food.shema';
import { TableDocument } from 'src/libs/database/schemas/table.schema';

@Injectable()
export class BillService {
  private readonly logger = new Logger(BillService.name);

  constructor(
    @Inject(MODELS.BILL_MODEL) private billModel: Model<BillDocument>,
    @Inject(MODELS.FOOD_MODEL) private foodModel: Model<FoodDocument>,
    @Inject(MODELS.TABLE_MODEL) private tableModel: Model<TableDocument>,
  ) {}

  async create(createBillDto: CreateBillDto) {
    const { foods, tableId } = createBillDto;

    if (!foods || !tableId) {
      throw new BadRequestException(
        'Missing required fields in createBillDto.',
      );
    }

    try {
      const mergeFoodData = (orders, details) => {
        const foodDetailsMap = new Map();
        details.forEach((detail) =>
          foodDetailsMap.set(detail._id.toString(), detail),
        );

        return orders.map((order) => {
          const foodDetail = foodDetailsMap.get(order.foodId);
          return {
            ...order,
            food: foodDetail,
            quantity: order.quantity,
          };
        });
      };

      const foodPromises = foods.map(({ foodId }) =>
        this.foodModel.findById(foodId).exec(),
      );
      const foodsData = await Promise.all(foodPromises);

      if (foodsData.some((food) => !food)) {
        throw new NotFoundException('Một hoặc nhiều Food không tồn tại.');
      }

      const mergedData = mergeFoodData(foods, foodsData);

      const table = await this.tableModel.findById(tableId).exec();

      if (!table) {
        throw new NotFoundException('Table không tồn tại.');
      }

      const createdBill = new this.billModel({
        foods: mergedData,
        table,
        status: 'paid',
      });

      await this.tableModel.findByIdAndUpdate(tableId, {
        status: true,
        billId: createdBill._id,
      });

      console.log(createdBill);

      return createdBill.save();
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.billModel.find().exec();
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const bill = await this.billModel.findById(id).exec();
      if (!bill) {
        throw new NotFoundException(`Bill with id ${id} not found`);
      }
      return bill;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async update(id: string, updateBillDto: UpdateBillDto) {
    try {
      const { foods } = updateBillDto;

      console.log(updateBillDto);

      if (!foods || foods.length === 0) {
        throw new BadRequestException('Foods data is required.');
      }

      const mergeFoodData = (
        existingFoods: any[],
        newFoods: any[],
        details: any[],
      ) => {
        const foodDetailsMap = new Map();
        details.forEach((detail) =>
          foodDetailsMap.set(detail._id.toString(), detail),
        );

        const existingFoodMap = new Map();
        existingFoods.forEach((item) =>
          existingFoodMap.set(item.food._id.toString(), item),
        );

        newFoods.forEach((order) => {
          const existingFood = existingFoodMap.get(order.foodId);
          const foodDetail = foodDetailsMap.get(order.foodId);

          if (existingFood) {
            existingFood.quantity += order.quantity;
          } else {
            existingFoodMap.set(order.foodId, {
              food: foodDetail,
              quantity: order.quantity,
            });
          }
        });

        return Array.from(existingFoodMap.values());
      };

      const foodPromises = foods.map(({ foodId }) =>
        this.foodModel.findById(foodId).exec(),
      );
      const foodsData = await Promise.all(foodPromises);

      if (foodsData.some((food) => !food)) {
        throw new NotFoundException('Một hoặc nhiều Food không tồn tại.');
      }

      const existingBill = await this.billModel.findById(id).exec();

      console.log(existingBill);
      if (!existingBill) {
        throw new NotFoundException(`Bill with id ${id} not found`);
      }

      const updatedFoods = mergeFoodData(existingBill.foods, foods, foodsData);
      console.log(updatedFoods);

      const updatedBill = await this.billModel
        .findByIdAndUpdate(id, { $set: { foods: updatedFoods } }, { new: true })
        .exec();

      return updatedBill;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const result = await this.billModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`Bill with id ${id} not found`);
      }
      return result;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }

  async pay(id: string) {
    try {
      const bill = await this.billModel.findById(id);
      await this.tableModel.findByIdAndUpdate(bill.table._id, {
        status: false,
        billId: '',
      });
      return await this.billModel.findByIdAndUpdate(id, { status: 'paid' });
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw error;
    }
  }
}
