import { CryptoCurrency, FiatCurrency, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const default_user1 = await prisma.user.upsert({
    where: { email: 'test_1@gmail.com' },
    update: {},
    create: {
      email: 'test_1@gmail.com',
      cryptoCurrency: CryptoCurrency.XBT,
      cryptoBalance: 1.2,
      fiatCurrency: FiatCurrency.EUR,
    },
  });
  const default_user2 = await prisma.user.upsert({
    where: { email: 'test_2@gmail.com' },
    update: {},
    create: {
      email: 'test_2@gmail.com',
      cryptoCurrency: CryptoCurrency.BCH,
      cryptoBalance: 1.2,
      fiatCurrency: FiatCurrency.USD,
    },
  });
  console.log({ default_user1, default_user2 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
