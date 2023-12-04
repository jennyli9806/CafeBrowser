import { Component, OnInit } from '@angular/core';
import { depotsResult } from '../objects/depots-result';
import { PlantSkuEntity } from '../objects/search-result';
import {
  EmployeeService,
  OrderEntity,
  OrderResponseEntity,
} from '../services/employee.service';
import { GetPlantSkuDetails } from '../services/get-plant-sku';
import { SharingService } from '../services/sharing.service';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ROUTE_CONSTANTS } from '../utils/route-constants';
import { observable, Subscription } from 'rxjs';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  public filters: any;
  orderResponse: OrderResponseEntity;
  public language: string = 'en';
  public noResults: boolean = false;
  public loading$ = new BehaviorSubject<boolean>(false);
  IsHistoryRoute: boolean;
  @Output() getHistoryLength = new EventEmitter<number>();

  constructor(
    private EmployeeService: EmployeeService,
    private sharingService: SharingService,
    private getPlantSkuService: GetPlantSkuDetails,
    public router: Router
  ) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit(): void {
    this.getRecentOrders();
    console.log('recent orders checked')
    // this.IsHistoryRoute = window.location.pathname.includes(
    //   ROUTE_CONSTANTS.RECENT_ORDER_HISTORY
    // );
    // console.log(this.IsHistoryRoute,'is HistoryRoute')
    // this.sharingService.setLangEmitter.subscribe((id) => {
    //   this.langChanged(id);
    //   console.log('language checked')
    // });
  }

  getRecentOrders() {
    // this.loading$.next(true);
    this.EmployeeService.FetchEmployeeOrder().subscribe(
      (results) => {
        this.orderResponse = results;
        // if (this.orderResponse.OrderDetails.length < 1) {
        //   this.noResults = true;
        // }
        // this.getHistoryLength.emit(this.orderResponse.OrderDetails.length);
      },
      (err) => console.error('Observer got an error: ' + err),
      // () => 
      // this.loading$.next(false)
    );
  }

  getPlantSkus(SkuNumber: string, PlantId: string): PlantSkuEntity {
    return this.orderResponse?.PlantSkuDetails.filter(
      (a) => a.SkuNumber === SkuNumber && a.PlantId === PlantId
    )[0];
  }

  langChanged(language: string): void {
    this.language = language;
  }
}
