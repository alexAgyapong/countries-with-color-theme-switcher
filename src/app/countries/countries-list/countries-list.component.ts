import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CountryService } from './../shared/country.service';
import { Categories } from './../shared/category';
import { CategoriesEnum } from '../shared/category';
import { Country } from '../shared/country';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})
export class CountriesListComponent implements OnInit {
  countryFinderForm: FormGroup;
  categories = Categories;
  countries$ = new Observable<Country[]>();

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
        this.countries$ = this.countryService.getCountries();
      }
    });

  }

}
