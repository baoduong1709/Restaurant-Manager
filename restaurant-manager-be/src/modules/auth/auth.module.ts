import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Lau39DatabaseModule } from 'src/libs/database/connection/lau39';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    Lau39DatabaseModule,
    JwtModule.register({
      secret: 'SECRET_KEY',
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
