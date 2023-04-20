import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/shared/models/Employee.model';
import { EmployeeService } from 'src/app/shared/services/Employee.service';
import { TeamService } from 'src/app/shared/services/Team.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employee: Employee = {
    firebaseId: "",
    id: 0,
    image: "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
    firstName: "",
    middleName: "",
    surName: "",
    birthDate: null as any,
    gender: "",
    address: "",
    phoneNumber: "",
    emailAddress: "",
    startsAt: null as any,
    endsIn: null as any,
    jobPosition: "",
    team: "",
    userBillable: true,
    billableHours: "",
  }

  validEmployee: any = {
    validFirstName: true,
    validMiddleName: true,
    validSurName: true,
    validBirthDate: true,
    validGender: true,
    validAddress: true,
    validPhoneNumber: true,
    validEmailAddress: true,
    validStartsAt: true,
    validEndsIn: true,
    validJobPosition: true,
    validTeam: true,
    validUserBillable: true,
    validBillableHours: true,
  }

  isEdit: boolean = false;
  editId: string = "";
  teams: any[] = []

  constructor(private router: Router, private actvatedRoute: ActivatedRoute, private employeeService: EmployeeService, private teamService: TeamService) {
  }
  async ngOnInit() {

    this.isEdit = this.actvatedRoute.snapshot.queryParams["id"] ? true : false;
    this.editId = this.actvatedRoute.snapshot.queryParams["id"];
    if (this.isEdit) {
      this.employeeService.getAllEmployees().subscribe((record: any[]) => {
        let data = record.map(d => {
          return {
            firebaseId: d.payload.doc.id,
            id: d.payload.doc.data().id,
            image: d.payload.doc.data().image,
            firstName: d.payload.doc.data().firstName,
            middleName: d.payload.doc.data().middleName,
            surName: d.payload.doc.data().surName,
            birthDate: d.payload.doc.data().birthDate.seconds,
            gender: d.payload.doc.data().gender,
            address: d.payload.doc.data().address,
            phoneNumber: d.payload.doc.data().phoneNumber,
            emailAddress: d.payload.doc.data().emailAddress,
            startsAt: d.payload.doc.data().startsAt.seconds,
            endsIn: d.payload.doc.data().endsIn.seconds,
            jobPosition: d.payload.doc.data().jobPosition,
            team: d.payload.doc.data().team,
            userBillable: d.payload.doc.data().userBillable,
            billableHours: d.payload.doc.data().billableHours,
          }
        }
        )
        this.employee = data.find((data: any) => String(data.id) === String(this.editId)) as any;
        this.employee.birthDate = new Date(new Date(Date.UTC(1970, 0, 1)).setUTCSeconds(+this.employee.birthDate))
        this.employee.startsAt = new Date(new Date(Date.UTC(1970, 0, 1)).setUTCSeconds(+this.employee.startsAt))
        this.employee.endsIn = new Date(new Date(Date.UTC(1970, 0, 1)).setUTCSeconds(+this.employee.endsIn))
      })

    }

    this.teamService.getAllTeams().subscribe((record: any[]) => {
      this.teams = record.map(d => {
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
    })

    this.employeeService.getAllPlaneEmployees().subscribe((tmp: any[]) => {
      this.employee.id = tmp.length > 0 ? +Math.max(...tmp.map(data => data.id)) + 1 : 1;
    })
  }

  addEmployee() {

    if (!this.validate()) {
      return;
    }
    if (!this.isEdit) {
      this.employeeService.addEmployee(this.employee);
    } else {
      this.employeeService.deleteEmployee(this.employee.firebaseId)
      this.employeeService.addEmployee(this.employee);
    }
    this.router.navigate([""])
  }

  validate() {
    this.validEmployee.validFirstName = this.employee.firstName === "" ? false : true;
    this.validEmployee.validSurName = this.employee.surName === "" ? false : true;
    this.validEmployee.validBirthDate = this.employee.birthDate === null ? false : true;
    this.validEmployee.validGender = this.employee.gender === "" ? false : true;
    this.validEmployee.validAddress = this.employee.address === "" ? false : true;
    this.validEmployee.validPhoneNumber = this.employee.phoneNumber === "" ? false : true;
    this.validEmployee.validEmailAddress = this.employee.emailAddress === "" ? false : true;
    this.validEmployee.validStartsAt = this.employee.startsAt === null ? false : true;
    this.validEmployee.validEndsIn = this.employee.endsIn === null ? false : true;
    this.validEmployee.validJobPosition = this.employee.jobPosition === "" ? false : true;

    if (!this.validEmployee.validFirstName ||
      !this.validEmployee.validMiddleName ||
      !this.validEmployee.validSurName ||
      !this.validEmployee.validBirthDate ||
      !this.validEmployee.validGender ||
      !this.validEmployee.validAddress ||
      !this.validEmployee.validPhoneNumber ||
      !this.validEmployee.validEmailAddress ||
      !this.validEmployee.validStartsAt ||
      !this.validEmployee.validEndsIn ||
      !this.validEmployee.validJobPosition ||
      !this.validEmployee.validTeam ||
      !this.validEmployee.validUserBillable ||
      !this.validEmployee.validBillableHours
    ) {
      return false;
    }
    return true
  }

  validNumberInput(event: any) {
    return (event.ctrlKey || event.altKey
      || (47 < event.keyCode && event.keyCode < 58 && event.shiftKey == false)
      || (95 < event.keyCode && event.keyCode < 106)
      || (event.keyCode == 8) || (event.keyCode == 9)
      || (event.keyCode > 34 && event.keyCode < 40)
      || (event.keyCode == 46))
  }

  chooseImage(event: any) {
    let reader = new FileReader();
    reader.readAsDataURL(event.currentFiles[0]);
    reader.onload = () => {
      this.employee.image = reader.result as any;
    };
  }
}
