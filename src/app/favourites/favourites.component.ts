import { Component, OnInit } from '@angular/core';
import { PlantSkuEntity } from '../objects/search-result';
import { EmployeeService } from '../services/employee.service';
import { SharingService } from '../services/sharing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ROUTE_CONSTANTS } from '../utils/route-constants';

@Component({
  selector: 'favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  public filters: any;
  favouritesResults: PlantSkuEntity[];
  public language: string = 'en';
  public noResults: boolean = false;
  public loading$ = new BehaviorSubject<boolean>(false);

  @Output() getLength = new EventEmitter<number>();
  @Output() homeLoadings = new EventEmitter<boolean>();

  IsFavoriteRoute: boolean;
  sourceParam: string;
  constructor(
    private EmployeeService: EmployeeService,
    private sharingService: SharingService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    if(window.location.pathname.includes(
      'ncms'
    )){this.sourceParam = 'ncms'}
    if(window.location.pathname.includes(
      'piam'
    )){this.sourceParam = 'piam'}
    this.getEmployeeFavourites();
    this.IsFavoriteRoute = window.location.pathname.includes(
      'favorites'
    );
    
  }

  getEmployeeFavourites() {
    this.loading$.next(true);
    this.EmployeeService.FetchEmployeeFavouritesWithDetails(this.sourceParam).subscribe(
      (results) => {
        this.favouritesResults = results;
        if (this.favouritesResults.length < 1) {
          this.noResults = true;
        }
        this.getLength.emit(this.favouritesResults.length);
      },
      (err) => console.error('Observer got an error: ' + err),
      () => {
        this.loading$.next(false);
        this.homeLoadings.emit(false);
      }
    );
  }
  navigateHome(){
    if(window.location.pathname.includes(
      'ncms'
    )){this.router.navigate([
      ROUTE_CONSTANTS.HOME_SOURCE
    ]);}
    if(window.location.pathname.includes(
      'piam'
    )){this.router.navigate([
      ROUTE_CONSTANTS.HOME_PIAM
    ]);}
  }
  langChanged(language: string): void {
    this.language = language;
  }
}
