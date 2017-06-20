import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherCenterComponent } from './weather-center.component';
import { WeatherService } from './weather.service';
import { WeatherRoutingModule } from './weather-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WeatherRoutingModule
  ],
  declarations: [
    WeatherCenterComponent
  ],
  providers: [
    WeatherService
  ]
})
export class WeatherModule { }
