import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { City } from '../../type/city';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css'],
})
export class InputContainerComponent implements OnInit {
  @Input() cities$!: Observable<City[]>
  @Output() sendSelection: EventEmitter<{ countryCode: string, cities: number[] }>
    = new EventEmitter<{ countryCode: string; cities: number[] }>()
  countries$!: Observable<string[]>;
  countries: string[] = [];

  flags: { icon: string, name: string }[] = [{
    name: 'NL',
    icon: 'nld',
  },
    {
      name: 'LV',
      icon: 'lva',
    },
    {
      name: 'RS',
      icon: 'srb',
    }];
  selectedCountry: string = '';
  selectedCities: number[] = [];
  showCities$!: Observable<City[]>;

  constructor() {
  }

  ngOnInit(): void {
    this.cities$.subscribe(city => {
      this.showCities$ = of(city);
      this.countries = city.map(c => {
        return c.country
      });
      this.countries$ = of(this.countries);
    })
  }

  updateCities() {
    if (this.selectedCountry === '')
      this.showCities$ = this.cities$;
    else
      this.cities$.subscribe(t => {
        this.showCities$ = of(t.filter(x => x.country === this.selectedCountry));
      })
  }

  search() {
    this.sendSelection.emit({countryCode: this.selectedCountry, cities: this.selectedCities})
  }

}
