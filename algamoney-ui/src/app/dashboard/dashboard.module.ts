import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PanelModule } from 'primeng/panel'
import { ChartModule} from 'primeng/chart'
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    PanelModule,
    ChartModule,
    HttpClientModule
  ]
})
export class DashboardModule { }
