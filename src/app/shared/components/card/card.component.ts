import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  
@Input() cardData : {title:string,subTitle:string,backgroundColor:string} = {title:"",subTitle:"",backgroundColor:""}

  constructor(){

  }

  ngOnInit(){

  }
}
