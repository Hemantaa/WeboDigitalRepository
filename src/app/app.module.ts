import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './shared/services/Employee.service';
import { ConfirmationService } from 'primeng/api';
import { TeamService } from './shared/services/Team.service';
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase)
    
    
    
  ],
  providers: [HttpClientModule,ConfirmationService,EmployeeService,TeamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
