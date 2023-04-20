import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { TeamService } from 'src/app/shared/services/Team.service';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit{
tableColumns = [
  {name:"id",label:"Id",width:"5%"},
  {name:"full_name",label:"Full Name",width:"10%"},
  {name:"current_team",label:"Current Team",width:"10%"},
  {name:"mobile_number",label:"Mobile Number",width:"10%"},
  {name:"email_address",label:"Email Address",width:"10%"},
  {name:"designation",label:"Designation",width:"10%"},
  {name:"billable_hours",label:"Billable Hours",width:"10%"}]

data: any[] = []
filterValue: string = "";
filteredData: any[] = [];
visible: boolean = false;
rangeValues:[]=[];
min: number = 0;
max: number = 0;
  constructor(private router:Router,private teamService: TeamService,private confirmationService: ConfirmationService){}
  ngOnInit(){
    this.teamService.getAllTeams().subscribe((employees: any[]) => {
      this.data = employees.map(record =>{
       let data = record.payload.doc.data()
        return{
          firebaseId: record.payload.doc.id,
          id: data.id,
          team_name: data.teamName,
          team_password: data.teamPasword,
          members: data.teamMembers.length > 2?  data.teamMembers.slice(0,2).reduce((a:any,b:any) => a+""+b.firstName+",","")+"..." : data.teamMembers.slice(0,2).reduce((a:any,b:any) =>  a+""+b.firstName+",","") ,  
          qr_details: data.teamQr,
          total_man_hours: data.billableHours,
        }
      });
      this.filteredData = this.data;
       })
      
      
      
        this.tableColumns = [
          {label:"Team Name",name:"team_name",width:"15%"},
          {label:"Members",name:"members",width:"20%"},
          {label:"QR Details",name:"qr_details",width:"20%"},
          {label:"Total Man Hours",name:"total_man_hours",width:"20%"}
        ]
  }

  addTeamClick(){
    this.router.navigate(["add-team"])
  }

  filterRecords(){
    this.filteredData = this.data.filter(record => record.team_name.toUpperCase().includes(this.filterValue.toUpperCase()) || record.members.toUpperCase().includes(this.filterValue.toUpperCase()))
  }

  openFilter(){
    this.visible = true;
  }
  applyRange(apply:boolean){
    if(apply){
      this.filteredData = this.data.filter(record => +record.total_man_hours > this.min && +record.total_man_hours < this.max)
    }else{
    this.filteredData = this.data
    }

    this.visible = false;
   
  }

  changeSlider(event:any){
    console.log(event)
    console.log(event.values[0])
    this.min = event.values[0];
    this.max = event.values[1];
  }

  
}


