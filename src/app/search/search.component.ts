import {
  Component,
  OnInit,
  Inject,
  EventEmitter,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { GetFiltersService } from '../services/get-filters.service';
import { SearchResultsService } from '../services/search-results.service';
import { GetDepotsService } from '../services/get-depots.service';
import { PlantSkuEntity } from '../objects/search-result';
import { SharingService } from '../services/sharing.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { depotsResult } from '../objects/depots-result';
import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserDepotsResult } from '../objects/user-depots-result';
import { SortPipe } from '../pipes/sort.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { UserFavouriteEntity } from '../objects/user';
import { EmployeeService } from '../services/employee.service';
import { Skus } from '../utils/Constants';
import { ROUTE_CONSTANTS } from '../utils/route-constants';

@Component({
  selector: ROUTE_CONSTANTS.SEARCH,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public searchInput: string = '';
  public filter: string = '';
  public language: string = 'en';
  public filters: string[];
  public isFiltered: string;
  public source: string;

  public searchResults: PlantSkuEntity[];
  public favouriteResults: UserFavouriteEntity[];
  public loading$ = new BehaviorSubject<boolean>(false);
  public noResults: boolean = false;
  searchParam: string;
  sourceParam: string;

  constructor(
    private _GetFiltersService: GetFiltersService,
    private _searchResultsService: SearchResultsService,
    private EmployeeService: EmployeeService,
    private sharingService: SharingService,
    public dialog: MatDialog,
    public translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit(): void {
    this.searchParam = this.route.snapshot.paramMap.get('id');
    this.sourceParam = this.route.snapshot.paramMap.get('id3');
    this.EmployeeService.FetchEmployeeFavourites(this.sourceParam).subscribe((results) => {
      this.favouriteResults = results;
    });
    this.searchInput = this.searchParam;
    this.source = this.sourceParam;
    this.noResults = false;
    //load filters onto page
    this._GetFiltersService.getFilters(this.source).subscribe((data) => {
      this.filters = data;
    });

    this.getSearchResults();
  }

  getSearchResults() {
    this.loading$.next(true);

    this._searchResultsService
      .FetchSearchPlant(this.searchInput, this.filter, this.source)
      .pipe(debounceTime(1000))
      ?.subscribe(
        (data) => {
          this.searchResults = data;
          if (this.searchResults.length < 1) {
            this.noResults = true;
          }
          else {
            this.noResults = false;
          }
        },
        (err) => console.error('Observer got an error: ' + err),
        () => this.loading$.next(false)
      );
  }
  //Filters are touched
  filtered(filter: string): void {
    this.filter = filter;
    this.isFiltered = filter;
    this.getSearchResults();
  }

  isFavourite(SkuNumber: string): boolean {
    if (this.favouriteResults === undefined) {
      return false;
    }
    return this.favouriteResults
      .filter((a) => a.CategoryName === Skus)
      .map((a) => a.Id)?.[0]
      .includes(SkuNumber);
  }
}
