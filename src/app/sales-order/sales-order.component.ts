import { Component, OnInit } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { GetPlantSkuDetails, PlantSKURequest } from '../services/get-plant-sku';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../Dtos/User';
import { ActivatedRoute } from '@angular/router';
import { PlantSkuEntity } from '../objects/search-result';
import { ThisReceiver } from '@angular/compiler';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { EmployeeService, OrderEntity } from '../services/employee.service';
import { OrderType } from '../utils/Constants';
import { ROUTE_CONSTANTS } from '../utils/route-constants';

@Component({
  selector: 'sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.css'],
})
export class SalesOrderComponent implements OnInit {
  constructor(
    private getPlantSkuService: GetPlantSkuDetails,
    public translate: TranslateService,
    public route: ActivatedRoute,
    public Loggineduser: AuthService,
    public employeeService: EmployeeService
  ) {}

  User: User;
  PeinNumber: string;
  PlantId: string;
  SKUNumber: string;
  plantSku: PlantSkuEntity;
  quantityRequired: number;
  storageBin: string;
  newLocation: string;
  finalLocation: string;
  otherBin: boolean = false;
  submitted = false;
  shippingLabel: boolean = false;
  thirdParty: boolean = false;

  ngOnInit() {
    this.SKUNumber = this.route.snapshot.paramMap.get('id').toUpperCase();
    this.PlantId = this.route.snapshot.paramMap.get('id2');
    this.thirdParty = this.checkDepotType();
    this.getPlantSkus();
    this.getCurrentUser();
    console.log(this.plantSku?.StorageBins);
  }

  getPlantSkus() {
    this.getPlantSkuService
      .GetPlantSkuDetails(this.PlantId, this.SKUNumber)
      .subscribe((data) => {
        this.plantSku = data;
      });
  }

  async getCurrentUser() {
    this.PeinNumber = this.Loggineduser.ToEmployee(
      await lastValueFrom(this.Loggineduser.LogginedUser())
    )?.Pein;
  }
  otherLocation(value: boolean) {
    this.otherBin = value;
  }
  checkDepotType(): boolean{
    if (this.PlantId === '9401' || this.PlantId === '9402' || this.PlantId === '9403' || this.PlantId === '9412' || this.PlantId === '9421') {
      return true
    }
    else {return false}
  }
  onSubmit() {
    if (this.storageBin === 'Other') {
      this.finalLocation = this.newLocation;
    } else {
      this.finalLocation = this.storageBin;
    }
    const request: OrderEntity = {
      PlantId: this.PlantId,
      SkuNumber: this.SKUNumber,
      Quantity: this.quantityRequired,
      OrderType: OrderType.Pickup,
      StorageBin: this.finalLocation,
      DeliveryAddress: '',
      includeNote: this.shippingLabel,
    };
    this.employeeService.CreateEmployeeOrder(request).subscribe((result) => {});
    this.submitted = true;
  }
}
