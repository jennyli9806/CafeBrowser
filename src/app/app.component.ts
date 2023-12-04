import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { MatomoService } from './services/matomo.service';
import { filter, Subscription } from 'rxjs';
import { MatomoInjector, MatomoTracker } from 'ngx-matomo';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { SharingService } from './services/sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Spares';
  MatomoSubscription: Subscription;

  constructor(
    private AuthService: AuthService,
    private translate: TranslateService,
    private MatomoService: MatomoService,
    private matomoInjector: MatomoInjector,
    private matomoTracker: MatomoTracker,
    public route: Router,
    public sharingService: SharingService,
    public router: ActivatedRoute

  ) {
   }
  ngOnInit() {
    this.translate.use('en');
    this.MatomoSubscription = this.route.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.MatomoTracking(event);
      });
  }

  MatomoTracking(event: NavigationStart) {
    const user =
      this.AuthService.UserDetails != null
        ? this.AuthService.UserDetails
        : null;
    if (user != null) {
      this.matomoTracker.setUserId(user.Name.concat(' (', user.Pein, ')'));
      this.matomoTracker.trackLink(environment.BaseUrl + event.url, 'link');
    }
  }
  ngOnDestroy() {
    if (this.MatomoSubscription != null) this.MatomoSubscription.unsubscribe();
  }
}
