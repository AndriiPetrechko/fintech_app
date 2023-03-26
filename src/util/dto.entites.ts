import { CryptoCurrency, FiatCurrency } from '@prisma/client';

export class KrakenSubscribtionReqDto {
  event?: string;
  pair?: string[];
  subscription: { name: string };
}

export class RateResponseDto {
  updatedAt: Date;
  pair: string;
  value: number;
}

export class NewUserRequestDto {
  email!: string;
  cryptoCurrency!: CryptoCurrency;
  cryptoBalance: number = 0;
  fiatCurrency!: FiatCurrency;
}
