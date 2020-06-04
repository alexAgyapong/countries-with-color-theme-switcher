import { Country } from './../shared/country';
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

  constructor(private countryService: CountryService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.code = this.route.snapshot.paramMap.get('code');
    if (this.code) {
      this.country$ = this.countryService.getCountry(this.code);
    }
  }

}
