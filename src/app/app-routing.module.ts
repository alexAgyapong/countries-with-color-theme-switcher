import { CountryDetailsComponent } from './countries/country-details/country-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountriesListComponent } from './countries/countries-list/countries-list.component';


const routes: Routes = [
  { path: '', component: CountriesListComponent },
  { path: 'detail/:code', component: CountryDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
