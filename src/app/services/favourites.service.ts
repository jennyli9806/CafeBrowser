import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PlantSkuEntity } from '../objects/search-result';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {}
