import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/Employee.service';
import { TeamService } from 'src/app/shared/services/Team.service';

@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrls: ['./user-administration.component.css']
})
export class UserAdministrationComponent implements OnInit {
  card1 = { title: "Teams", subTitle: "0", backgroundColor: "blue" };
  card2 = { title: "Employees", subTitle: "0", backgroundColor: "orange" }

  constructor(private teamService: TeamService, private employeeService: EmployeeService) { }
  ngOnInit() {
    this.teamService.getAllPlaneTeams().subscribe(data => {
      this.card1.subTitle = String(data.length)
    })

    this.employeeService.getAllPlaneEmployees().subscribe(data => {
      this.card2.subTitle = String(data.length)
    })
  }
}
