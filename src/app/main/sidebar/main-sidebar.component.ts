import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { AdminLteService } from './../admin-lte/admin-lte.services';
import 'rxjs/add/operator/switchMap';

declare var $: any;
@Component({
  selector: 'main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.css']
})
export class MainSidebarComponent implements OnInit {
  private adminLte: any;

  constructor(public adminLteService: AdminLteService, private router: Router, private route: ActivatedRoute) {
    // TODO
    this.adminLte = this.adminLteService.getAdminLte();
  }

  public ngOnInit() {
    this.bindMenuClickThrough();
    let naviKey = new Date().getTime().toString();
    naviKey = naviKey.substr(naviKey.length / 2);
    let navigationExtras: NavigationExtras = {
      queryParams: { 'active': naviKey },
      relativeTo: this.route
    };
    this.router.navigate(['weather/center'], { relativeTo: this.route }).then((success) => {
      if (success) {

      }
    });
  }

  private bindMenuClickThrough() {
    let trees = $('.treeview');
    if (trees) {
      let that = this;
      for (let element of trees) {
        let firstSpan = $(element).find('span').first();
        $(firstSpan).on("click", function () {
          let parentA = $(this).parent('a');
          if (parentA) {
            event.stopPropagation();
            that.onSidebarTopMenuClick(parentA);
          }
        })
      }
    }
  }

  public onMainSidebarMouseEnter() {
    if (this.adminLte.options.sidebarExpandOnHover
      || ($('body').hasClass('fixed')
        && $('body').hasClass('sidebar-mini'))) {
      let screenWidth = this.adminLte.options.screenSizes.sm - 1;
      if ($('body').hasClass('sidebar-mini')
        && $('body').hasClass('sidebar-collapse')
        && $(window).width() > screenWidth) {
        this.adminLteService.adminLtePushMenuExpand();
      }
    }
  }

  public onMainSidebarMouseLeave() {
    if (this.adminLte.options.sidebarExpandOnHover
      || ($('body').hasClass('fixed')
        && $('body').hasClass('sidebar-mini'))) {
      let screenWidth = this.adminLte.options.screenSizes.sm - 1;
      if ($('body').hasClass('sidebar-mini')
        && $('body').hasClass('sidebar-expanded-on-hover')
        && $(window).width() > screenWidth) {
        this.adminLteService.adminLtePushMenuCollapse();
      }
    }
  }

  public onSidebarTreeClick(event) {
    let adminLte = this.adminLteService;
    let animationSpeed = adminLte.getAdminLte().options.animationSpeed;
    event = event || window.event;
    let target = event.target || event.srcElement;
    this.onSidebarTopMenuClick(target);
  }

  public onSidebarTopMenuClick(target) {
    let adminLte = this.adminLteService;
    let animationSpeed = adminLte.getAdminLte().options.animationSpeed;
    let $this = $(target);
    let checkElement = $this.next();
    // Check if the next element is a menu and is visible
    if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))
      && (!$('body').hasClass('sidebar-collapse'))) {
      // Close the menu
      checkElement.slideUp(animationSpeed, () => {
        checkElement.removeClass('menu-open');

        // Fix the layout in case the sidebar stretches over the height of the window
        // _this.layout.fix();
      });
      checkElement.parent('li').removeClass('active');
    } else if ((checkElement.is('.treeview-menu'))
      && (!checkElement.is(':visible'))) { // If the menu is not visible
      // Get the parent menu
      let parent = $this.parents('ul').first();
      // Close all open menus within the parent
      let ul = parent.find('ul:visible').slideUp(animationSpeed);
      // Remove the menu-open class from the parent
      ul.removeClass('menu-open');
      // Get the parent li
      let parentLi = $this.parent('li');

      // Open the target menu and add the menu-open class
      checkElement.slideDown(animationSpeed, () => {
        // Add the class active to the parent li
        checkElement.addClass('menu-open');
        parent.find('li.active').removeClass('active');
        parentLi.addClass('active fake');
        // Fix the layout in case the sidebar stretches over the height of the window
        adminLte.adminLteLayoutFix();
      });
    }
    // if this isn't a link, prevent the page from being redirected
    if (checkElement.is('.treeview-menu')) {
      event.stopPropagation();
    }
  }

  public onSidebarRouteMenuClick(event) {
    event = event || window.event;
    let target = event.target || event.srcElement;
    let $this = $(target);
    let rootParents = $this.parents('ul');
    for (let parent of rootParents) {
      let element = $(parent);
      if (element.is('.treeview-menu')) {
        element.find('li:not(.fake)').removeClass('active');
      }
    }
    let belongMenu = $this.parent('li').parent('ul');
    if (belongMenu.is('.treeview-menu')) {
      $this.parent('li').addClass('active');
    }
  }

}
