import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

import { SidebarModule} from 'primeng/sidebar';
import { ToolbarModule} from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ChartModule } from 'primeng/chart';

import { CookieService } from 'ngx-cookie-service';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardHomeComponent
  }
];

@NgModule({
  declarations: [DashboardHomeComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule, FormsModule, ReactiveFormsModule, SidebarModule, ButtonModule, ToolbarModule, ToastModule, ChartModule, SharedModule
  ],
  providers: [MessageService, CookieService],
  exports: [RouterModule]
})
export class DashboardModule { }
