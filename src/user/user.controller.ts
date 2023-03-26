import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { User } from '@prisma/client';
import { NewUserRequestDto } from 'src/util/dto.entites';
import { formatResponse } from 'src/util/util';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getUserDetails(@Query('userId') userId: number) {
    return formatResponse(
      await this.userService.getUserProfile(userId),
      HttpStatus.CREATED,
      'The operation is successful',
    );
  }

  @Post('create')
  async createUser(
    @Body()
    userData: NewUserRequestDto,
  ) {
    return formatResponse(
      await this.userService.createUser(userData),
      HttpStatus.CREATED,
      'The operation is successful',
    );
  }
}
