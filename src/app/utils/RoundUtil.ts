export class RoundUtil {
  static getRoundedNumber(pnl: number): number {
    return Math.round(pnl * 100 + Number.EPSILON) / 100;
  }
}
