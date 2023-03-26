import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { ExchangeService } from 'src/exchange/exchange.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewUserRequestDto } from 'src/util/dto.entites';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private prisma: PrismaService,
    private exchangeService: ExchangeService,
  ) {}

  async createUser(input: NewUserRequestDto): Promise<User> {
    if (!input.email || !input.cryptoCurrency) {
      throw new HttpException(
        'Email address and crypto symbol is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser: Partial<User> = { ...input };
    if (input.cryptoCurrency && input.cryptoBalance && input.fiatCurrency) {
      const rate = await this.exchangeService.getCryptoAssetRate(
        `${input.cryptoCurrency}/${input.fiatCurrency}`,
      );
      newUser.fiatBalance = input.cryptoBalance * rate[0].value;
    }
    return this.prisma.user.create({
      data: newUser as User,
    });
  }

  async getUserProfile(userId: number): Promise<User> {
    if (!userId) {
      throw new HttpException(
        'User ID is required! User is not found',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.prisma.user.findUnique({ where: { id: Number(userId) } });
    if (!user) {
      throw new HttpException('User is not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
