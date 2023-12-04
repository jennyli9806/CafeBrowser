import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharingService } from '../services/sharing.service';
import { ROUTE_CONSTANTS } from '../utils/route-constants';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  public searchInput: string;
  public savedSearch: string;
  public currentRoute: string;
  public sourceParam: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharingService: SharingService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit(): void {
    if(window.location.pathname.includes(
      'ncms'
    )){this.sourceParam = 'ncms'}
    if(window.location.pathname.includes(
      'piam'
    )){this.sourceParam = 'piam'}
    this.searchInput = this.route.snapshot.paramMap.get('id');
    this.currentRoute = this.router.url;
  }

  searchTouched(): void {
    if (this.searchInput?.length > 2) {
      this.sharingService.setSearch(this.searchInput);
      this.router.navigate([
        ROUTE_CONSTANTS.SEARCH_RESULTS.replace(':id3', this.sourceParam).replace(':id', this.searchInput),
      ]);
      
    }
  }
  backButton() {
    if (this.currentRoute.includes('search')) {
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
    if (this.currentRoute.includes('depots')) {
      this.savedSearch = this.sharingService.getSearch();
      this.router.navigate([
        ROUTE_CONSTANTS.SEARCH_RESULTS.replace(':id3', this.sourceParam).replace(':id', this.savedSearch),
      ]);
      if (this.savedSearch==undefined) {
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
    }
  }
}
