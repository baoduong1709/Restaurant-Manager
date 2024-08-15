import { Module } from '@nestjs/common';
import { CoreModule } from './modules/core.module';
import { FoodModule } from './modules/food/food.module';
import { TableModule } from './modules/table/table.module';
import { Lau39DatabaseModule } from './libs/database/connection/lau39';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { CloudinaryModule } from './libs/cloudinary/cloudinary.module';

@Module({
  imports: [
    CoreModule,
    FoodModule,
    TableModule,
    Lau39DatabaseModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CloudinaryModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: +configService.get('REDIS_PORT'),
          ttl: configService.get('CACHE_TTL'),
        },
      }),
    }),
  ],
})
export class AppModule {}
