import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {SiblingCommunicatorService} from '../sibling-communicator.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-days-weather',
  templateUrl: './days-weather.component.html',
  styleUrls: ['./days-weather.component.scss']
})
export class DaysWeatherComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() nextFiveDays = [];
  isFahrenheitSet = false;
  destroy$ = new Subject();

  constructor(private siblingCommunicatorService: SiblingCommunicatorService) { }

  ngOnInit() {
    let now = moment(new Date());

    this.nextFiveDays = this.nextFiveDays.map((day: any) => {
      const nextDay = moment(now).add(1, 'days');
      now = nextDay;

      return {
        ...day,
        day: nextDay.format('ddd'),
        celsius: {
          min: Number((day.temp.min) - 273.15),
          max: Number((day.temp.max) - 273.15)
        },
        fahrenheit: {
          min: Number((day.temp.min - 273.15) * (9 / 5) + 32),
          max: Number((day.temp.max - 273.15) * (9 / 5) + 32)
        }
      };
    });
  }

  ngAfterViewInit() {
    this.siblingCommunicatorService.changeConversionSubject.pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      this.isFahrenheitSet = res.isFahrenheit || false;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
