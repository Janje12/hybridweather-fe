import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';
import { InputContainerComponent } from './components/input-container/input-container.component';
import { CountrySelectComponent } from './components/country-select/country-select.component';
import { CityInputComponent } from './components/city-input/city-input.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityComponent } from './components/city/city.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CityService } from './services/city.service';

@NgModule({
  declarations: [
    AppComponent,
    InputContainerComponent,
    CountrySelectComponent,
    CityInputComponent,
    CityListComponent,
    CityComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgSelectModule,
  ],
  providers: [CityService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
