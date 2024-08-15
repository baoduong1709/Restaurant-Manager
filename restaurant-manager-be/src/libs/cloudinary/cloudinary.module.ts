import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryProcessor } from './cloudinary.processor';
import { Lau39DatabaseModule } from '../database/connection/lau39';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    Lau39DatabaseModule,
    BullModule.registerQueue({
      name: 'cloudinary-queue',
    }),
  ],
  providers: [CloudinaryService, CloudinaryProcessor],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
