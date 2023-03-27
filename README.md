# Test task for NodeJS Developer

## Environment example

```
PORT=

# Database
DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_NAME=
DATABASE_URL=`postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/fintech_db`

# Redis
REDIS_HOST=
REDIS_PORT=
REDIS_URL=`redis://${REDIS_HOST}:${REDIS_HOST}`
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## API

### 1. Exchange

- GET /api/exchange/get_currency

Query params: ?crypto_symbol=XBT

Example success response:

```{
    "statusCode": 200,
    "message": "The operation is successful",
    "data": [
        {
            "updatedAt": "2023-03-27T04:56:17.578Z",
            "pair": "XBT/EUR",
            "value": 25971
        },
        {
            "updatedAt": "2023-03-27T04:56:17.578Z",
            "pair": "XBT/GBP",
            "value": 22876
        },
        {
            "updatedAt": "2023-03-27T04:56:17.578Z",
            "pair": "XBT/CAD",
            "value": 38211.6
        },
        {
            "updatedAt": "2023-03-27T04:56:17.578Z",
            "pair": "XBT/JPY",
            "value": 3666666
        },
        {
            "updatedAt": "2023-03-27T04:56:17.579Z",
            "pair": "XBT/CHF",
            "value": 25778.5
        },
        {
            "updatedAt": "2023-03-27T04:56:17.579Z",
            "pair": "XBT/AUD",
            "value": 42109.5
        },
        {
            "updatedAt": "2023-03-27T04:56:20.926Z",
            "pair": "XBT/USD",
            "value": 27998.3
        }
    ]
}
```

Example response for bad request:

```
{
    "statusCode": 400,
    "message": "Invalid crypto symbol"
}
```

- GET /api/exchange/get_rate

Query params: ?pair=XBT/USD, XBT/EUR

Example response:

```
{
    "statusCode": 200,
    "message": "The operation is successful",
    "data": [
        {
            "updatedAt": "2023-03-27T05:02:50.392Z",
            "pair": "XBT/EUR",
            "value": 25971
        },
        {
            "updatedAt": "2023-03-27T05:02:52.669Z",
            "pair": "XBT/USD",
            "value": 27998.3
        }
    ]
}
```

## 2. User

- POST /api/user/create
  Request body:

```
{
    email: string;
    cryptoCurrency: CryptoCurrency;
    cryptoBalance: number;
    fiatCurrency: FiatCurrency;
}
```

Example CryptoCurrency and FiatCurrency:

```
enum CryptoCurrency {
  XBT
  BCH
  ETH
}

enum FiatCurrency {
  USD
  EUR
  CAD
  JPY
  GBP
  CHF
  AUD
}
```

Example response:

```
{
    "statusCode": 201,
    "message": "The operation is successful",
    "data": {
        "id": 5,
        "email": "jon_doe@gmail.com",
        "createdAt": "2023-03-27T08:56:12.721Z",
        "updatedAt": "2023-03-27T08:59:35.037Z",
        "cryptoCurrency": "XBT",
        "cryptoBalance": 1.2,
        "fiatCurrency": "EUR",
        "fiatBalance": 30684.12
    }
}
```

- GET /api/user/profile

Query params: ?userId=1

Example success response:

```
{
    "statusCode": 201,
    "message": "The operation is successful",
    "data": {
        "id": 1,
        "email": "test_1@gmail.com",
        "createdAt": "2023-03-26T18:56:12.721Z",
        "updatedAt": "2023-03-26T18:59:35.037Z",
        "cryptoCurrency": "XBT",
        "cryptoBalance": 1.2,
        "fiatCurrency": "EUR",
        "fiatBalance": 30684.12
    }
}
```
