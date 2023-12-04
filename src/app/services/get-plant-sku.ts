import { Injectable } from '@angular/core';
import { AppRoutes, environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PlantSkuEntity } from '../objects/search-result';

@Injectable({
  providedIn: 'root',
})
export class GetPlantSkuDetails {
  constructor(private http: HttpClient) {}

  httpOptions: HttpHeaders = new HttpHeaders({
    Accept: 'application/json',
  });

  GetPlantSkuDetails(
    PlantId: string,
    SKUNumber: string
  ): Observable<PlantSkuEntity> {
    let params = new HttpParams()
      .set('PlantId', PlantId)
      .set('SKUNumber', SKUNumber);
    return this.http
      .get<PlantSkuEntity>(AppRoutes.NCMSController.GetPlantSkuDetails, {
        params,
      })
      .pipe(map((res) => res));
  }
}
export interface PlantSKURequest {
  PlantId: string;
  SKUNumber: string;
}
