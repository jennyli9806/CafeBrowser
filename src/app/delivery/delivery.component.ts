import { Component, OnInit } from '@angular/core';

import { GetPlantSkuDetails, PlantSKURequest } from '../services/get-plant-sku';
import { TranslateService } from '@ngx-translate/core';
import { PlantSkuEntity } from '../objects/search-result';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EmployeeService, OrderEntity } from '../services/employee.service';
import { lastValueFrom } from 'rxjs';
import { OrderType } from '../utils/Constants';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DialogConfirmation } from '../dialog-confirm/dialog-confirm.component';
import { depotsResult, UsersPhone } from '../objects/depots-result';
import { UserDepotsResult } from '../objects/user-depots-result';
import { PhoneCardDialogComponent } from '../phone-card-dialog/phone-card-dialog.component';
import { GetDepotsService } from '../services/get-depots.service';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css'],
})
export class DeliveryComponent implements OnInit {
  constructor(
    private getPlantSkuService: GetPlantSkuDetails,
    private depotsResultsService: GetDepotsService,
    public translate: TranslateService,
    public route: ActivatedRoute,
    public Loggineduser: AuthService,
    public employeeService: EmployeeService,
    public dialog: MatDialog,
    public sharingService: SharingService
  ) {}

  peinNumber: string;
  PlantId: string;
  SKUNumber: string;
  Name: string;
  plantSku: PlantSkuEntity;
  quantityRequired: number;
  storageBin: string;
  Address1: string;
  Address2: string;
  City: string;
  Province: string;
  PostalCode: string;
  Type: string;
  submitted = false;
  public depotsResults: depotsResult[];
  userPhoneNumbers: UsersPhone[];
  shippingLabel: boolean = false;


  ngOnInit(): void {
    this.SKUNumber = this.route.snapshot.paramMap.get('id').toUpperCase();
    this.PlantId = this.route.snapshot.paramMap.get('id2');
    this.getPlantSkus();
    this.getCurrentUser();
    this.userPhoneNumbers = this.sharingService.getPhoneNumber();
  }
//get part details used for max quantity
  getPlantSkus() {
    this.getPlantSkuService
      .GetPlantSkuDetails(this.PlantId, this.SKUNumber)
      .subscribe((data) => {
        this.plantSku = data;
      });
  }
//could improve code to call get sku depots to get userphonenumbers and filter for specific depot
  openPhoneNumbersCard(): void {
    const dialogRef = this.dialog.open(PhoneCardDialogComponent, {
      width: '250px',
      data: {
        userPhoneNumbers: this.userPhoneNumbers,
      },
    });
  }
  async getCurrentUser() {
    this.peinNumber = this.Loggineduser.ToEmployee(
      await lastValueFrom(this.Loggineduser.LogginedUser())
    )?.Pein;
  }
  onSubmit() {
    const address = this.Name.concat(
      '::',
      this.Address1.concat(',', this.Address2).concat(
        ',',
        this.City.concat(',', this.Province.concat(' ', this.PostalCode))
      )
    );

    const request: OrderEntity = {
      PlantId: this.PlantId,
      SkuNumber: this.SKUNumber,
      Quantity: this.quantityRequired,
      OrderType: OrderType.Delivery,
      DeliveryAddress: address,
      StorageBin: '',
      includeNote: this.shippingLabel,
    };
    this.employeeService.CreateEmployeeOrder(request).subscribe((result) => {});
    this.submitted = true;
  }
}
