import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './user-management-dashboard/employee/add-employee/add-employee.component';
import { AddTeamComponent } from './user-management-dashboard/team/add-team/add-team.component';
import { UserAdministrationComponent } from './user-management-dashboard/user-administration/user-administration.component';
import { UserManagementDashboardComponent } from './user-management-dashboard/user-management-dashboard.component';

const routes: Routes = [{
  path:"",component:UserManagementDashboardComponent,children:[
    {path:"",component:UserAdministrationComponent},
    {path:"add-employee",component:AddEmployeeComponent},
    {path:"add-team",component:AddTeamComponent},

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
