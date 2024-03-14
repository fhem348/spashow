import { UserInfo } from 'src/utils/userInfo.decorator';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() loginDto: LoginDto) {
    return await this.userService.register(loginDto.email, loginDto.password);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('email')
  getEmail(@UserInfo() user: User) {
    return { email: user.email };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('reservations')
  async findReservations(@UserInfo() user: User): Promise<Reservation[]> {
    return await this.userService.findReservations(user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('posts')
  async findPostsByAdmin(@UserInfo() user: User): Promise<Post[]> {
    return await this.userService.findPostsByAdmin(user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateUser(
    @Param('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
    @UserInfo() user: User,
  ) {
    if (user.id !== userId) {
      throw new UnauthorizedException('본인만 정보를 수정할 수 있습니다.');
    }
    await this.userService.updateUser(userId, updateUserDto);
  }
}
