import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Dtos/User';
import { depotsResult, UsersPhone } from '../objects/depots-result';
import { BehaviorSubject, Subject } from 'rxjs';
// import { DataSource } from '../utils/Constants';


@Injectable({
  providedIn: 'root',
})
export class SharingService {
  private searchInput: string;
  private PIAMSearchInput: string;
  private UsersPhone: depotsResult["PlantUsersPhone"];
  Data: string;
  DataSource: Subject<string> = new Subject<string>();

  constructor()  {
    this.DataSource.subscribe((value) => {
        this.Data = value
    });
}

ChangeDataSource(Data) {
  this.DataSource.next(Data);
}
  selectedLocationEmitter = new EventEmitter();
  selectedMapMarkerEmitter = new EventEmitter();
  setLangEmitter = new EventEmitter();
 
  setSearch(input:string) {
    this.searchInput = input;
  }
  getSearch(): string {
    return this.searchInput;
   }
 setPhoneNumber(Phone: depotsResult["PlantUsersPhone"]) {
  this.UsersPhone = Phone;
 }
 getPhoneNumber(): depotsResult["PlantUsersPhone"] {
  return this.UsersPhone;
 }
 setPIAMsearch(input:string){
  this.PIAMSearchInput = input;
 }
 getPIAMsearch(): string{
  return this.PIAMSearchInput ;
 }

}
