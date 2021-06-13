import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { City } from '../type/city';
import { WeatherData } from '../type/WeatherData';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/weather';
  }

  public getWeatherData(params: any): Observable<any> {
    let queryString = params.cities.length > 0 ? 'cities=' + params.cities.join(',') + '&' : '';
    queryString += 'from=' + params.from + '&to=' + params.to;
    console.log(queryString)
    return this.http.get<any>(this.apiUrl + '/average?' + queryString);
  }
}
