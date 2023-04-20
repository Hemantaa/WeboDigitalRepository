import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Employee } from '../../models/Employee.model';
import { EmployeeService } from '../../services/Employee.service';
import { TeamService } from '../../services/Team.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit ,OnDestroy {


  @Input() columns: any[] = []
  @Input() data: any[] = []
  @Input() containerFlag: string = ""
  visible: boolean = false;
  editId: string = "";

  constructor(private router: Router, private confirmationService: ConfirmationService, private employeeService: EmployeeService, private teamService: TeamService) { }

  ngOnInit() {
  }

  ngOnDestroy(){
  
  }

  edit(record: any) {
    if (this.containerFlag === "employee") {
      this.router.navigate(["add-employee"], { queryParams: { id: record.id } })
    } else {
      this.router.navigate(["add-team"], { queryParams: { id: record.id } })
    }
  }

  delete(record: any) {
    console.log("inside delete");
    let DeleteName = this.containerFlag === "employee" ? record.full_name : record.team_name;
    let deleteMessage = "Are you sure you want to delete " + DeleteName + " from the list"
    let headerMessage = this.containerFlag === "employee" ? "Delete Employee" : "Delete Team"
    this.confirmationService.confirm({
      message: deleteMessage,
      header: headerMessage,
      accept: () => this.acceptFunc(record.firebaseId),
      reject: () => this.rejectFunc()
    });
  }

  acceptFunc(id: string) {
    if (this.containerFlag === "employee") { this.employeeService.deleteEmployee(id); }
    else { this.teamService.deleteTeam(id); }
    this.confirmationService.close();
  }
  
  rejectFunc() {
    console.log("rejected")
    this.confirmationService.close();

  }

  view(record: any) {
    this.editId = record.id
    this.visible = true;

  }
}
