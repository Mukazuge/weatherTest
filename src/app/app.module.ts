import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { DaysWeatherComponent } from './days-weather/days-weather.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import {MomentModule} from 'ngx-moment';

@NgModule({
  declarations: [
    AppComponent,
    DaysWeatherComponent,
    CurrentWeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
