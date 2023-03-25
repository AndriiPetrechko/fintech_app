import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { formatResponse } from 'src/util/util';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('details')
  getUserDetails() {
    return 'working';
  }

  @Post('create')
  async signupUser(
    @Body()
    userData: {
      email: string;
      cryptoBalance: number;
      fiatBalance: null;
    },
  ) {
    return formatResponse(
      await this.userService.createUser(userData),
      HttpStatus.CREATED,
      'The operation is successful',
    );
  }
}
