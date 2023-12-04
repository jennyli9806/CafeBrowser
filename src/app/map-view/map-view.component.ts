import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { GeocoderResponse } from '../objects/geocoder-response.model';
import { GeocodingService } from '../services/geocoding.service';
import { SelectionModel } from '@angular/cdk/collections';
import { GetDepotsService } from '../services/get-depots.service';
import { depotsResult } from '../objects/depots-result';
import {
  firstValueFrom,
  ignoreElements,
  lastValueFrom,
  Observable,
  timeout,
} from 'rxjs';
import { SharingService } from '../services/sharing.service';
import { User } from '../Dtos/User';

@Component({
  selector: 'map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements OnInit {
  constructor(
    private geocodingService: GeocodingService,
    private sharingService: SharingService
  ) {}

  @Input() addresses: depotsResult[] = [];
  @Input() selectedPlantId: number;
  @Input() viewAddress: depotsResult = null;
  @Input() viewPostalCode: string = '';
  @Input() EmployeeLocation: google.maps.LatLngLiteral;
  @Input() usingWorkLocation: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    this.EmployeeLocation = changes['EmployeeLocation']?.currentValue;
  }

  center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0,
  };

  markerPosition: {
    location: google.maps.LatLngLiteral;
    locationId: number;
  };

  //png marker for selected point
  selectedMarker = {
    path: 'M 256,480c-84.828,0-153.6-68.157-153.6-152.228c0-84.081, 153.6-359.782, 153.6-359.782s 153.6,275.702, 153.6,359.782C 409.6,411.843, 340.828,480, 256,480z M 255.498,282.245c-26.184,0-47.401,21.043-47.401,46.981c0,25.958, 21.217,46.991, 47.401,46.991c 26.204,0, 47.421-21.033, 47.421-46.991 C 302.92,303.288, 281.702,282.245, 255.498,282.245z',
    fillColor: 'blue',
    fillOpacity: 1,
    anchor: new google.maps.Point(255.498, -26.204),
    strokeWeight: 0,
    scale: 0.07,
    rotation: 180,
  };

  //defaulf png marker
  Marker = {
    path: 'M 256,480c-84.828,0-153.6-68.157-153.6-152.228c0-84.081, 153.6-359.782, 153.6-359.782s 153.6,275.702, 153.6,359.782C 409.6,411.843, 340.828,480, 256,480z M 255.498,282.245c-26.184,0-47.401,21.043-47.401,46.981c0,25.958, 21.217,46.991, 47.401,46.991c 26.204,0, 47.421-21.033, 47.421-46.991 C 302.92,303.288, 281.702,282.245, 255.498,282.245z',
    fillColor: 'red',
    fillOpacity: 1,
    anchor: new google.maps.Point(255.498, -26.204),
    strokeWeight: 0,
    scale: 0.07,
    rotation: 180,
  };

  selectedMarkerLocation: google.maps.LatLngLiteral = null;
  mapOptions: google.maps.MapOptions;

  currentLocMarker: google.maps.MarkerOptions;

  async ngOnInit(): Promise<void> {
    // await this.getEmployeeCurrentLocation();
    // if (this.EmployeeLocation.lat === 0) {
    //   await this.getServerLocation();
    // }
    this.currentLocMarker = {
      draggable: false,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        strokeColor: '#0096FF',
        scale: 7,
      },
      position: this.EmployeeLocation,
    };

    this.mapOptions = {
      disableDefaultUI: false,
      zoom: 10,
      center: this.EmployeeLocation,
      clickableIcons: true,
    };

    this.findAddress();
    //Selected card Event subscriber
    this.sharingService.selectedLocationEmitter.subscribe((id) => {
      this.goToSelectedMarker(id);
    });
  }

  // when the card on the map is selected the respective marker is centered on the map
  public goToSelectedMarker(id: number) {
    if (id !== 0) {
      this.selectedMarkerLocation = this.markerPositions?.filter(
        (p) => p?.locationId === id
      )[0]?.location;
    }
  }

  //When the marker is selected an event is triggered to highlight the respective card on the map
  onSelectMarker(_activeDepotId: number) {
    this.selectedMarkerLocation = this.markerPositions?.filter(
      (p) => p.locationId === _activeDepotId
    )[0]?.location;
    this.sharingService.selectedMapMarkerEmitter.emit(_activeDepotId);
  }

  markerPositions: {
    location: google.maps.LatLngLiteral;
    locationId: number;
  }[] = [];

  // async getEmployeeCurrentLocation() {
  //   const results = await firstValueFrom(
  //     this.EmployeeService.FetchEmployeeLocation().pipe(timeout(10000))
  //   );
  //   this.EmployeeLocation.lat = results?.Lat;
  //   this.EmployeeLocation.lng = results?.Lng;
  // }
  // async getServerLocation() {
  //   navigator.geolocation.getCurrentPosition(
  //     (position: GeolocationPosition) => {
  //       const point: google.maps.LatLngLiteral = {
  //         lat: position.coords.latitude ?? 0,
  //         lng: position.coords.longitude ?? 0,
  //       };
  //       //setting server location to employee location
  //       this.EmployeeLocation = point;
  //     },
  //     (error) => {},
  //     { enableHighAccuracy: true }
  //   );
  // }

  geocoderWorking = false;
  geolocationWorking = false;

  get isWorking(): boolean {
    return this.geolocationWorking || this.geocoderWorking;
  }

  findAddress() {
    this.geocoderWorking = true;

    for (var i = 0; i < this.addresses?.length; i++) {
      const address = this.addresses[i];
      this.geocodingService
        .getLocation(
          address.PlantAddress?.concat(
            ',',
            address.PlantCity,
            ',',
            address.PlantPostalCode
          )
        )
        .subscribe(
          (response: GeocoderResponse) => {
            if (response.status === 'OK' && response.results?.length) {
              const location = response.results[0];
              const loc: any = location.geometry.location;

              this.markerPosition = {
                location: { lat: loc.lat, lng: loc.lng },
                locationId: address.PlantId,
              };

              this.markerPositions.push(this.markerPosition);
            }
          },

          (err: HttpErrorResponse) => {
            console.error('geocoder error', err);
          }
        )
        .add(() => {
          this.geocoderWorking = false;
        });
    }
  }
}
