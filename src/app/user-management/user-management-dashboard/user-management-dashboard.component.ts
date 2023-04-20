import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management-dashboard',
  templateUrl: './user-management-dashboard.component.html',
  styleUrls: ['./user-management-dashboard.component.css']
})
export class UserManagementDashboardComponent implements OnInit {

  showBackIcon: boolean = true;

  ngOnInit() {

  }
  constructor(private router: Router) { }

  navigateToDashboard() {
    this.router.navigate([""]);
  }
}
