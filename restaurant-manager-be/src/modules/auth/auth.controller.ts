import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    return this.authService.register(username, password);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const user = await this.authService.validateUser(username, password);
    if (user) {
      return this.authService.login(user);
    }
    throw new Error('Invalid credentials');
  }
}
