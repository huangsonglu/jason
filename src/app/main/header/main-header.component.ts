import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AdminLteService } from './../admin-lte/admin-lte.services';

declare var $: any;
@Component({
  selector: 'main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
  private adminLte: any;
  private index: any;
  @Output() public onMenuClick: EventEmitter<any> = new EventEmitter<any>();
  constructor(public adminLteService: AdminLteService) {
    this.adminLte = this.adminLteService.getAdminLte();
    // this is aconstructor
    this.index = 1;
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
}
