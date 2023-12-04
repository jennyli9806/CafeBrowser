import { Injectable } from '@angular/core';
import { AppRoutes, environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GetFiltersService {
  // function to get API
  private _getFilters = AppRoutes.NCMSController.GetMaintSpareCategory;

  constructor(private http: HttpClient) {}

  getFilters(source: string
    ): Observable<string[]> {
    // return this.http.get<string[]>(this._getFilters);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams()
      .set('dataSource', source);
    return this.http
      .get<string[]>(this._getFilters, { params })
      .pipe(map((res) => res));
  }
}
