import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
// import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  DefaultUrlSerializer,
  RouterModule,
  UrlSerializer,
  UrlTree,
} from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SearchComponent } from './search/search.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { HttpRequestInterceptor } from './interceptors/http.interceptors';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { MapViewComponent } from './map-view/map-view.component';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { DragScrollModule } from 'ngx-drag-scroll';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { ImpersonateComponent } from './impersonate/impersonate.component';
import { HeaderComponent } from './header/header.component';
import { SearchimpersonationComponent } from './searchimpersonation/searchimpersonation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeliveryComponent } from './delivery/delivery.component';
import { MatomoModule } from 'ngx-matomo';
import { MatomoConfiguration } from 'ngx-matomo';
import { SortPipe } from './pipes/sort.pipe';
import { HighlightSearchPipe } from './pipes/highlight-search.pipe';
import { SkuItemComponent } from './sku-item/sku-item.component';
import { SkuDepotsComponent } from './sku-depots/sku-depots.component';
import { ScrollIntoViewDirective } from './sku-depots/scroll-into-view.directive';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PhoneCardDialogComponent } from './phone-card-dialog/phone-card-dialog.component';
import { RecentOrderItemComponent } from './recent-order-item/recent-order-item.component';
import { DialogConfirmation } from './dialog-confirm/dialog-confirm.component';
import { environment } from 'src/environments/environment';
import { PictureCardDialogComponent } from './picture-card-dialog/picture-card-dialog.component';
import { DepotDetailsComponent } from './depot-details/depot-details.component';
import { PiamComponent } from './piam/piam.component';
export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  override parse(url: string): UrlTree {
    // Optional Step: Do some stuff with the url if needed.

    // If you lower it in the optional step
    // you don't need to use "toLowerCase"
    // when you pass it down to the next function
    return super.parse(url.toLowerCase());
  }
}

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FavouritesComponent,
    HistoryComponent,
    HomeComponent,
    SalesOrderComponent,
    MapViewComponent,
    LoginComponent,
    ImpersonateComponent,
    HeaderComponent,
    SearchimpersonationComponent,
    ScrollIntoViewDirective,
    DeliveryComponent,
    SortPipe,
    HighlightSearchPipe,
    SkuItemComponent,
    SkuDepotsComponent,
    SearchBarComponent,
    PhoneCardDialogComponent,
    RecentOrderItemComponent,
    DialogConfirmation,
    PictureCardDialogComponent,
    DepotDetailsComponent,
    PiamComponent,
  ],

  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    GoogleMapsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragScrollModule,
    MatChipsModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatomoModule.forRoot({
      scriptUrl: environment.MatomoUrl + 'matomo.js',
      trackers: [
        {
          trackerUrl: environment.MatomoUrl + 'matomo.php',
          siteId: environment.MatomoId,
        },
      ],
      routeTracking: {
        enable: true,
      },
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    // { provide: LocationStrategy,
    //   useClass: HashLocationStrategy}
    //   ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer,
    },
    SortPipe,
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogConfirmation, PhoneCardDialogComponent],
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
