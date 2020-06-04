import { Country } from './country';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    let options = new HttpParams();
    options = options.append('codes', codes.join(';'));
    const url = `${this.baseUrl}/alpha`;

    return this.http.get<Country[]>(url, { params: options })
      .pipe(
        map((res) => {
          return res.map((country) => {
            return {
              code: country.alpha3Code,
              name: country.name
            };
          }
          );
        }), tap(data => console.log('border country names details', data)));
  }
}
