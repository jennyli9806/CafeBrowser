import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetImagesService } from '../services/get-images.service';


@Component({
  selector: 'app-picture-card-dialog',
  templateUrl: './picture-card-dialog.component.html',
  styleUrls: ['./picture-card-dialog.component.css']
})
export class PictureCardDialogComponent implements OnInit {
Title: string;
Sku: string;
imageURLs: string[];
imageURL: string;
  constructor(
    public dialogRef: MatDialogRef<PictureCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private getImagesService: GetImagesService
  ) {
    this.Title = data.Title;
    this.Sku = data.Sku;
    this.imageURLs = data.imageURLs
  }

  ngOnInit(): void {
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}
export interface DialogData {
  Title: string;
  Sku: string;
  imageURLs: string[];
}