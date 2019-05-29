import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CurrentWeatherComponent} from './current-weather.component';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    component.currentWeather = {
      weather: [
        {
          icon: 'ABC'
        }
      ],
      main: {
        temp: 200,
        temp_min: 200,
        temp_max: 200,
      }
    };
    fixture.detectChanges();
  });

  it ('Conversions(C anf F) buttons should call method covertTo(fahrenheit)', async (() => {
    spyOn(component, 'convertTo').withArgs('fahrenheit');

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.convertTo).toHaveBeenCalled();
    });
  }));
});
