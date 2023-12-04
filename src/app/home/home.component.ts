import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharingService } from '../services/sharing.service';
import { User } from '../Dtos/User';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { lastValueFrom } from 'rxjs';
import { ROUTE_CONSTANTS } from '../utils/route-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  FavouritesLength: number;
  Username: string;
  Firstname: string;
  HistoryLength: number;
  dataSource: string;
  sourceParam: string;

  public loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharingService: SharingService,
    public Loggineduser: AuthService
  ) {
    this.dataSource = this.sharingService.Data;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit(): void {
    this.loading$.next(true);
    // this.getCurrentUser();
    this.sharingService.setSearch(undefined);
  }

  async getCurrentUser() {
    this.Username = this.Loggineduser.ToEmployee(
      await lastValueFrom(this.Loggineduser.LogginedUser())
    )?.Name;
    this.Firstname = this.Username.split(' ')[0];
    this.loading$.next(false);
  }
  LengthNumber(length: number) {
    this.FavouritesLength = length;
  }
  HistoryNumber(length: number) {
    this.HistoryLength = length;
  }
  navigateToFavorites(): void {
    this.router.navigate([ROUTE_CONSTANTS.FAVORITES.replace(':id3', 'ncms')]);
  }
  navigateToRecentOrders(): void {
    this.router.navigate([ROUTE_CONSTANTS.RECENT_ORDER_HISTORY]);
  }
}
