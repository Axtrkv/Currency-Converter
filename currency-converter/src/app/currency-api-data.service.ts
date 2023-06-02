import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class CurrencyApiDataService {

  constructor(private http: HttpClient){ }

  getcurrencydata(country1: string){
    let url = 'http://api.exchangeratesapi.io/v1/latest?access_key=7838bdfbb098d333d17dd14baeb8f396&format=1&_gl=1*1nsxj5x*_ga*NzUxMzQxODM0LjE2ODU1Mzk3MDE.*_ga_HGV43FGGVM*MTY4NTU2MDA4NC40LjEuMTY4NTU2MDQ5OC41NC4wLjA.'
    return this.http.get(url)
  }
}
