import {TestBed, inject} from '@angular/core/testing';

import {MarketService, MarketServiceImpl} from './market.service';
import {HttpClientModule} from '@angular/common/http';

describe('MarketServiceImpl', () => {
  let service: MarketServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MarketServiceImpl]
    });
    service = TestBed.get(MarketServiceImpl);
  });

  it('should be created', inject([MarketServiceImpl], (service: MarketService) => {
    expect(service).toBeTruthy();
  }));

  it('should contains 30 stocks', function (done) {
    inject([HttpClientModule], (http: HttpClientModule) => {
      setTimeout(function () {
        expect(service.getStocks().length).toEqual(30);
        done();
      }, 1000);
    })();
  });
})
;
