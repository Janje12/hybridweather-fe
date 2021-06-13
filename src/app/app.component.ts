import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityService } from './services/city.service';
import { WeatherService } from './services/weather.service';
import { City } from './type/city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('cityList') cityList!: CityListComponent;

  cities$!: Observable<City[]>;

  from: Date = new Date();
  to: Date;
  minDate: string = '';
  maxDate: string = '';
  triggerAnimation: boolean = false;
  // #173383 COLD
  // #90D8FF MILD
  // #FF9354 HOT
  hot: string = 'rgb(255, 147, 84,1)';
  mildhot: string = '#EFD782';
  mild: string = 'rgb(144, 216, 255, 1)';
  mildcold: string = '#1CA3EE';
  cold: string = '#173383';
  style: string;
  dataIsLoading: boolean = false;

  constructor(private cityService: CityService, private weatherService: WeatherService) {
    this.style = this.mild;
    this.to = new Date();
    this.to.setDate(this.from.getDate() + 5);
    this.maxDate = this.to.toISOString().slice(0, 10).replace(' ', '-');
    this.minDate = this.from.toISOString().slice(0, 10).replace(' ', '-');
    console.log(this.maxDate);
  }

  getStyle() {
    return 'linear-gradient(153deg, rgb(171, 222, 231, 1) 0%, ' + this.style + ' 175%)';
  }

  ngOnInit(): void {
    this.cities$ = this.cityService.getCities();
  }

  private setStyle(avg: number) {
    if (avg > 20)
      this.style = this.hot;
    else if (avg > 0 && avg <= 20)
      this.style = this.mildhot;
    else if (avg > -20 && avg <= 0)
      this.style = this.mildcold
    else if (avg < -20)
      this.style = this.cold;
    else
      this.style = this.mild;
  }

  async getSelection(data: any) {
    data['from'] = this.from instanceof Date ? this.from.toISOString().substr(0, 19) : this.from + 'T00:00:00';
    data['to'] = this.to instanceof Date ? this.to.toISOString().substr(0, 19) : this.to + 'T00:00:00';
    this.triggerAnimation = true;
    let avg = 0.0;
    await this.weatherService.getWeatherData(data).subscribe(u => {
      for (let k of Object.keys(u)) {
        avg += Number(k);
      }
      avg /= Object.keys(u).length;
      console.log(avg);
      this.setStyle(avg);
    });
    await this.cityList.getWeatherData(data);
  }

  setLoading(loading: boolean) {
    this.dataIsLoading = loading;
  }

}
