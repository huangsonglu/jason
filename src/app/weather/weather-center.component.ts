// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, forwardRef, Injector } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Hero, WeatherService } from './weather.service';
import { AppState } from './../app.service';
import { MainComponent } from './../main/main.component';

declare var $;
@Component({
  templateUrl: 'weather-center.component.html',
  styleUrls: [
    './weather.component.css'
  ]
})
export class WeatherCenterComponent implements OnInit {
  public homeControl: MainComponent;
  public currentLocation;
  constructor(
    private service: WeatherService,
    private route: ActivatedRoute,
    private router: Router,
    public appState: AppState,
    public injector: Injector
  ) {
    this.currentLocation = appState.getCurrentLocation();
    try {
      this.homeControl = this.injector.get(forwardRef(() => MainComponent));
      this.homeControl.registerOnMenuclick(() => {

      })
      this.homeControl.registerOnLocationChanged((location) => {
        console.log(location);
        this.currentLocation = location;
      })
    } catch (error) {

    }
  }
  ngOnInit() {}

}
