import {TradersService} from './traders.service';
import {Trader} from './domain/Trader';
import ArrayContaining = jasmine.ArrayContaining;
import ObjectContaining = jasmine.ObjectContaining;
import Expected = jasmine.Expected;

describe('TradersService', () => {
  let service: TradersService;

  beforeEach(() => {
    service = new TradersService();
  });

  it('should be created', function () {
    expect(service).toBeTruthy();
  });

  it('should create mock traders', function () {
    expect(service.getTradersInstant).toBeDefined();
  });

  it('should create exactly 2 traders', function () {
    expect(service.getTradersInstant().length).toEqual(2);
  });

  it('should contains Oleg', function () {
    expect(service.getTradersInstant()).toContain(containsTrader('Oleg'));
  });

  it('should add a trader', function () {
    service.add('test');
    expect(service.getTradersInstant()).toContain(containsTrader('test'));
  });

  it('should return a getTrader promise instantly', function (done) {
    expect(service.getTrader('Oleg').then((_) => done()));
  }, 100);

  function containsTrader(name: string): ObjectContaining<Trader> {
    const trader = {
      name: name
    } as Partial<Trader>;
    return jasmine.objectContaining(trader);
  }
});
