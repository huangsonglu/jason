import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AdminLteService } from './../admin-lte/admin-lte.services';
import { AppState } from './../../app.service'

declare var $: any;
@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  private adminLte: any;
  private index: any;
  public locations = [];
  @Output() public onMenuClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() public onLocationChanged: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    public adminLteService: AdminLteService
    , public app: AppState) {
    this.adminLte = this.adminLteService.getAdminLte();
    // this is aconstructor
    this.index = 1;
    this.locations = this.app.getLocations();
  }

  public ngOnInit() {
    // to do sth.
  }

  public sidebarToggleClick(event) {
    event.stopPropagation();
    this.adminLteService.onSidebarToggleEvent();
    this.onMenuClick.emit();
  }

  public onControlSidebarClick(event) {
    event.stopPropagation();
    this.adminLteService.onControlSidebarToggleEvent();
  }

  public changeLocation(location) {
    for (let index = 0; index < this.locations.length; index++) {
      let element = this.locations[index];
      if (element.selected) {
        element.selected = false;
      }
    }
    this.locations[location.index].selected = true;
    $('#currentLoc').text(this.locations[location.index].value);
    this.onLocationChanged.emit(this.locations[location.index]);
  }
}
