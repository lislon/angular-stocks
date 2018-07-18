import {Component, OnInit, ViewChild} from '@angular/core';
import {Trader} from '../domain/Trader';
import {TradersService} from '../traders.service';
import {MarketServiceImpl} from '../market.service';
import {Trade} from '../domain/Trade';
import {FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Stock} from '../domain/Stock';
import {StocksComponent} from './stocks/stocks.component';

@Component({
  selector: 'app-trader-details',
  templateUrl: './trader-details.component.html',
  styleUrls: ['./trader-details.component.css']
})
export class TraderDetailsComponent implements OnInit {
  countInput = new FormControl();

  trader: Trader;
  selectedStock: Stock;

  @ViewChild(StocksComponent)
  private stocksComponent: StocksComponent;

  onStockSelect(stock: Stock) {
    this.selectedStock = stock;
  }

  constructor(private tradersService: TradersService,
              private marketService: MarketServiceImpl,
              private route: ActivatedRoute,
              private location: Location) {
    this.trader = new Trader('');
  }

  ngOnInit() {
    // this.route.paramMap
    //   .switchMap((params: ParamMap) =>
    //     this.tradersService.getTrader(params.get('name')))
    //   .subscribe((trader: Trader) => this.trader = trader);
    // core
    // this.route.s
    const name = this.route.snapshot.paramMap.get('name');
    this.tradersService.getTrader(name).then(trader => {
      this.trader = trader;
    });
  }

  goBack() {
    this.location.back();
  }

  closeTrade(trade: Trade) {
    this.marketService.sellStock(trade);
  }

  buyStock() {
    if (this.selectedStock == null) {
      window.alert('Please select the stock');
      return;
    }
    let trade: Trade =
      this.marketService.buyStock(this.selectedStock.getSymbol(),
        this.countInput.value);
    this.trader.addToPortfolio(trade);
    this.selectedStock = null;
    this.stocksComponent.clean();
  }
}
