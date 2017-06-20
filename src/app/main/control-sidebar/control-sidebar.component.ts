import { Component, OnInit, OnDestroy, ElementRef, Renderer } from '@angular/core';
import { AdminLteService } from './../admin-lte/admin-lte.services';

declare var $: any;

@Component({
  selector: 'control-sidebar',
  templateUrl: './control-sidebar.component.html',
  styleUrls: ['./control-sidebar.component.css']
})
export class ControlSidebarComponent implements OnInit, OnDestroy {
  public isTabActive: number;
  public layoutOption: any;

  constructor(public adminLteService: AdminLteService, elementRef: ElementRef, renderer: Renderer) {
    this.layoutOption = {
      fixed: { isActive: false, layout: 'fixed' },
      toggleSidebar: { isActive: false, layout: 'sidebar-collapse' },
      toggleRightSlide: { isActive: false, layout: 'control-sidebar-open' },
      toggleRightSkins: { isActive: false, layout: 'toggle' },
    };

    this.isTabActive = 1;
  }

  public onFixedChange(ischecked) {
    this.layoutOption.fixed.isActive = ischecked;
    this.adminLteService.changeFixedLayout(this.layoutOption.fixed.layout);
  }

  public onToggleSidebarChange(ischecked) {
    this.layoutOption.toggleSidebar.isActive = ischecked;
    let adminLte = this.adminLteService.getAdminLte();

    if (this.layoutOption.toggleSidebar.isActive) {
      adminLte.options.sidebarExpandOnHover = true;
      if (!$('body').hasClass('sidebar-collapse')) {
        this.adminLteService.onSidebarToggleEvent();
        $('body').addClass('sidebar-collapse');
      } else {
        $('body').addClass('sidebar-collapse');
      }
    } else {
      adminLte.options.sidebarExpandOnHover = false;
      $('body').removeClass('sidebar-collapse');
    }
    this.adminLteService.setAdminLte(adminLte);
  }

  public onToggleRightSlideChange(ischecked) {
    this.layoutOption.toggleRightSlide.isActive = ischecked;
    this.adminLteService.changeFixedLayout('control-sidebar-open');
    let adminLte = this.adminLteService.getAdminLte();
    let slide = !adminLte.options.controlSidebarOptions.slide;
    adminLte.options.controlSidebarOptions.slide = slide;
    this.adminLteService.setAdminLte(adminLte);
    // if (!slide)
    //   $('.control-sidebar').removeClass('control-sidebar-open');
  }

  public onToggleRightSkinsChange(ischecked) {
    this.layoutOption.toggleRightSkins.isActive = ischecked;
    let sidebar = $('.control-sidebar');
    if (sidebar.hasClass('control-sidebar-dark')) {
      sidebar.removeClass('control-sidebar-dark');
      sidebar.addClass('control-sidebar-light');
    } else {
      sidebar.removeClass('control-sidebar-light');
      sidebar.addClass('control-sidebar-dark');
    }
  }

  public onChangeSkinsClick(skin) {
    if ($(this).hasClass('knob')) {
      return;
    }
    this.adminLteService.changeSkin(skin);
  }

  public ngOnInit() {
    // TODO
  }

  public ngOnDestroy() {
    // TODO
  }

  public onTabClick(tabNumber) {
    if (tabNumber === 1) {
      this.isTabActive = 1;
      return;
    } else if (tabNumber === 2) {
      this.isTabActive = 2;
      return;
    } else {
      return;
    }

  }
}
