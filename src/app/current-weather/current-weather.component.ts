import {Component, Input, OnInit} from '@angular/core';
import {SiblingCommunicatorService} from '../sibling-communicator.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
  @Input() currentWeather: any;
  isFahrenheitSet = false;
  celsius: any;
  fahrenheit: any;

  constructor(private siblingCommunicatorService: SiblingCommunicatorService) { }

  ngOnInit() {
    this.celsius = {
      day: Number((this.currentWeather.main.temp) - 273.15),
      min: Number((this.currentWeather.main.temp_min) - 273.15),
      max: Number((this.currentWeather.main.temp_max) - 273.15)
    };

    this.fahrenheit = {
      day: Number((this.currentWeather.main.temp - 273.15) * (9 / 5) + 32),
      min: Number((this.currentWeather.main.temp_min - 273.15) * (9 / 5) + 32),
      max: Number((this.currentWeather.main.temp_max - 273.15) * (9 / 5) + 32)
    };
  }

  convertTo(type: string) {
    this.isFahrenheitSet = type === 'fahrenheit';
    this.siblingCommunicatorService.changeConversionType({isFahrenheit: this.isFahrenheitSet});
  }

}
