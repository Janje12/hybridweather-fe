import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CityService } from '../../services/city.service';
import { City } from '../../type/city';

@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.css'],
})
export class CityInputComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

}
