import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class CloudinaryService {
  constructor(
    @InjectQueue('cloudinary-queue') private cloudinaryQueue: Queue,
  ) {}

  async uploadImage(file: Express.Multer.File, _id: string) {
    const fileBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    await this.cloudinaryQueue.add(
      'upload-image',
      {
        fileBase64,
        foodId: _id,
      },
      {
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
  }
}
