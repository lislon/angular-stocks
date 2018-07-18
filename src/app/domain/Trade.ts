import {Stock} from './Stock';
import {RoundUtil} from '../utils/RoundUtil';

export class Trade {
  private mark: number;
  private last: number;
  private _isOpen: boolean;
  private closePrice: number;

  constructor(private stock: Stock, private count: number,
              priceToBuy: number) {
    this._isOpen = true;
    this.mark = priceToBuy;
  }

  getStockInfo(): string {
    return `${this.stock.getSymbol()} ${this.stock.getCompany()}`;
  }

  getMark(): number {
    return this.mark;
  }

  getStock(): Stock {
    return this.stock;
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  getCount(): number {
    return this.count;
  }

  getClosePrice(): number {
    return !this._isOpen ? this.closePrice : 0;
  }

  getUnreleasedPnL(): number {
    if (!this._isOpen) {
      return 0;
    }
    this.last = this.stock.getPrice();
    const tradePnL = (this.last - this.mark) * this.count;
    return RoundUtil.getRoundedNumber(tradePnL);
  }

  getReleasedPnL(): number {
    if (!this.closePrice) {
      return 0;
    }
    const tradePnL = (this.getClosePrice() - this.mark) * this.count;
    return RoundUtil.getRoundedNumber(tradePnL);
  }

  getPnL(): number {
    const tradePnL = (this.closePrice - this.mark) * this.count;
    return RoundUtil.getRoundedNumber(tradePnL);
  }

  close(price: number) {
    this._isOpen = false;
    this.closePrice = price;
  }
}
