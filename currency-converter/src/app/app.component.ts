import { Component } from '@angular/core';
import { CurrencyApiDataService } from './currency-api-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Converter';
  currjson: any = [];

  base = 'EUR';
  country1 = 'EUR'
  country2 = 'UAH';

  firstCurrnecy = 'EUR'
  secondCurrnecy = 'UAH'

  result: string | number = '1';
  amount: string | number = '1';

  FromInputValue: string | number = 1;
  ToInputValue: string | number= 1;

  USDheader:number = 0;
  EURheader:number = 0;

  From: string | number = '';
  To: string | number = ''; 

  FromField: 'From' | 'To' = "From"

  ngOnInit(): void {
    this.getCurrencyUSD();
    this.getCurrencyEUR();
  }

  changeBase(a: string){
    this.country1 = a;
  }

  changeToCountry(b: string) {
    this.country2 = b;
  }

  onFocus(name: 'From' | 'To'){
    this.FromField = name
  }

  constructor(private currencyAPI: CurrencyApiDataService){}

  // Header Currencys

  getCurrencyUSD(){
    this.currencyAPI.getcurrencydata(this.base).subscribe(data => {
      this.currjson = JSON.stringify(data)
      this.currjson = JSON.parse(this.currjson)
      
      this.USDheader = +(this.currjson.rates.UAH/this.currjson.rates.USD).toFixed(2)
    })
  }
  
  getCurrencyEUR(){
    this.currencyAPI.getcurrencydata(this.base).subscribe(data => {
      this.currjson = JSON.stringify(data)
      this.currjson = JSON.parse(this.currjson)
    
      this.EURheader = +(this.currjson.rates.EUR * this.currjson.rates.UAH).toFixed(2)
    })
  }

  applyConvert(currency: string, from: number) {
    this.result = (+from * +(this.currjson.rates[currency])).toFixed(2)
    this.amount = from
    
    // Double convertation (API Problem - "base" can`t be changed)


    // ------------------------------------------------------------------------------------------------------------
    // From 

    // EUR Works because of standart "base=EUR"


    if (this.FromField === 'From') {
      this.To = this.result

      this.ToInputValue = this.result
      this.FromInputValue = from

      this.firstCurrnecy = this.country1
      this.secondCurrnecy = this.country2

    // USD

    if (this.country1 == 'USD' && this.country2 == 'USD') {
      this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.USD) * from * +(this.currjson.rates.USD)).toFixed(2)
    } else if(this.country1 == 'USD' && this.country2 == 'UAH'){
      this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.USD) * from * +(this.currjson.rates.UAH)).toFixed(2)
    } else if (this.country1 == 'USD' && this.country2 == 'EUR'){
      this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.USD) * from * +(this.currjson.rates.EUR)).toFixed(2)
    } else if (this.country1 == 'USD' && this.country2 == 'GBP'){
      this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.USD) * from * +(this.currjson.rates.GBP)).toFixed(2)
    }

    // GBP

    if (this.country1 == 'GBP' && this.country2 == 'GBP') {
      this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.GBP) * from * +(this.currjson.rates.GBP)).toFixed(2)
    } else if(this.country1 == 'GBP' && this.country2 == 'UAH'){
      this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.GBP) * from * +(this.currjson.rates.UAH)).toFixed(2)
    } else if (this.country1 == 'GBP' && this.country2 == 'EUR'){
      this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.GBP) * from * +(this.currjson.rates.EUR)).toFixed(2)
    } else if (this.country1 == 'GBP' && this.country2 == 'USD'){
      this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.GBP) * from * +(this.currjson.rates.USD)).toFixed(2)
    }

    // UAH 

    if (this.country1 == 'UAH' && this.country2 == 'UAH') {
      this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.UAH) * from * +(this.currjson.rates.UAH)).toFixed(2)
    } else if (this.country1 == 'UAH' && this.country2 == 'USD'){
      this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.UAH) * from * +(this.currjson.rates.USD)).toFixed(2)
    } else if (this.country1 == 'UAH' && this.country2 == 'EUR'){
      this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.UAH) * from * +(this.currjson.rates.EUR)).toFixed(2)
    } else if (this.country1 == 'UAH' && this.country2 == 'GBP'){
      this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.UAH) * from * +(this.currjson.rates.GBP)).toFixed(2)
    }
    
    this.FromInputValue = '';
    } 

    // ------------------------------------------------------------------------------------------------------------
    // To

    else {
      this.From = this.result
    
      this.ToInputValue = from
      this.FromInputValue = this.result

      this.firstCurrnecy = this.country2
      this.secondCurrnecy = this.country1

      // USD

      if (this.country2 == 'USD' && this.country1 == 'USD') {
        this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.USD) * from * +(this.currjson.rates.USD)).toFixed(2)
      } else if(this.country2 == 'USD' && this.country1 == 'UAH'){
        this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.USD) * from * +(this.currjson.rates.UAH)).toFixed(2)
      } else if (this.country2 == 'USD' && this.country1 == 'EUR'){
        this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.USD) * from * +(this.currjson.rates.EUR)).toFixed(2)
      } else if (this.country2 == 'USD' && this.country1 == 'GBP'){
        this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.USD) * from * +(this.currjson.rates.GBP)).toFixed(2)
      }
  
      // GBP
  
      if (this.country2 == 'GBP' && this.country1 == 'GBP') {
        this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.GBP) * from * +(this.currjson.rates.GBP)).toFixed(2)
      } else if(this.country2 == 'GBP' && this.country1 == 'UAH'){
        this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.GBP) * from * +(this.currjson.rates.UAH)).toFixed(2)
      } else if (this.country2 == 'GBP' && this.country1 == 'EUR'){
        this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.GBP) * from * +(this.currjson.rates.EUR)).toFixed(2)
      } else if (this.country2 == 'GBP' && this.country1 == 'USD'){
        this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.GBP) * from * +(this.currjson.rates.USD)).toFixed(2)
      }
  
      // UAH 
  
      if (this.country2 == 'UAH' && this.country1 == 'UAH') {
        this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.UAH) * from * +(this.currjson.rates.UAH)).toFixed(2)
      } else if (this.country2 == 'UAH' && this.country1 == 'USD'){
        this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.UAH) * from * +(this.currjson.rates.USD)).toFixed(2)
      } else if (this.country2 == 'UAH' && this.country1 == 'EUR'){
        this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.UAH) * from * +(this.currjson.rates.EUR)).toFixed(2)
      } else if (this.country2 == 'UAH' && this.country1 == 'GBP'){
        this.result = (+(this.currjson.rates.EUR)/+(this.currjson.rates.UAH) * from * +(this.currjson.rates.GBP)).toFixed(2)
      }
      

      this.ToInputValue = '';
    }
    
    // Clear the inputs after convertation
    // this.ToInputValue = '';
    // this.FromInputValue = '';
  }

  // Result

  convert(value: number, to: number){
      const converterData = {
      from: this.FromField === 'From' ? value : to,
      toCurr: this.FromField === 'To' ? this.country1 : this.country2
    }

    this.currencyAPI.getcurrencydata(this.base).subscribe(data => {
      this.currjson = JSON.stringify(data)
      this.currjson = JSON.parse(this.currjson)
      
      this.applyConvert(converterData.toCurr, converterData.from)
    })
  }
}
