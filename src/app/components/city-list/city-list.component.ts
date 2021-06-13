import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { City } from '../../type/city';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css'],
})
export class CityListComponent implements OnInit {
  @Input() cities$!: Observable<City[]>
  @Output() loading: EventEmitter<boolean> = new EventEmitter();
  cities: City[] = [];

  constructor(private weatherService: WeatherService) {
  }

  average: {} = {};
  showList: boolean = false;


  ngOnInit(): void {
    this.cities$.subscribe(t => {
      this.cities = t;
    });
  }

  getCity(id: number) {
    return this.cities.filter(x => x.id === id)[0];
  }

  async getWeatherData(data: any) {
    this.loading.emit(true);
    this.weatherService.getWeatherData(data).subscribe(u => {
      this.average = u;
      this.showList = true;
      this.loading.emit(false);
    });
  }

}
