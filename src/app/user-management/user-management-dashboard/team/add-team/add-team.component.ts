import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/shared/models/Team.model';
import { TeamService } from 'src/app/shared/services/Team.service';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { EmployeeService } from 'src/app/shared/services/Employee.service';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent {

  team: Team = {
    firebaseId: "",
    id: 0,
    teamName: "",
    teamPassword: "",
    teamMembers: [],
    billableHours: "",
    teamQr: ""
  }

  validTeam: any = {
    validTeamName: true,
    validTeamPassword: true,
    validBillableHours: true,
    validTeamQr: true,
  }

  isEdit: boolean = false;
  editId: string = "";
  employees: any[] = [];
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = "Enter name and password";

  constructor(private router: Router, private actvatedRoute: ActivatedRoute, private teamService: TeamService, private employeeService: EmployeeService) {
  }
  ngOnInit() {

    this.isEdit = this.actvatedRoute.snapshot.queryParams["id"] ? true : false;
    this.editId = this.actvatedRoute.snapshot.queryParams["id"];
    if (this.isEdit) {
      this.teamService.getAllTeams().subscribe((record: any[]) => {
        let teams = record.map(d => {
          return {
            firebaseId: d.payload.doc.id,
            id: d.payload.doc.data().id,
            teamName: d.payload.doc.data().teamName,
            teamPassword: d.payload.doc.data().teamPassword,
            teamMembers: d.payload.doc.data().teamMembers,
            billableHours: d.payload.doc.data().billableHours,
            teamQr: d.payload.doc.data().teamQr
          }
        }
        )
        this.team = teams.find((data: any) => String(data.id) === String(this.editId)) as any;
      })
    }
    this.employeeService.getAllEmployees().subscribe((record: any[]) => {
      this.employees = record.map(d => {
        return {
          firebaseId: d.payload.doc.id,
          id: d.payload.doc.data().id,
          image: d.payload.doc.data().image,
          firstName: d.payload.doc.data().firstName,
          middleName: d.payload.doc.data().middleName,
          surName: d.payload.doc.data().surName,
          birthDate: d.payload.doc.data().birthDate as any,
          gender: d.payload.doc.data().gender,
          address: d.payload.doc.data().address,
          phoneNumber: d.payload.doc.data().phoneNumber,
          emailAddress: d.payload.doc.data().emailAddress,
          startsAt: d.payload.doc.data().startsAt as any,
          endsIn: d.payload.doc.data().endsIn as any,
          jobPosition: d.payload.doc.data().jobPosition,
          team: d.payload.doc.data().team,
          userBillable: d.payload.doc.data().userBillable,
          billableHours: d.payload.doc.data().billableHours,
        }
      }
      )
    })

    this.teamService.getAllPlaneTeams().subscribe((tmp: any[]) => {
      console.log(this.team)
      this.team.id = tmp.length > 0 ? +Math.max(...tmp.map(data => data.id)) + 1 : 1;

    })

  }

  addTeam() {
    if (!this.validate()) {
      return;
    }

    if (!this.isEdit) {
      this.teamService.addTeam(this.team);
    } else {
      this.teamService.deleteTeam(this.team.firebaseId)
      this.teamService.addTeam(this.team);
    }
    this.router.navigate([""])
  }

  validate() {
    this.validTeam.validTeamName = this.team.teamName === "" ? false : true;
    this.validTeam.validTeamPassword = this.team.teamPassword === "" ? false : true;
    if (!this.validTeam.validTeamName ||
      !this.validTeam.validTeamPassword
    ) {
      return false;
    }
    return true
  }



  changeQr() {
    this.value = this.team.teamName + "  " + this.team.teamPassword;
  }

  membersChanged(event: any) {
    this.team.billableHours = event.value.reduce((a: any, b: any) => Number(a) + Number(b.billableHours), 0)
  }

  validNumberInput(event: any) {
    return (event.ctrlKey || event.altKey
      || (47 < event.keyCode && event.keyCode < 58 && event.shiftKey == false)
      || (95 < event.keyCode && event.keyCode < 106)
      || (event.keyCode == 8) || (event.keyCode == 9)
      || (event.keyCode > 34 && event.keyCode < 40)
      || (event.keyCode == 46))
  }


  download() {
    let image = document.getElementById("qrcode")?.getElementsByTagName("IMG");
    let arrayBuffer = image![0].getAttribute("src");
    let link = document.createElement('a');
    link.download = 'qr.png';
    link.href = arrayBuffer!;
    link.click();
  }

  print() {
    window.print();
  }
}
