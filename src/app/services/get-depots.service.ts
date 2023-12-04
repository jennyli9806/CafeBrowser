import { Injectable } from '@angular/core';
import { AppRoutes, environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { depotsResult } from '../objects/depots-result';

@Injectable({
  providedIn: 'root',
})
export class GetDepotsService {
  // function to get API
  private _depotsResults = AppRoutes.NCMSController.GetAvailableUnits;

  constructor(private http: HttpClient) {}

  depotsResults(searchInput: string,
    source: string
    ): Observable<depotsResult[]> {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    let params = new HttpParams()
    .set('Search', searchInput)
    .set('dataSource', source);
    return this.http
      .get<depotsResult[]>(this._depotsResults, { params })
      .pipe(map((res) => res));
  }
}
