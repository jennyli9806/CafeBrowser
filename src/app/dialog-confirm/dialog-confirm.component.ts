import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ROUTE_CONSTANTS } from '../utils/route-constants';

@Component({
  selector: 'dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css'],
})
export class DialogConfirmation implements OnInit {
  Title: string = '';
  longtext: string = '';
  destination: string = '';
  method: string = '';
  PlantId: string = '';
  partRetrieved: boolean = false;
  SKUNumber: string;
  origin: string;
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmation>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.Title = data.Title;
    this.longtext = data.longtext;
    this.destination = data.destination;
    this.method = data.method;
    this.PlantId = data.PlantId;
    this.SKUNumber = data.SKUNumber;
    this.origin = data.origin;
  }
  ngOnInit(): void {
  }

  onAdd = new EventEmitter();

  onNoClick(): void {
    this.dialogRef.close();
  }
  navigateDepot(url: string) {
    window.open(url + this.destination + '&origin=' + this.origin, '_blank');
    this.onAdd.emit();
    this.Title = this.translate.instant('Create_Order');
    this.longtext = this.translate.instant('Sales_Order_Long');
    this.partRetrieved = true;
  }

  onSelect(actionType: string): void {
    switch (actionType) {
      case 'Pickup': {
        this.router.navigate([
          ROUTE_CONSTANTS.SKU_PICKUP_ORDER.replace(':id3', 'ncms').replace(
            ':id',
            this.SKUNumber
          ).replace(':id2', this.PlantId).replace(':id3', 'ncms'),
        ]);
        this.onNoClick();
        break;
      }
      case 'Delivery': {
        this.router.navigate([
          ROUTE_CONSTANTS.SKU_DELIVERY.replace(':id3', 'ncms').replace(':id', this.SKUNumber).replace(
            ':id2',
            this.PlantId
          ),
        ]);
        this.onNoClick();
        break;
      }
    }
  }
}

export interface DialogData {
  Title: string;
  longtext: string;
  destination: string;
  origin: string;
  method: string;
  PlantId: string;
  SKUNumber: string;
}
