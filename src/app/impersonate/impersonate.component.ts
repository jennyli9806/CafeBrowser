import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Dtos/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-impersonate',
  templateUrl: './impersonate.component.html',
  styleUrls: ['./impersonate.component.css']
})
export class ImpersonateComponent implements OnInit {
  User!:User;
  constructor(
    private router:Router,
    private AuthService:AuthService
    ) { }

  async ngOnInit()  {
    this.AuthService.Logout();
    await this.AuthService.IsLogin();
    this.User=this.AuthService.UserDetails;
    setTimeout(() => {
      this.router.navigate(['/'])
    }, 1000);
  }

}