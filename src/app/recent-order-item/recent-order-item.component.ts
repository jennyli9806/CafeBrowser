import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlantSkuEntity } from '../objects/search-result';
import { UserFavouriteEntity } from '../objects/user';
import { Skus } from '../utils/Constants';
import { EmployeeService, OrderEntity } from '../services/employee.service';
import { Router } from '@angular/router';
import { ROUTE_CONSTANTS } from '../utils/route-constants';
import { SharingService } from '../services/sharing.service';
import { GetPlantSkuDetails } from '../services/get-plant-sku';

@Component({
  selector: 'recent-order-item',
  templateUrl: './recent-order-item.component.html',
  styleUrls: ['./recent-order-item.component.css'],
})
export class RecentOrderItemComponent implements OnInit {
  @Input() order: OrderEntity;
  @Input() language: string;
  @Input() SkuDeatils: PlantSkuEntity;
  constructor(private router: Router, private sharingService: SharingService) 
  {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit(): void {
    this.sharingService.setLangEmitter.subscribe((id) => {
      this.langChanged(id);
    });
  }

  onItemSelected(SkuNumber: string): void {
    this.router.navigate([
      ROUTE_CONSTANTS.SKU_DETAILS.replace(':id', SkuNumber),
    ]);
  }

  langChanged(language: string): void {
    this.language = language;
  }
}
