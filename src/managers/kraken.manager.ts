import { Injectable, Logger } from '@nestjs/common';
import * as WebSocket from 'ws';
import { KrakenSubscribtionReqDto } from 'src/util/dto.entites';
import { ExchangerateService } from 'src/exchangerate/exchangerate.service';

const KRAKEN_WS_URL = 'wss://ws.kraken.com';
const BTC_to_FIAT_CURRENCY = [
  'BTC/USD',
  'BTC/EUR',
  'BTC/CAD',
  'BTC/JPY',
  'BTC/GBP',
  'BTC/CHF',
  'BTC/AUD',
];
const BCH_to_FIAT_CURRENCY = [
  'BCH/USD',
  'BCH/EUR',
  'BCH/JPY',
  'BCH/GBP',
  'BCH/AUD',
];
const ETH_to_FIAT_CURRENCY = [
  'ETH/USD',
  'ETH/EUR',
  'ETH/CAD',
  'ETH/JPY',
  'ETH/GBP',
  'ETH/CHF',
  'ETH/AUD',
];

const PAIR_CRYPTO_FIAT_CURRENCY: Array<string> = [].concat(
  BTC_to_FIAT_CURRENCY,
  BCH_to_FIAT_CURRENCY,
  ETH_to_FIAT_CURRENCY,
);

@Injectable()
export class KrakenManager {
  private readonly logger = new Logger(KrakenManager.name);

  private ws = new WebSocket(KRAKEN_WS_URL);

  constructor(private exchangeRateService: ExchangerateService) {
    this.ws.on('open', () => {
      this.logger.log('Open Kraken Websockets connection');
      this.sendRequest({
        event: 'subscribe',
        pair: PAIR_CRYPTO_FIAT_CURRENCY,
        subscription: { name: 'ticker' },
      });
    });
    this.ws.on('close', () => {
      this.logger.log('Close Kraken Websockets connection');
    });

    this.ws.on('message', this.onMessage.bind(this));
  }

  sendRequest(data: KrakenSubscribtionReqDto) {
    this.ws.send(JSON.stringify(data));
  }

  async onMessage(data: WebSocket.RawData) {
    const res = JSON.parse(data.toString());
    /**
     * https://docs.kraken.com/websockets/#exampleapi
     * We get some data like this.
     *  [
     *    340,
     *      {
     *      a: [ '27455.00000', 4, '4.25573670' ],
     *      b: [ '27449.80000', 0, '0.24493524' ],
     *      c: [ '27449.80000', '0.10506476' ],
     *      v: [ '1007.62377117', '4745.26569116' ],
     *      p: [ '27517.59684', '27714.77029' ],
     *      t: [ 12572, 43114 ],
     *      l: [ '27336.90000', '27007.70000' ],
     *      h: [ '27685.00000', '28279.00000' ],
     *      o: [ '27491.10000', '28037.30000' ]
     *    },
     *    'ticker',
     *    'XBT/USD'
     *  ]
     * This looks like currency exchange rate for today )
     * o [today, last24Hours]	Open Price
     * We will use o[0] like crypto exchangeRate
     */

    if (!res.event) {
      //this.logger.log(`New crypto data: ${res[3]} => ${res[1].o[0]}`);
      const dbPair = await this.exchangeRateService.findCurrencyByPair(res[3]);
      if (!dbPair) {
        await this.exchangeRateService.createCurrency({
          pair: res[3],
          value: parseFloat(res[1].o[0]),
        });
      } else {
        await this.exchangeRateService.updateCurrency({
          pair: res[3],
          value: parseFloat(res[1].o[0]),
        });
      }
    }
  }

  closeConnection() {
    this.ws.close();
  }
}
