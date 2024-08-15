import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGODB_CONNECTION_NAME } from '../constant/const';
import { IDataBaseService } from '../adapter';
import { DataBaseService } from '../service';
import { modelProviders } from '../mongo-db/model.provider';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://bao1709:bao17092002@cluster0.6uhfbvy.mongodb.net/lau39',
      {
        connectionName: MONGODB_CONNECTION_NAME.LAU39,
      },
    ),
  ],
  providers: [
    {
      provide: IDataBaseService,
      useClass: DataBaseService,
    },
    ...modelProviders,
  ],
  exports: [...modelProviders],
})
export class Lau39DatabaseModule {}
