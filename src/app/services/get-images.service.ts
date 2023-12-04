import { Injectable } from '@angular/core';
import { AppRoutes, environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetImagesService {
  // function to get API
  private _imageResults = AppRoutes.NCMSController.GetImages;

  constructor(private http: HttpClient) {}

  getImages(SKU: string
    ): Observable<string[]> {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // let params = new HttpParams()
    //   .set('SKUNumber', SKU);
    const str = SKU.slice(0, -2); 
    return this.http
      .get<string[]>(this._imageResults + str);
  }

}
