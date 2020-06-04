import { Country, BorderCountry } from './../shared/country';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CountryService } from '../shared/country.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  code: string;
  country$ = new Observable<Country>();
  borderCountries: BorderCountry[] = [];
  country: Country;

  constructor(private countryService: CountryService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.code = params.get('code');
      if (this.code) {
        this.countryService.getCountry(this.code).subscribe(data => {
          if (data != null) {
            this.country = data;
            this.getBorderCountries(this.country.borders);
          }
        });
      }
    });
  }

  getBorderCountries(borders: string[]) {
    this.countryService.getBorderCountry(borders).subscribe(res => this.borderCountries = res);
  }

}
