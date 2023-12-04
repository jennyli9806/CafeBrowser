import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoggingStatusEnum } from '../Dtos/enums';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  LoginStatus=LoggingStatusEnum.Nothing;
  LoginStatusenum=LoggingStatusEnum;
  LogingSubscription:Subscription;
  constructor(
    private AuthService:AuthService,
    private route:Router
  ) { }

  ngOnInit() {
    this.LoginStatus=this.AuthService.LoginStatus;
    this.AuthService.UserStatusChanged.subscribe(
      ()=>{
        this.LoginStatus=this.AuthService.LoginStatus;
      }
      )
  }

  ngOnDestroy()
  {
   
  }

}
