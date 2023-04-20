import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/shared/models/Employee.model';
import { EmployeeService } from 'src/app/shared/services/Employee.service';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {
  tableColumns: any[] = []
  data: any[] = []
  filteredData: any[] = [];
  filterValue: string = "";
  
  constructor(private router: Router, private employeeService: EmployeeService) { }
  ngOnInit() {

    this.employeeService.getAllEmployees().subscribe((employees: any[]) => {
      this.data = employees.map(record => {
        let data = record.payload.doc.data()
        return {
          firebaseId: record.payload.doc.id,
          id: data.id,
          full_name: data.firstName + " " + data.middleName + " " + data.surName,
          current_team: data.team,
          email_address: data.emailAddress,
          designation: data.jobPosition,
          billable_hours: data.billableHours + " Hours/week",
          mobile_number: data.phoneNumber
        }
      });
      this.filteredData = this.data;
    })



    this.tableColumns = [
      { name: "id", label: "Id", width: "5%" },
      { name: "full_name", label: "Full Name", width: "10%" },
      { name: "current_team", label: "Current Team", width: "10%" },
      { name: "mobile_number", label: "Mobile Number", width: "10%" },
      { name: "email_address", label: "Email Address", width: "10%" },
      { name: "designation", label: "Designation", width: "10%" },
      { name: "billable_hours", label: "Billable Hours", width: "10%" }
    ]


  }

  addEmployeeClick() {
    this.router.navigate(["add-employee"])
  }

  filterRecords() {
    this.filteredData = this.data.filter(record => record.full_name.toUpperCase().includes(this.filterValue.toUpperCase()) || record.current_team.toUpperCase().includes(this.filterValue.toUpperCase()) || record.mobile_number.toUpperCase().includes(this.filterValue.toUpperCase() || record.email_address.toUpperCase().includes(this.filterValue.toUpperCase())));
  }
}
