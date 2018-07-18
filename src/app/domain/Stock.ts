export class Stock
{
  constructor(private symbol: string, private company: string) { }
  getSymbol(): string
  {
    return this.symbol;
  }
  getCompany(): string
  {
    return this.company;
  }
  getPrice(): number
  {
    return 0;
  }
}
