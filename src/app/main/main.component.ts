import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AdminLteService } from './admin-lte/admin-lte.services';
declare var $: any;
declare var AdminLTEOptions: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  public bodyClasses: string;
  public body: any;
  public adminLte: any;
  public menuRegister;
  public locationRegister;
  constructor(public adminLteService: AdminLteService) {
    // this.bodyClasses = 'skin-blue sidebar-mini';
    // this.body = document.getElementsByTagName('body')[0];
    this.adminLte = adminLteService.getAdminLte();
  }

  public ngOnInit() {
    // add the the body classes
    // this.body.classList.add('skin-blue');
    // this.body.classList.add('sidebar-mini');
  }

  public onContentWrapperClick() {
    // this.adminLte = this.adminLteService.getAdminLte();
    let screenSizes = this.adminLte.options.screenSizes;
    if ($(window).width() <= (screenSizes.sm - 1) && $('body').hasClass('sidebar-open')) {
      $('body').removeClass('sidebar-open');
    }
  }

  public onResize(event) {
    // event.target.innerWidth;
    this.adminLteService.adminLteLayoutFix();
    // this.adminLteService.adminLteTreeActivate('.sidebar');
    this.adminLteService.adminLteLayoutFixSidebar();

  }

  public ngOnDestroy() {
    // remove the the body classes
    // this.body.classList.remove('skin-blue');
    // this.body.classList.remove('sidebar-mini');
  }

  public ngAfterViewInit() {
    $('body').removeClass('hold-transition');
    this.adminLteService.adminLteLayoutActivate();
    console.log(this.adminLte.options.enableControlSidebar);
    if (this.adminLte.options.enableControlSidebar) {
      console.log('enableControlSidebar');
      this.adminLteService.adminLteControlSidebarActivate();
    }
    if (this.adminLte.options.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
      $('.navbar .menu').slimscroll({
        height: this.adminLte.options.navbarMenuHeight,
        alwaysVisible: false,
        size: this.adminLte.options.navbarMenuSlimscrollWidth
      }).css('width', '100%');
    }
    this.adminLteService.setup();
  }

  public registerOnMenuclick(onChanged: () => void) {
    this.menuRegister = onChanged;
  }

  public menuClick() {
    if (this.menuRegister) {
      this.menuRegister();
    }
  }

  public registerOnLocationChanged(onChanged: (location: any) => void) {
    this.locationRegister = onChanged;
  }

  public locationChanged(event) {
    if (this.locationRegister) {
      this.locationRegister(event);
    }
  }

}
