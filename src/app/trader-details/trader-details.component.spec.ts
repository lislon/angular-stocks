import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderDetailsComponent } from './trader-details.component';
import {LocationStrategySpy} from '../testing/location.strategy.spy.spec';
import {LocationStrategy} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {MarketServiceSpy} from '../testing/MarketServiceSpy.spec';
import {MarketServiceImpl} from '../market.service';
import {TradersService} from '../traders.service';
import {StocksComponent} from './stocks/stocks.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule, MatOptionModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/typings/esm5/autocomplete';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRouteStub} from '../testing/router-stubs.spec';

describe('TraderDetailsComponent', () => {
  let component: TraderDetailsComponent;
  let fixture: ComponentFixture<TraderDetailsComponent>;
  const expectedTraderName = 'Oleg';
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatInputModule,
        MatAutocompleteModule,
        MatOptionModule,
        ReactiveFormsModule
      ],
      declarations: [TraderDetailsComponent, StocksComponent],
      providers: [
        TradersService,
        {provide: MarketServiceImpl, useClass: MarketServiceSpy},
        {provide: ActivatedRoute, useValue: activatedRoute},
        Location,
        {provide: LocationStrategy, useClass: LocationStrategySpy},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
