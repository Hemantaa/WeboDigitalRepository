import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/shared/services/Employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit, OnChanges {

  @Input() editId: string = "";
  employee: any = {}
  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.employee = {
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
    };
  }

  ngOnChanges() {
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

      if (this.editId) {
        this.employee = data.find((data: any) => String(data.id) === String(this.editId));
      }
    })
  }

  edit() {
    console.log("inside edit")
    this.router.navigate(["add-employee"], { queryParams: { id: this.editId } })
  }
}
