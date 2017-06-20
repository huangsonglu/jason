import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { LayoutRoutingModule } from './main.routes';
import { MainComponent } from './main.component';
import { MainHeaderComponent } from './header/main-header.component';
import { MainSidebarComponent } from './sidebar/main-sidebar.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';
import { MainFooterComponent } from './footer/main-footer.component';
import { AdminLteService } from './admin-lte/admin-lte.services';

// modules
import { WeatherModule } from '../weather/weather.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    Ng2BootstrapModule.forRoot(),
    WeatherModule
  ],
  exports: [MainComponent],
  declarations: [
    MainComponent,
    MainHeaderComponent,
    ControlSidebarComponent,
    MainFooterComponent,
    MainSidebarComponent
  ],
  providers: [AdminLteService],
})
export class MainModule { }
