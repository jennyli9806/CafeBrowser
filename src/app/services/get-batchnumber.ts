import { Injectable } from '@angular/core';
import { AppRoutes, environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { batchNumber } from '../objects/batchnumber';

@Injectable({
  providedIn: 'root',
})
export class GetBatchNumberService {
  // function to get API
  // private _getBatchNumber = AppRoutes.NCMSController.GetBatchNumber;

  // constructor(private http: HttpClient) {}

  // batchNumbers(
  //   searchInput: string,
  //   address: string
  // ): Observable<batchNumber[]> {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   let params = new HttpParams()
  //     .set('SkuNumber', searchInput)
  //     .set('PlantAddress', address);
  //   return this.http
  //     .get<batchNumber[]>(this._getBatchNumber, { params })
  //     .pipe(map((res) => res));
  // }
}
