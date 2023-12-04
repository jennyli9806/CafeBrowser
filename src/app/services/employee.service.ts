import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppRoutes } from 'src/environments/environment';
import { UserFavouriteEntity } from '../objects/user';
import { map, Observable, of, tap } from 'rxjs';
import { PlantSkuEntity } from '../objects/search-result';
import { OrderType } from '../utils/Constants';
import { depotsResult } from '../objects/depots-result';
import { User } from '../Dtos/User';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  httpOptions: HttpHeaders = new HttpHeaders({
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  SearchEmployees(term: string) {
    if (term === '') {
      return of([]);
    }
    const Request = {
      term: term,
    };
    return this.http
      .get<User[]>(AppRoutes.EmployeeController.SearchEmployees, {
        params: Request,
        headers: this.httpOptions,
      })
      .pipe(
        map((response) => response),
        tap((res) => {})
      );
  }

  CreateEmployeeFavourite(source:string, Request: UserFavouriteEntity) {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    let params = new HttpParams()
    .set('dataSource', source);
    return this.http
      .post<UserFavouriteEntity[]>(
        AppRoutes.EmployeeController.Employeefavorites,
        Request , { params }
      )
      .pipe(map((res) => res));
  }

  UpdateEmployeeFavourite(source: string, Request: UserFavouriteEntity) {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    let params = new HttpParams()
    .set('dataSource', source);
    return this.http
      .delete<UserFavouriteEntity[]>(
        AppRoutes.EmployeeController.Employeefavorites,
        { body: Request, params }
      )
      .pipe(map((res) => res));
  }

  FetchEmployeeFavourites(source: string): Observable<UserFavouriteEntity[]> {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    let params = new HttpParams()
    .set('dataSource', source);
    return this.http
      .get<UserFavouriteEntity[]>(
        AppRoutes.EmployeeController.Employeefavorites, { params }
      )
      .pipe(map((res) => res));
  }

  FetchEmployeeFavouritesWithDetails(source: string): Observable<PlantSkuEntity[]> {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    let params = new HttpParams()
    .set('dataSource', source);
    return this.http
      .get<PlantSkuEntity[]>(
        AppRoutes.EmployeeController.GetEmployeefavoritesDetails, { params }
      )
      .pipe(map((res) => res));
  }

  CreateEmployeeOrder(Request: OrderEntity) {
    return this.http
      .post(AppRoutes.EmployeeController.EmployeeOrders, Request)
      .pipe(map((res) => res));
  }

  FetchEmployeeOrder(): Observable<OrderResponseEntity> {
    return this.http
      .get<OrderResponseEntity>(AppRoutes.EmployeeController.EmployeeOrders)
      .pipe(map((res) => res));
  }
  FetchEmployeeLocation(): Observable<GPSLocation> {
    return this.http
      .get<GPSLocation>(AppRoutes.EmployeeController.EmployeeLocation)
      .pipe(map((res) => res));
  }
}

export interface OrderEntity {
  SkuNumber: string;
  Quantity: number;
  PlantId: string;
  StorageBin?: string;
  OrderType: OrderType;
  DeliveryAddress?: string;
  includeNote?: boolean;
}
export interface OrderResponseEntity {
  OrderDetails: OrderEntity[];
  PlantSkuDetails: PlantSkuEntity[];
}
export interface GPSLocation {
  Lat?: number;
  Lng?: number;
}
