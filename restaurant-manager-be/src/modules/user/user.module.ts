import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Lau39DatabaseModule } from 'src/libs/database/connection/lau39';

@Module({
  imports: [Lau39DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
