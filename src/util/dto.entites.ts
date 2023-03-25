export class KrakenSubscribtionReqDto {
  event?: string;
  pair?: string[];
  subscription: { name: string };
}
