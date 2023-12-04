import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription, of, lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppRoutes } from 'src/environments/environment';
import { environment } from 'src/environments/environment';
import { Router, UrlTree } from '@angular/router';
import { User } from '../Dtos/User';
import { map, catchError } from 'rxjs/operators';
import { LoggingStatusEnum } from '../Dtos/enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  LoginStatus = LoggingStatusEnum.Nothing;
  private _userdetails!: User;
  UserStatusChanged = new Subject<void>();
  AuthSubscription: Subscription;
  constructor(private http: HttpClient, private router: Router) {}

  private _getLogin = AppRoutes.AuthorizationController.Login;

  async IsLogin() {
    if (this.UserDetails != null) return true;
    this.LoginStatus = LoggingStatusEnum.Logging;
    this.UserStatusChanged.next();
    let request = this.LogginedUser();
    let RawEmployee = await lastValueFrom(request);
    if (RawEmployee == null) {
      this.LoginStatus = LoggingStatusEnum.Nothing;
      this.UserStatusChanged.next();
      this.router.navigate(['/notauthorized']);
      return false;
    }
    this._userdetails = this.ToEmployee(RawEmployee);
    this.LoginStatus = LoggingStatusEnum.Logined;
    this.UserStatusChanged.next();
    return true;
  }

  LogginedUser() {
    return this.http.get(this._getLogin);
  }

  ToEmployee(data: any): User {
    if (data == null) return null;
    return new User(
      data.Pein,
      data.Name,
      data.Email,
      data.Roles,
      data.IsImpersonate,
      data.RealUser,
      data.Street,
      data.City,
      data.Province,
      data.PostalCode
    );
  }

  get UserDetails(): User {
    return this._userdetails;
  }

  Impersonate(pein: string) {
    let params = new HttpParams();
    params = params.append('pein', pein);
    return this.http.get(AppRoutes.AuthorizationController.Impersonate, {
      params: params,
    });
  }
  RemoveImpersonate() {
    return this.http.get(AppRoutes.AuthorizationController.RemoveImpersonate);
  }

  Logout() {
    // this._userdetails=null;
  }
}
