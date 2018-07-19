import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Stock} from '../../domain/Stock';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {MarketServiceImpl} from '../../market.service';
import {map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  @Output()
  stockSelect = new EventEmitter<Stock>();

  stockInput = new FormControl();
  filteredStocks: Observable<Stock[]>;
  stocks: Stock[];

  selected: Stock = null;

  constructor(private marketService: MarketServiceImpl) {
  }

  ngOnInit() {
    this.stocks = this.marketService.getStocks();
    this.filteredStocks = this.stockInput.valueChanges.pipe(
      startWith(''),
      map(val => val ? this.filter(val) : this.stocks.slice())
    );
    this.stockInput.valueChanges.pipe(
      startWith('')
    ).subscribe(symbol => {
      let stock = this.findStock(symbol);
      if (stock != null) {
        this.selected = stock;
        this.stockSelect.emit(stock);
      }
    });
  }

  findStock(symbol: string): Stock {
    return this.stocks.find(stock => symbol === stock.getSymbol());
  }

  filter(val: string): Stock[] {
    return this.stocks.filter(stock => new RegExp(`^${val}`, 'gi')
      .test(stock.getSymbol()));
  }

  clean() {
    this.stockInput.setValue('');
    this.selected = null;
  }
}
