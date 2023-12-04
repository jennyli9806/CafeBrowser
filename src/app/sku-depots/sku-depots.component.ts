import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, firstValueFrom, lastValueFrom, timeout, findIndex } from 'rxjs';
import { DialogConfirmation } from '../dialog-confirm/dialog-confirm.component';
import { User } from '../Dtos/User';
import { depotsResult, SkuEquivalent, UsersPhone } from '../objects/depots-result';
import { UserDepotsResult } from '../objects/user-depots-result';
import { PhoneCardDialogComponent } from '../phone-card-dialog/phone-card-dialog.component';
import { AuthService } from '../services/auth.service';
import { EmployeeService } from '../services/employee.service';
import { GetDepotsService } from '../services/get-depots.service';
import { SharingService } from '../services/sharing.service';
import { ScrollIntoViewDirective } from './scroll-into-view.directive';
import { GetPlantSkuDetails, PlantSKURequest } from '../services/get-plant-sku';
import { PlantSkuEntity } from '../objects/search-result';
import { ROUTE_CONSTANTS } from '../utils/route-constants';
import { DepotDetailsComponent } from '../depot-details/depot-details.component';

@Component({
  selector: 'sku-depots',
  templateUrl: './sku-depots.component.html',
  styleUrls: ['./sku-depots.component.css'],
})
export class SkuDepotsComponent implements OnInit {
  public SKUNumber: string;
  public sourceParam: string;
  public openMap: boolean = false;
  public depotsResults: depotsResult[] = [];
  public selectedAddress: string;
  public selectedPostalCode: string;
  public selectedPlantId: string;
  public activeDepot: number;
  public UserDepotsResults: UserDepotsResult[] = [];
  public plantAddresses: string[] = [];
  public loading$ = new BehaviorSubject<boolean>(false);
  public selected$ = new BehaviorSubject<boolean>(false);
  public noResults: boolean = false;
  public usingWorkLocation: boolean = false;
  //calculating distance and time to and from depots
  geocoder = new google.maps.Geocoder();
  mapService = new google.maps.DistanceMatrixService();
  EmployeeLocation: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  request = {
    origins: [this.EmployeeLocation],
    destinations: this.plantAddresses,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false,
  };

  constructor(
    private sharingService: SharingService,
    private depotsResultsService: GetDepotsService,
    private getPlantSkuService: GetPlantSkuDetails,
    public dialog: MatDialog,
    public translate: TranslateService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private Loggineduser: AuthService,
    private router: Router
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.SKUNumber = this.route.snapshot.paramMap.get('id');
    //when browser refreshes, it's all lowercase which screws it up
    this.sourceParam = this.route.snapshot.paramMap.get('id3').toUpperCase();
    this.loading$.next(true);
    await this.getEmployeeCurrentLocation()
      .then((res) => {
        this.EmployeeLocation.lat = res.Lat;
        this.EmployeeLocation.lng = res.Lng;
      })
      .catch((error) => {
        console.log(error);
      });
    if (this.EmployeeLocation.lat === 0) {
      const employeeWorkLocLatLng = await this.getEmployeeWorkLocation();
      this.EmployeeLocation = employeeWorkLocLatLng.toJSON();
    }
    if (this.EmployeeLocation.lat === 0) {
      const serverLocation: any = await this.getServerLocation()
        .then((res: any) => {
          this.EmployeeLocation.lat = res.coords.latitude;
          this.EmployeeLocation.lng = res.coords.longitude;
        })
        .catch((error) => {});
    }

    this.getDeportsForSku(this.SKUNumber);
    this.noResults = false;
    //Selected Map Event subscriber
    this.sharingService.selectedMapMarkerEmitter.subscribe((id) => {
      this.onSelectMarker(id);
    });
  }

  async getEmployeeCurrentLocation() {
    const results = await firstValueFrom(
      this.employeeService.FetchEmployeeLocation()
    );
    return results;
  }

  async getServerLocation() {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then(function (result) {
        // Will return ['granted', 'prompt', 'denied']
        if (result.state === 'denied')
          confirm('Please allow location in the browser and reload the page');
      });
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  }

  async getEmployeeWorkLocation() {
    const currentUser = this.Loggineduser.ToEmployee(
      await lastValueFrom(this.Loggineduser.LogginedUser())
    );
    const address = currentUser.Street?.concat(
      ',',
      currentUser.City,
      ',',
      currentUser.Province,
      ',',
      currentUser.PostalCode
    );
    const employeeWorkLocation = await this.geocoder.geocode({
      address: address,
    });
    const employeeWorkLocLatLng =
      employeeWorkLocation.results[0].geometry.location;
    this.usingWorkLocation = true;
    return employeeWorkLocLatLng;
  }
  removeDuplicatesArrayById: Array<any> = [];
  getDeportsForSku(_skuNumber: string) {
    if(this.sourceParam==='PIAM'){
      this.depotsResultsService.depotsResults(_skuNumber,this.sourceParam).subscribe({
        next: (data) => {
          this.depotsResults = data;
          if (this.depotsResults.length < 1) {
            this.noResults = true;
            this.loading$.next(false);
          }
          else {
            this.noResults = false;
          }
          //plant addresses extracted
          this.removeDuplicatesArrayById = this.removeDuplicates(this.depotsResults, "PlantId")
          this.plantAddresses = this.removeDuplicatesArrayById.map((plant) =>
            plant.PlantAddress?.concat(
              ',',
              plant.PlantCity
            )

          );
        },
        error: (e) => {
          this.loading$.next(false);
          console.error('Observer got an error: ' + e);
        },
        complete: () => {
        //distance time matrix
          const arrMax = 25;
          for (var i = 0; i < this.plantAddresses.length; i += arrMax) {
            //slice arrrays into chunks of 25
            const arr1 = this.plantAddresses.slice(i, i + arrMax);
            //original matrix
            const arr2 = this.removeDuplicatesArrayById.slice(i, i + arrMax);
            this.request = {
              origins: [this.EmployeeLocation],
              destinations: arr1,
              travelMode: google.maps.TravelMode.DRIVING,
              unitSystem: google.maps.UnitSystem.METRIC,
              avoidHighways: false,
              avoidTolls: false,
            };
            this.mapService.getDistanceMatrix(this.request).then((response) => {
              const arr3 = JSON.parse(JSON.stringify(response.rows[0].elements));
              for (var i = 0; i < arr1.length; i++) {
                const result1 = arr2[i];
                const result2 = arr3[i];
                const result4 = arr3[i].distance;
                var result3 = { ...result1, ...result2 };
                var result5 = { ...result3, ...result4 };
                //fills userdepots results with plant addresses + distance/times, still missing equivalents
                this.UserDepotsResults.push(result5);
                if (this.UserDepotsResults.length == this.plantAddresses.length) {
                  for(var i = 0; i < this.UserDepotsResults.length; i++){
                    //gets all equivalent parts
                    this.UserDepotsResults[i].allParts=this.returnEquivalents(this.UserDepotsResults[i].PlantId);
                  }
                  this.openMap = false;
                  this.loading$.next(false);
                }
              }
            });
          }
        },
      });
    }
    if(this.sourceParam==='NCMS'){
    this.depotsResultsService.depotsResults(_skuNumber,this.sourceParam).subscribe({
      next: (data) => {
        this.depotsResults = data;
        if (this.depotsResults.length < 1) {
          this.noResults = true;
          this.loading$.next(false);
        }
        else {
          this.noResults = false;
        }
        this.plantAddresses = this.depotsResults.map((plant) =>
          plant.PlantAddress?.concat(
            ',',
            plant.PlantCity,
            ',',
            plant.PlantPostalCode
          )
        );
      },
      error: (e) => {
        this.loading$.next(false);
        console.error('Observer got an error: ' + e);
      },
      complete: () => {
      //distance time matrix
        const arrMax = 25;
        for (var i = 0; i < this.plantAddresses.length; i += arrMax) {
          //slice arrrays into chunks of 25
          const arr1 = this.plantAddresses.slice(i, i + arrMax);
          const arr2 = this.depotsResults.slice(i, i + arrMax);
          this.request = {
            origins: [this.EmployeeLocation],
            destinations: arr1,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false,
          };
          this.mapService.getDistanceMatrix(this.request).then((response) => {
            const arr3 = JSON.parse(JSON.stringify(response.rows[0].elements));
            for (var i = 0; i < arr1.length; i++) {
              const result1 = arr2[i];
              const result2 = arr3[i];
              const result4 = arr3[i].distance;
              var result3 = { ...result1, ...result2 };
              var result5 = { ...result3, ...result4 };
              this.UserDepotsResults.push(result5);
              if (this.UserDepotsResults.length == this.plantAddresses.length) {
                this.openMap = false;
                this.loading$.next(false);
              }
            }
          });
        }
      },
    });
  }
  }
  //removes duplicates in array
  removeDuplicates(myArray, Prop) {
    return myArray.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[Prop]).indexOf(obj[Prop]) === pos;
    });
  }
  returnEquivalents(PlantID) {
    //gets all depotsResults values with requested PlantID
    const items = this.depotsResults.filter((depotsResult) => depotsResult.PlantId===PlantID)
    //extract relevant info
    const results = items.map(depotsResult => ({
      SkuNumber: depotsResult.SkuNumber, 
      Rank: (depotsResult.Rank != null ? 'Equivalent': 'Original'),
      //for more varied ranking
      // Rank: (depotsResult.Rank || 0),
      ManufacturerPartNo: depotsResult.ManufacturerPartNo,
      SkuShortDescEn: depotsResult.SkuShortDescEn,
      Unrestricted: depotsResult.Unrestricted,
      StorageLocId: depotsResult.StorageLocId,
      StorageLocName: depotsResult.StorageLocName,
      storageBins: depotsResult.storageBins}))
    return results
  }
  //get tag colour
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
  // when the card on the map is selected an event is triggered to center the marker  on the map
  onSelectCard(_activeDepotId: number) {
    this.activeDepot = _activeDepotId;
    this.sharingService.selectedLocationEmitter.emit(this.activeDepot);
  }
  onItemSelected(
    PlantAddress: string,
    PlantID: string,
    PlantCity: string,
    PlantDistance: string,
    PlantTime: string,
    PlantEquivalents: UserDepotsResult['allParts']
    ): void {
    const dialogRef = this.dialog.open(DepotDetailsComponent, {
      width: '100%',
      data: {
        PlantAddress: PlantAddress,
        PlantID: PlantID,
        PlantCity: PlantCity,
        PlantDistance: PlantDistance,
        PlantTime: PlantTime,
        PlantEquivalents: PlantEquivalents
      },
    });
      // this.router.navigate([
      //   ROUTE_CONSTANTS.DEPOT_DETAILS.replace(':id3', this.sourceParam).replace(':id', this.SKUNumber).replace(':id2', PlantID),
      // ]);
  }
 
  //when the marker on the map is selected the respective card is highlighted
  @ViewChildren(ScrollIntoViewDirective)
  scrollableItems: QueryList<ScrollIntoViewDirective>;
  onSelectMarker(_activeDepotId: number) {
    this.activeDepot = _activeDepotId;
    const item = this.scrollableItems.find(
      (x) => x.platform === _activeDepotId
    );
    item?.scrollIntoView();
    if (event.cancelable) {
      event.preventDefault();
    }
  }

  //selected depot for pickup and delivery
  selectDepot(
    PlantAddress: string,
    PlantPostalCode: string,
    PlantId: string
  ): void {
    this.selectedAddress = PlantAddress;
    this.selectedPostalCode = PlantPostalCode;
    this.selectedPlantId = PlantId;
  }

  //Dialogue boxes
  openDialog(
    method: string,
    PlantPostalCode: string,
    PlantId: string,
    PlantUsersPhone: depotsResult['PlantUsersPhone']
  ): void {
    this.selectedPostalCode = PlantPostalCode;
    if (method == 'Delivery') {
      const dialogRef = this.dialog.open(DialogConfirmation, {
        width: '250px',
        data: {
          Title: this.translate.instant('Delivery_Title'),
          longtext: this.translate.instant('Delivery_Text'),
          destination: this.selectedPostalCode,
          method: 'Delivery',
          PlantId: PlantId,
          SKUNumber: this.SKUNumber,
          origin: this.EmployeeLocation.lat + ',' + this.EmployeeLocation.lng,
        },
      });
      this.sharingService.setPhoneNumber(PlantUsersPhone);
    }
    if (method == 'Pickup') {
      if (PlantId === '9401' || PlantId === '9402' || PlantId === '9403' || PlantId === '9412' || PlantId === '9421') {
        const dialogRef = this.dialog.open(DialogConfirmation, {
          width: '250px',
          data: {
            Title: this.translate.instant('Third_Party'),
            longtext: this.translate.instant('Third_Party_Text'),
            destination: this.selectedPostalCode,
            method: 'ThirdParty',
            PlantId: PlantId,
            SKUNumber: this.SKUNumber,
            origin: this.EmployeeLocation.lat + ',' + this.EmployeeLocation.lng,
          },
        });
      }
      else {
         const dialogRef = this.dialog.open(DialogConfirmation, {
        width: '250px',
        data: {
          Title: this.translate.instant('Pickup_Title'),
          longtext: this.translate.instant('Pickup_Text'),
          destination: this.selectedPostalCode,
          method: 'Pickup',
          PlantId: PlantId,
          SKUNumber: this.SKUNumber,
          origin: this.EmployeeLocation.lat + ',' + this.EmployeeLocation.lng,
        },
      });
      dialogRef.afterClosed().subscribe(() => {});
      }
     
    }
  

  }

  openPhoneNumbersCard(userPhoneNumbers: UsersPhone[]): void {
    const dialogRef = this.dialog.open(PhoneCardDialogComponent, {
      width: '250px',
      data: {
        userPhoneNumbers: userPhoneNumbers,
      },
    });
  }
}
