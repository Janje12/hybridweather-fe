import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { City } from '../type/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/cities';
  }

  public getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl);
  }
}
