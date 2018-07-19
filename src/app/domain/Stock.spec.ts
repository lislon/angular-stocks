import {MarketService} from '../market.service';
import {Stock} from './Stock';
import {discardPeriodicTasks, fakeAsync, tick} from '@angular/core/testing';

describe('Stock isolated test with MarketService spy', function () {
  let marketServiceSpy: MarketService;
  beforeEach(() => {
    marketServiceSpy = {
      addStock(symbol: string, company: string) {
      }, getPrice(symbol: string): number {
        return 0;
      }, getStocks(): Stock[] {
        return undefined;
      }, getUpdatedPrice(currentPrice: number): number {
        return 0;
      }
    };
    spyOn(marketServiceSpy, 'getPrice');
    spyOn(marketServiceSpy, 'getUpdatedPrice');
  });

  describe('with GOOG stock', () => {
    let stock: Stock;

    beforeEach(() => {
      stock = new Stock("GOOG", "Google", marketServiceSpy);
    });

    it('should call getPrice once on creation', function () {
      expect(marketServiceSpy.getPrice).toHaveBeenCalledTimes(1);
    });

    it('should call getPrice with GOOG symbol', function () {
      expect(marketServiceSpy.getPrice).toHaveBeenCalledWith('GOOG');
    });

  });
  it('should call getUpdatedPrice once in 1 second', fakeAsync(() => {
    let stock = new Stock("AAPL", "Apple", marketServiceSpy);
    tick(3001);
    expect(marketServiceSpy.getUpdatedPrice).toHaveBeenCalledTimes(3);
    discardPeriodicTasks();
  }));

})
