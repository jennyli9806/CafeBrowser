import { Injectable } from '@angular/core';
import { AppRoutes, environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PlantSkuEntity } from '../objects/search-result';
// import { DataSource } from '../utils/Constants';

@Injectable({
  providedIn: 'root',
})
export class SearchResultsService {
  // function to get API
  private SearchPlantSkusAPI = AppRoutes.NCMSController.SearchPlantSkus;
  constructor(private http: HttpClient) {}

  FetchSearchPlant(
    searchInput: string,
    filter: string,
    source: string
  ): Observable<PlantSkuEntity[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams()
      .set('Search', searchInput)
      .set('MaintSpareCat', filter)
      .set('dataSource', source);
    return this.http
      .get<PlantSkuEntity[]>(this.SearchPlantSkusAPI, { params })
      .pipe(map((res) => res));
  }
}
