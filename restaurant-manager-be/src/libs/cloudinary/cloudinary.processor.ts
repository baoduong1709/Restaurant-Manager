import { Job } from 'bull';
import { v2 as cloudinary } from 'cloudinary';
import { Process, Processor } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Inject, Logger } from '@nestjs/common';
import { MODELS } from '../database/enum';
import { Model } from 'mongoose';
import { FoodDocument } from '../database/schemas/food.shema';

@Processor('cloudinary-queue')
export class CloudinaryProcessor {
  private readonly logger = new Logger(CloudinaryProcessor.name);
  constructor(
    private readonly configService: ConfigService,
    @Inject(MODELS.FOOD_MODEL) private foodModel: Model<FoodDocument>,
  ) {
    this.setupCloudinary();
  }

  private setupCloudinary() {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  @Process('upload-image')
  async handleUploadImage(job: Job) {
    try {
      const { fileBase64, foodId } = job.data;
      const result = await cloudinary.uploader.upload(fileBase64, {
        folder: 'lau39',
      });

      await this.foodModel.findByIdAndUpdate(foodId, {
        imageUrl: result.secure_url,
      });

      this.logger.log('Upload image successfully');
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
