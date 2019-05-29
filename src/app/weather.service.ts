import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = 'http://api.openweathermap.org/data/2.5/';
  apiKey = '&APPID=5846de606cf1d2b0123957cd5456f8ce';

  constructor(private http: HttpClient) { }

  getCurrentWeather(coords) {
    return this.http.get(this.url + `weather?lat=${coords.latitude}&lon=${coords.longitude}${this.apiKey}`);
  }

  getNextSixDaysWeather(coords: any) {
    return this.http.get(this.url + `forecast/daily?lat=${coords.latitude}&lon=${coords.longitude}${this.apiKey}&cnt=5`);
  }
}
