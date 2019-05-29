import {Component, OnInit} from '@angular/core';
import {WeatherService} from './weather.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isShowingDetails = false;
  weatherData: any;
  currentWeather: any;
  isLoading = false;
  showLocationError = false;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    (navigator as any).permissions.query({name: 'geolocation'}).then((permissionStatus) => {
        permissionStatus.onchange = () => {
          this.isShowingDetails = permissionStatus === 'granted';
          this.showLocationError = permissionStatus === 'denied';
        };
      });
  }

  requestWeatherData() {
    this.isLoading = true;

    navigator.geolocation.getCurrentPosition((position) => {
      const forecastRequest = this.weatherService.getNextSixDaysWeather(position.coords);
      const currentWeatherRequest = this.weatherService.getCurrentWeather(position.coords);

      forkJoin([forecastRequest, currentWeatherRequest]).subscribe((res: any) => {
        const [forecast, today] = res;
        const forecastResponse = forecast;
        const currentWeatherResponse = today;

        this.weatherData = forecastResponse.list;
        this.currentWeather = currentWeatherResponse;
        this.isShowingDetails = true;
        this.isLoading = false;
      });
    }, (er: any) => {
      this.isShowingDetails = false;
      this.isLoading = false;
      this.showLocationError = true;
      console.log('er: ', er);
    });
  }
}
