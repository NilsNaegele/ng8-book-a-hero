import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public user = new BehaviorSubject(null);
  public admin = new BehaviorSubject(null);
  public cart = new BehaviorSubject({});
  public order = new BehaviorSubject({});
  public searchTerm = new BehaviorSubject('');

  public countries = [
    { name: 'Germany', abbreviation: 'DE'},
    { name: 'France', abbreviation: 'FR'},
    { name: 'England', abbreviation: 'EN'},
    { name: 'Italy', abbreviation: 'IT'},
    { name: 'Spain', abbreviation: 'SP'},
    { name: 'Belgium', abbreviation: 'BE'},
    { name: 'Holland', abbreviation: 'NL'},
    { name: 'USA', abbreviation: 'US'},
    { name: 'Brazil', abbreviation: 'BR'},
    { name: 'Australia', abbreviation: 'AU'},
    { name: 'Japan', abbreviation: 'JA'},
    { name: 'Florida', abbreviation: 'FL'},
    { name: 'South Africa', abbreviation: 'SA'},
    { name: 'Singapore', abbreviation: 'SI'},
    { name: 'Switzerland', abbreviation: 'SW'},
    { name: 'Monaco', abbreviation: 'MO'},
    { name: 'Ireland', abbreviation: 'IR'},
    { name: 'Scottland', abbreviation: 'SO'},
    { name: 'Poland', abbreviation: 'PO'},
    { name: 'Russia', abbreviation: 'RU'},
    { name: 'Czech Republic', abbreviation: 'CR'},
    { name: 'New Zealand', abbreviation: 'NZ'},
    { name: 'Argentina', abbreviation: 'AR'},
    { name: 'China', abbreviation: 'CH'},
    { name: 'Phillipines', abbreviation: 'PI'},
    { name: 'Mexico', abbreviation: 'ME'},
    { name: 'Israel', abbreviation: 'IR'},
    { name: 'Tanzania', abbreviation: 'TA'},
  ];

  public orderStatuses = [
    { id: 'SUBMITTED'},
    { id: 'PAID'},
    { id: 'SHIPPED'},
    { id: 'DELIVERED'},
    { id: 'EXCEPTION'},
  ];

  public slugify(text: string) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  public hashCode(input: string): number {
    let hash = 0;
    if (input.length === 0) {
      return hash;
    }
    for (let i = 0; i < input.length; i++) {
      const chr = input.charCodeAt(i);
      // tslint:disable-next-line: no-bitwise
      hash  = ((hash << 5) - hash) + chr;
      // tslint:disable-next-line: no-bitwise
      hash |= 0;
    }
    return hash;
  }
}
