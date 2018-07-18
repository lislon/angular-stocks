import {Trade} from './Trade';
import {RoundUtil} from '../utils/RoundUtil';

export class Trader {
  private portfolio: Trade[];

  constructor(private name: string) {
    this.portfolio = [];
  }

  addToPortfolio(trade: Trade) {
    this.portfolio.push(trade);
  }

  getPortfolio(): Trade[] {
    return this.portfolio;
  }

  getName(): string {
    return this.name;
  }

  getOpenTrades(): Trade[] {
    return this.portfolio.filter(trade => trade.isOpen);
  }

  getClosedTrades(): Trade[] {
    return this.portfolio.filter(trade => !trade.isOpen);
  }

  getReleasedPnL(): number {
    let pnl = 0;
    for (let trade of this.portfolio) {
      pnl += trade.getReleasedPnL();
    }
    return RoundUtil.getRoundedNumber(pnl);
  }

  getUnreleasedPnL(): number {
    let pnl = 0;
    for (const trade of this.portfolio) {
      if (trade.isOpen) {
        pnl += trade.getUnreleasedPnL();
      }
    }

    return RoundUtil.getRoundedNumber(pnl);
  }

  getTotalPnL(): number {
    return RoundUtil.getRoundedNumber(this.getReleasedPnL() + this.getUnreleasedPnL());
  }
}
