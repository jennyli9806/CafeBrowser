import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ROUTE_CONSTANTS } from '../utils/route-constants';
import { UserDepotsResult } from '../objects/user-depots-result';

@Component({
  selector: 'app-depot-details',
  templateUrl: './depot-details.component.html',
  styleUrls: ['./depot-details.component.css']
})
export class DepotDetailsComponent implements OnInit {
  PlantAddress: string;
  PlantID: string;
  PlantCity: string;
  PlantDistance: string;
  PlantTime: string;
  PlantEquivalents: UserDepotsResult['allParts'];
  constructor(
    public dialogRef: MatDialogRef<DepotDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DepotData,
    public translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.PlantAddress = data.PlantAddress;
    this.PlantID = data.PlantID;
    this.PlantCity = data.PlantCity;
    this.PlantDistance = data.PlantDistance;
    this.PlantTime = data.PlantTime;
    this.PlantEquivalents = data.PlantEquivalents;
  }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  myColour(Rank): string {
    if(Rank=='Original'){
      return '#0075FF'
    }
    // if(Rank==0){
    //   return '#0075FF'
    // }
    // if(Rank==1){
    //   return '#1BA332'
    // }
    // if(Rank==2){
    //   return '#FA9E00'
    // }
    // if(Rank==3){
    //   return '#E15F01'
    // }
    else{
      // return'red'
      return '#1BA332'
    }
  }
}
export interface DepotData {
  PlantAddress: string,
  PlantID: string,
  PlantCity: string,
  PlantDistance: string,
  PlantTime: string,
  PlantEquivalents: UserDepotsResult['allParts']
}