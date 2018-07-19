import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StocksComponent} from './stocks.component';
import {MarketServiceSpy} from '../../testing/MarketServiceSpy.spec';
import {MarketServiceImpl} from '../../market.service';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule, MatInputModule, MatOptionModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DebugElement} from '@angular/core';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StocksComponent],
      providers: [{
        provide: MarketServiceImpl,
        useClass: MarketServiceSpy
      }],
      imports: [
        BrowserAnimationsModule,
        MatInputModule,
        MatAutocompleteModule,
        MatOptionModule,
        ReactiveFormsModule
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain stockInput', function () {
    let element = fixture.debugElement.query(
      (de: DebugElement) => de.attributes['id'] === 'stockInput'
    );
    expect(element).not.toBeNull();
  });

  it('should filter according to existing filter', function () {
    const debugElement = fixture.debugElement.query(
      (de: DebugElement) => de.attributes['id'] === 'stockInput'
    );

    const filter = 'M';
    debugElement.nativeElement.value = filter;

    fixture.detectChanges();

    let mmm = null;
    component.filteredStocks.subscribe(
      stocks => mmm = stocks.find(stock => stock.getSymbol() === 'MMM')
    );

    expect(mmm).not.toBeNull();
  });

  it('should selected field become null if filter returns 0 stocks', function () {
    const debugElement = fixture.debugElement.query(
      (de: DebugElement) => de.attributes['id'] === 'stockInput'
    );

    const filter = 'non-existing';
    debugElement.nativeElement.value = filter;

    fixture.detectChanges();

    expect(component.selected).toBeNull();
  });

});
