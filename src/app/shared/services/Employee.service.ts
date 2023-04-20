import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Employee } from "../models/Employee.model";
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(private db: AngularFirestore) { }

    addEmployee(employee: Employee) {
        this.db.collection('/employees').add(employee);
    }

    deleteEmployee(id: string) {
        this.db.collection('/employees').doc(id).delete();
    }



    getAllEmployees() {
        return this.db.collection('/employees').snapshotChanges();
    }

    getAllPlaneEmployees() {
        return this.db.collection('/employees').valueChanges();
    }
}