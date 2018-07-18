import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  stocks: Stock[];
  ngOnInit()
  {
    this.stocks = this.getMockStocks();
  }
  private getMockStocks(): Stock[]
  {
    let stocks: Stock[] = [];
    stocks.push(new Stock('BA', 'Boeing'));
    stocks.push(new Stock('CAT', 'Caterpillar'));
    stocks.push(new Stock('KO', 'Coca-Cola'));
    return stocks;
  }
}
