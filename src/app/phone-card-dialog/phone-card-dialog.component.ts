import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersPhone } from '../objects/depots-result';

@Component({
  selector: 'phone-card-dialog',
  templateUrl: './phone-card-dialog.component.html',
  styleUrls: ['./phone-card-dialog.component.css'],
})
export class PhoneCardDialogComponent implements OnInit {
  userPhoneNumbers: UsersPhone[];

  constructor(
    public dialogRef: MatDialogRef<PhoneCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PhoneCardData
  ) {
    this.userPhoneNumbers = data.userPhoneNumbers;
  }
  ngOnInit(): void {}
  onAdd = new EventEmitter();
  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface PhoneCardData {
  userPhoneNumbers: UsersPhone[];
}
