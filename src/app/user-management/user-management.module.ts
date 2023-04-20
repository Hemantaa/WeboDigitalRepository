import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementDashboardComponent } from './user-management-dashboard/user-management-dashboard.component';
import { UserAdministrationComponent } from './user-management-dashboard/user-administration/user-administration.component';
import { CardComponent } from '../shared/components/card/card.component';
import { TabViewModule } from 'primeng/tabview';
import { TableComponent } from '../shared/components/table/table.component';
import { TableModule } from 'primeng/table';
import { TeamViewComponent } from './user-management-dashboard/team/team-view/team-view.component';
import { ButtonModule } from 'primeng/button';
import { EmployeeViewComponent } from './user-management-dashboard/employee/employee-view/employee-view.component';
import { InputTextModule } from 'primeng/inputtext';
import { AddEmployeeComponent } from './user-management-dashboard/employee/add-employee/add-employee.component';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AddTeamComponent } from './user-management-dashboard/team/add-team/add-team.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { DialogModule } from 'primeng/dialog';
import { EditEmployeeComponent } from './user-management-dashboard/employee/edit-employee/edit-employee.component';
import { ChipModule } from 'primeng/chip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { SliderModule } from 'primeng/slider';

@NgModule({
  declarations: [
    UserManagementDashboardComponent,
    UserAdministrationComponent,
    CardComponent,
    TableComponent,
    TeamViewComponent,  
    EmployeeViewComponent, AddEmployeeComponent, AddTeamComponent, EditEmployeeComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    TabViewModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FileUploadModule,
    CalendarModule,
    FormsModule,
    ConfirmDialogModule,
    MultiSelectModule,
    NgxQRCodeModule,
    DialogModule,
    ChipModule,
    ConfirmPopupModule,
    SliderModule

  ]
})
export class UserManagementModule { }
