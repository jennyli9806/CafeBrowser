import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlantSkuEntity } from '../objects/search-result';
import { UserFavouriteEntity } from '../objects/user';
import { PictureCardDialogComponent } from '../picture-card-dialog/picture-card-dialog.component';
import { Skus } from '../utils/Constants';
import { EmployeeService } from '../services/employee.service';
import {  ActivatedRoute, Router } from '@angular/router';
import { ROUTE_CONSTANTS } from '../utils/route-constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SharingService } from '../services/sharing.service';
import { MatDialog } from '@angular/material/dialog';
import { GetImagesService } from '../services/get-images.service';


@Component({
  selector: 'sku-item',
  templateUrl: './sku-item.component.html',
  styleUrls: ['./sku-item.component.css'],
})
export class SkuItemComponent implements OnInit {
  @Input() searchResult: PlantSkuEntity;
  @Input() isFavourite: boolean;
  @Input() language: string;
  @Input() searchInput?: string;
  hasImage?:boolean = false;
  @Output() isFavouriteChange = new EventEmitter<boolean>();
  sourceParam: string;
  imageURLs: string[];

  constructor(
    private EmployeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private sharingService: SharingService,
    public dialog: MatDialog,
    private getImagesService: GetImagesService,
    private http: HttpClient
  ) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit(): void {
    if(window.location.pathname.includes(
      'ncms'
    )){this.sourceParam = 'ncms'}
    if(window.location.pathname.includes(
      'piam'
    )){this.sourceParam = 'piam'}
    this.sharingService.setLangEmitter.subscribe((id) => {
      this.langChanged(id);
    });
        this.getImagesService.getImages(this.searchResult.SkuNumber).subscribe((data) => {
      this.imageURLs = data;
      for (var i = 0; i < this.imageURLs.length; i++) {
        if(this.imageURLs[i]==="The remote server returned an error: (404) Not Found."){
          this.imageURLs[i]=null;
        }
      if(this.imageURLs[0] !=null){
        this.hasImage = true;
    }
  }
    });
  }

  addUpdateFav(SkuNumber: string) {
    const favourite: UserFavouriteEntity = {
      CategoryName: Skus,
      Id: SkuNumber,
    };
    this.isFavourite
      ? this.EmployeeService.UpdateEmployeeFavourite(this.sourceParam,favourite).subscribe(
          (result) => {
            this.isFavourite = false;
            this.isFavouriteChange.emit(false);
          }
        )
      : this.EmployeeService.CreateEmployeeFavourite(this.sourceParam, favourite).subscribe(
          (result) => {
            this.isFavourite = true;
          }
        );
  }

  onItemSelected(SkuNumber: string): void {
    if(window.location.pathname.includes('piam')){this.sharingService.setPIAMsearch(this.searchResult.ManufacturerPartNo)
    }
    if(window.location.pathname.includes('PIAM')){this.sharingService.setPIAMsearch(this.searchResult.ManufacturerPartNo)
    }
      this.router.navigate([
        ROUTE_CONSTANTS.SKU_DETAILS.replace(':id3', this.sourceParam).replace(':id', SkuNumber),
      ]);
  }

  langChanged(language: string): void {
    this.language = language;
  }
  openPicture(SkuNumber: string, material:string ): void {
    const dialogRef = this.dialog.open(PictureCardDialogComponent, {
      width: '100%',
      data: {
        Title: material,
        Sku: SkuNumber,
        imageURLs: this.imageURLs
      },
    });
  }
}
interface Error {
  status?: number;
}
