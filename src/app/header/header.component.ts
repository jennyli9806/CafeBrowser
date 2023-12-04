import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../Dtos/User';
import { observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchimpersonationComponent } from '../searchimpersonation/searchimpersonation.component';
import { SharingService } from '../services/sharing.service';
// import { DataSource } from '../utils/Constants';
import { Data } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_CONSTANTS } from '../utils/route-constants';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  IsLoggined = false;
  ChangeLanguageTo; // ="FR" ;
  CurrentLanguage;
  AuthSubscription: Subscription;
  // User: User;
  IsSmall = true;
  IsImpersonate = false;
  DataSource : string = 'ncms';
  data: string;
  constructor(
    private AuthService: AuthService,
    private modalService: NgbModal,
    public translate:TranslateService,
    public sharingService:SharingService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //checks for refreshed URL and updates header
    if(window.location.pathname.includes('piam')){this.DataSource = 'PIAM'}
    if(window.location.pathname.includes('PIAM')){this.DataSource = 'PIAM'}
    if(window.location.pathname.includes('ncms')){this.DataSource = 'NCMS'}
    if(window.location.pathname.includes('NCMS')){this.DataSource = 'NCMS'}
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.router.onSameUrlNavigation = 'reload';
  }
  useLanguage(language: string): void {
    this.translate.use(language);
    this.sharingService.setLangEmitter.emit(language);
  }
  ngOnInit() {
    // this.ResizeScreen();
    // this.ChangeStatus();
    // this.AuthSubscription = this.AuthService.UserStatusChanged.subscribe(
    //   () => {
    //     this.ChangeStatus();
    //   },
    //   () => {
    //     this.ChangeStatus();
    //   }
    // );

     //to update the toggle
     this.sharingService.DataSource.subscribe(value => this.data = value);
    //sets default as NCMS
  //   if(window.location.href.includes(
  //     'home')){
  //   this.router.navigate([
  //     ROUTE_CONSTANTS.HOME_SOURCE.replace(':id3', this.DataSource),
  //   ]);
  // }
  }
  ChangeDataSource(DataSource) {
    this.DataSource= DataSource;
    this.sharingService.ChangeDataSource(DataSource);
    // this.router.navigate([
    //   ROUTE_CONSTANTS.HOME_SOURCE.replace(':id3', DataSource),
    // ]);
    if(this.DataSource==='NCMS'){
      this.router.navigate([
        ROUTE_CONSTANTS.HOME_SOURCE
      ]);
    }
    if(this.DataSource==='PIAM'){
    this.router.navigate([
      ROUTE_CONSTANTS.HOME_PIAM
    ]);
  }
  }
  ngOnDestroy() {
    if (this.AuthSubscription != null) this.AuthSubscription.unsubscribe();
    this.sharingService.DataSource.unsubscribe();
  }

  // ChangeStatus() {
  //   this.IsLoggined = this.AuthService.UserDetails != null ? true : false;
  //   if (this.IsLoggined) this.User = this.AuthService.UserDetails;
  //   else this.User = null;

  //   if (this.AuthService.UserDetails != null)
  //     this.IsImpersonate = this.AuthService.UserDetails.IsImpersonate;
  // }

  // onResize(e: any) {
  //   this.ResizeScreen();
  // }

  // ResizeScreen() {
  //   if (window.innerWidth <= 992) this.IsSmall = true;
  //   else this.IsSmall = false;
  // }

  // get IsSuperAdmin() {
  //   return (
  //     this.User != null &&
  //     this.User.Roles != null &&
  //     this.User.Roles.map((x: string) => {
  //       return x.toLowerCase();
  //     }).indexOf('superadmin') > -1
  //   );
  // }
  Open() {
    const modalRef = this.modalService.open(SearchimpersonationComponent);
  }
  OnToggleMenu() {
    this.IsSmall = !this.IsSmall;
  }
}
