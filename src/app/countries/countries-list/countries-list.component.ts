import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CountryService } from './../shared/country.service';
import { Categories, CategoriesEnum } from './../shared/category';
import { Country } from '../shared/country';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent implements OnInit {
  countryFinderForm: FormGroup;
  categories = CategoriesEnum;
  countries$ = new Observable<Country[]>();
  keys = Object.keys;

  constructor(private fb: FormBuilder, private countryService: CountryService, private storage: StorageMap) { }

  ngOnInit() {
    this.countryFinderForm = this.fb.group({
      searchTerm: [''],
      category: ['0']
    });


    this.storage.get('countries').subscribe((res: Country[]) => {
      if (res && res.length) {
        console.log('countries', res);
        this.countries$ = of(res);
      } else {
        this.getAllCountries();
      }
    });

    this.countryFinderForm.valueChanges.subscribe(data => {
      if (data && data.searchTerm) {
        this.searchCountryByName(data.searchTerm);
      }

      if (data && data.category) {
        console.log('data', data.category);
        if (data.category !== '0') {
          this.filterCountriesByRegion(data.category);
        }
      }

    });
  }

  getAllCountries() {
    this.countries$ = this.countryService.getCountries();
  }

  searchCountryByName(name: string) {
    this.countries$ = this.countryService.getCountryByName(name);
  }

  filterCountriesByRegion(region: string) {
    this.countries$ = this.countryService.getCountriesByRegion(region);
    // if (region !== '0') {
    //   this.countries$ = this.countryService.getCountriesByRegion(region);
    // }
    // else {
    //   this.getAllCountries();
    // }
  }


}
