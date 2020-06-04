import { Country } from './country';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { StorageMap } from '@ngx-pwa/local-storage';


@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private baseUrl = 'https://restcountries.eu/rest/v2';

  constructor(private http: HttpClient, private storage: StorageMap) { }

  getCountries(): Observable<Country[]> {
    const url = `${this.baseUrl}/all`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => console.log('result', data)),
        tap(res => this.storage.set('countries', res).subscribe())
      );
  }

  getCountry(code: string): Observable<Country> {
    const url = `${this.baseUrl}/alpha/${code}`;
    return this.http.get<any>(url)
      .pipe(
        tap(data => console.log('country details', data))
      );
  }
  getBorderCountry(codes: string[]): Observable<any[]> {
    console.log('codes', codes);
    const url = `${this.baseUrl}/alpha?codes=${codes[0]};${codes[1]};${codes[2]}`;
    return this.http.get<Country[]>(url)
      .pipe(
        map((res) => {
          return res.map((country) => {
            return {
              code: country.alpha3Code,
              name: country.name
            }
          }
          );
        }), tap(data => console.log('border country names details', data)));
  }
}