import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherCenterComponent } from './weather-center.component';
const weatherRoutes: Routes = [
  {
    path: 'center',
    component: WeatherCenterComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(weatherRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WeatherRoutingModule { }
