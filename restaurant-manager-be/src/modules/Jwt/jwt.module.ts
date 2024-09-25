import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    PassportModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKeyHere',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
