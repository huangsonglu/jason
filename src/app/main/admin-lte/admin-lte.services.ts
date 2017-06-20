import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

declare var $: any;
declare var AdminLTEOptions: any;
@Injectable()
export class AdminLteService {
  private adminLte: any;
  private mySkins: any;
  constructor() {
    this.adminLte = {};

    /* --------------------
     * - AdminLTE Options -
     * --------------------
     * Modify these options to suit your implementation
     */
    this.adminLte.options = {
      // Add slimscroll to navbar menus
      // This requires you to load the slimscroll plugin
      // in every page before app.js
      navbarMenuSlimscroll: true,
      navbarMenuSlimscrollWidth: '3px', // The width of the scroll bar
      navbarMenuHeight: '200px', // The height of the inner menu
      // General animation speed for JS animated elements such as box collapse/expand and
      // sidebar treeview slide up/down. This options accepts an integer as milliseconds,
      // 'fast', 'normal', or 'slow'
      animationSpeed: 500,
      // Sidebar push menu toggle button selector
      sidebarToggleSelector: "[data-toggle='offcanvas']",
      // Activate sidebar push menu
      sidebarPushMenu: true,
      // Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
      sidebarSlimScroll: true,
      // Enable sidebar expand on hover effect for sidebar mini
      // This option is forced to true if both the fixed layout and sidebar mini
      // are used together
      sidebarExpandOnHover: false,
      // BoxRefresh Plugin
      enableBoxRefresh: true,
      // Bootstrap.js tooltip
      enableBSToppltip: true,
      BSTooltipSelector: "[data-toggle='tooltip']",
      // Enable Fast Click. Fastclick.js creates a more
      // native touch experience with touch devices. If you
      // choose to enable the plugin, make sure you load the script
      // before AdminLTE's app.js
      enableFastclick: false,
      // Control Sidebar Tree views
      enableControlTreeView: true,
      // Control Sidebar Options
      enableControlSidebar: true,
      controlSidebarOptions: {
        // Which button should trigger the open/close event
        toggleBtnSelector: "[data-toggle='control-sidebar']",
        // The sidebar selector
        selector: '.control-sidebar',
        // Enable slide over content
        slide: true
      },
      // Box Widget Plugin. Enable this plugin
      // to allow boxes to be collapsed and/or removed
      enableBoxWidget: true,
      // Box Widget plugin options
      boxWidgetOptions: {
        boxWidgetIcons: {
          // Collapse icon
          collapse: 'fa-minus',
          // Open icon
          open: 'fa-plus',
          // Remove icon
          remove: 'fa-times'
        },
        boxWidgetSelectors: {
          // Remove button selector
          remove: '[data-widget="remove"]',
          // Collapse button selector
          collapse: '[data-widget="collapse"]'
        }
      },
      // Direct Chat plugin options
      directChat: {
        // Enable direct chat by default
        enable: true,
        // The button to open and close the chat contacts pane
        contactToggleSelector: '[data-widget="chat-pane-toggle"]'
      },
      // Define the set of colors to use globally around the website
      colors: {
        lightBlue: '#3c8dbc',
        red: '#f56954',
        green: '#00a65a',
        aqua: '#00c0ef',
        yellow: '#f39c12',
        blue: '#0073b7',
        navy: '#001F3F',
        teal: '#39CCCC',
        olive: '#3D9970',
        lime: '#01FF70',
        orange: '#FF851B',
        fuchsia: '#F012BE',
        purple: '#8E24AA',
        maroon: '#D81B60',
        black: '#222222',
        gray: '#d2d6de'
      },
      // The standard screen sizes that bootstrap uses.
      // If you change these in the variables.less file, change
      // them here too.
      screenSizes: {
        xs: 480,
        sm: 768,
        md: 992,
        lg: 1200
      }
    };

    this.mySkins = [
      'skin-blue',
      'skin-black',
      'skin-red',
      'skin-yellow',
      'skin-purple',
      'skin-green',
      'skin-blue-light',
      'skin-black-light',
      'skin-red-light',
      'skin-yellow-light',
      'skin-purple-light',
      'skin-green-light'
    ];
  }
  public setAdminLte(adminLteObject: any) {
    this.adminLte = adminLteObject;
  }

  public getAdminLte() {

    return this.adminLte;
  }

  public onSidebarToggleEvent() {
    let screenSizes = this.adminLte.options.screenSizes;
    if ($(window).width() > (screenSizes.sm - 1)) {
      if ($('body').hasClass('sidebar-collapse')) {
        $('body').removeClass('sidebar-collapse');
      } else {
        $('body').addClass('sidebar-collapse');
      }
    } else {  // Handle sidebar push menu for small screens
      if ($('body').hasClass('sidebar-open')) {
        $('body').removeClass('sidebar-open').removeClass('sidebar-collapse');
      } else {
        $('body').addClass('sidebar-open');
      }
    }
  }

  public onControlSidebarToggleEvent() {
    let o = this.adminLte.options.controlSidebarOptions;
    // Get the sidebar
    let sidebar = $(o.selector);
    // If the sidebar is not open
    if (!sidebar.hasClass('control-sidebar-open')
      && !$('body').hasClass('control-sidebar-open')) {
      // Open the sidebar
      this.adminLteControlSidebarOpen(sidebar, o.slide);
    } else {
      this.adminLteControlSidebarClose(sidebar, o.slide);
    }
  }

  public adminLteLayoutActivate() {
    this.adminLteLayoutFix();
    this.adminLteLayoutFixSidebar();
    $('body, html, .wrapper').css('height', 'auto');
    // onResize() main.component;
  }

  public adminLteLayoutFix() {
    // Remove overflow from .wrapper if layout-boxed exists
    $('.layout-boxed > .wrapper').css('overflow', 'hidden');
    // Get window height and the wrapper height
    let footerHeight = $('.main-footer').outerHeight() || 0;
    let neg = $('.main-header').outerHeight() + footerHeight;
    let WindowHeight = $(window).height();
    let sidebarHeight = $('.sidebar').height() || 0;
    // Set the min-height of the content and sidebar based on the
    // the height of the document.
    if ($('body').hasClass('fixed')) {
      $('.content-wrapper, .right-side').css('min-height', WindowHeight - footerHeight);
    } else {
      let postSetWidth;
      if (WindowHeight >= sidebarHeight + $('.main-header').outerHeight()) {
        $('.content-wrapper, .right-side').css('min-height', WindowHeight - neg);
        postSetWidth = WindowHeight - neg;
      } else {
        $('.content-wrapper, .right-side').css('min-height', sidebarHeight);
        postSetWidth = sidebarHeight;
      }

      // Fix for the control sidebar height
      let controlSidebar = $(this.adminLte.options.controlSidebarOptions.selector);
      if (typeof controlSidebar !== 'undefined') {
        if (controlSidebar.height() > postSetWidth) {
          $('.content-wrapper, .right-side').css('min-height', controlSidebar.height());
        }
      }
    }
    // console.log('footerHeight , neg , WindowHeight, sidebarHeight');
    // console.log(footerHeight, neg, WindowHeight, sidebarHeight);
  }

  public adminLteLayoutFixSidebar() {
    if (!$('body').hasClass('fixed')) {
      if (typeof $.fn.slimScroll !== 'undefined') {
        $('.sidebar').slimScroll({ destroy: true }).height('auto');
      }
      return;
    } else if (typeof $.fn.slimScroll === 'undefined' && window.console) {
      window.console.error('Error: the fixed layout requires the slimscroll plugin!');
    }
    // Enable slimscroll for fixed layout
    if (this.adminLte.options.sidebarSlimScroll) {
      if (typeof $.fn.slimScroll !== 'undefined') {
        // Destroy if it exists
        $('.sidebar').slimScroll({ destroy: true }).height('auto');
        // Add slimscroll
        $('.sidebar').slimScroll({
          height: ($(window).height() - $('.main-header').height()) + 'px',
          color: 'rgba(0,0,0,0.2)',
          size: '3px'
        });
      }
    }
  }

  public adminLtePushMenuExpand() {
    $('body').removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
  }

  public adminLtePushMenuCollapse() {
    if ($('body').hasClass('sidebar-expanded-on-hover')) {
      $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
    }
  }

  public adminLteControlSidebarActivate() {
    let o = this.adminLte.options.controlSidebarOptions;
    // Get the sidebar
    let sidebar = $(o.selector);

    // If the body has a boxed layout, fix the sidebar bg position
    let bg = $('.control-sidebar-bg');
    this.adminLteControlSidebarFix(bg);

    // If the body has a fixed layout, make the control sidebar fixed
    if ($('body').hasClass('fixed')) {
      this.adminLteControlSidebarFixForFixed(sidebar);
    } else {
      // If the content height is less than the sidebar's height, force max height
      if ($('.content-wrapper, .right-side').height() < sidebar.height()) {
        this.adminLteControlSidebarFixForContent(sidebar);
      }
    }
  }

  public adminLteControlSidebarOpen(sidebar, slide) {
    // Slide over content
    if (slide) {
      sidebar.addClass('control-sidebar-open');
    } else {
      // Push the content by adding the open class to the body instead
      // of the sidebar itself
      $('body').addClass('control-sidebar-open');
    }
  }

  public adminLteControlSidebarClose(sidebar, slide) {
    if (slide) {
      sidebar.removeClass('control-sidebar-open');
    } else {
      $('body').removeClass('control-sidebar-open');
    }
  }

  public adminLteBoxWidgetActivate() {
    // TODO
  }

  public adminLteBoxWidgetCollapse() {
    // TODO
  }

  public adminLteBoxWidgetRemove() {
    // TODO
  }

  public changeFixedLayout(cls) {
    $('body').toggleClass(cls);
    this.adminLteLayoutFixSidebar();
    if ($('body').hasClass('fixed') && cls === 'fixed') {
      this.adminLteLayoutActivate();
    }
    this.adminLteControlSidebarFix($('.control-sidebar-bg'));
    this.adminLteControlSidebarFix($('.control-sidebar'));
  }

  public changeSkin(cls) {
    for (let i of this.mySkins) {
      $('body').removeClass(i);
    }
    $('body').addClass(cls);
    this.skinStore('skin', cls);
    return false;
  }

  public skinGet(name) {
    if (typeof (Storage) !== 'undefined') {
      return localStorage.getItem(name);
    } else {
      window.alert('Please use a modern browser to properly view this template!');
    }
  }

  public skinStore(name, val) {
    if (typeof (Storage) !== 'undefined') {
      localStorage.setItem(name, val);
    } else {
      window.alert('Please use a modern browser to properly view this template!');
    }
  }

  public setup() {
    let tmp = this.skinGet('skin');
    if (tmp && $.inArray(tmp, this.mySkins)) {
      this.changeSkin(tmp);
    }

  }
  private adminLteControlSidebarFix(sidebar) {
    sidebar.css({
      position: 'fixed',
      height: 'auto'
    });
  }

  private adminLteControlSidebarFixForFixed(sidebar) {
    sidebar.css({
      'position': 'fixed',
      'max-height': '100%',
      'overflow': 'auto',
      'padding-bottom': '50px'
    });
  }

  private adminLteControlSidebarFixForContent(sidebar) {
    $('.content-wrapper, .right-side').css('min-height', sidebar.height());
  }
}
