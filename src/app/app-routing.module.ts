import { Component, NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
  UrlTree,
  DefaultUrlSerializer,
  UrlSerializer,
} from '@angular/router';
import { SearchComponent } from './search/search.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { PiamComponent } from './piam/piam.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { MapViewComponent } from './map-view/map-view.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { DepotDetailsComponent } from './depot-details/depot-details.component';
// import { AuthGuard } from './guards/auth.guard';
import { DeliveryComponent } from './delivery/delivery.component';
import { ROUTE_CONSTANTS } from './utils/route-constants';
import { SkuDepotsComponent } from './sku-depots/sku-depots.component';

const routes: Routes = [
  // {
  //   path: ROUTE_CONSTANTS.HOME,
  //   component: HomeComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: ROUTE_CONSTANTS.HOME_SOURCE,
    component: HomeComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: ROUTE_CONSTANTS.HOME_PIAM,
    component: PiamComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: ROUTE_CONSTANTS.SEARCH,
    component: SearchComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: ROUTE_CONSTANTS.SEARCH_RESULTS,
    component: SearchComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: ROUTE_CONSTANTS.FAVORITES,
    component: FavouritesComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: ROUTE_CONSTANTS.RECENT_ORDER_HISTORY,
    component: HistoryComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: ROUTE_CONSTANTS.SKU_DELIVERY,
    component: DeliveryComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: ROUTE_CONSTANTS.SKU_PICKUP_ORDER,
    component: SalesOrderComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: ROUTE_CONSTANTS.SKU_DETAILS,
    component: SkuDepotsComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: ROUTE_CONSTANTS.DEPOT_DETAILS,
    component: DepotDetailsComponent,
    // canActivate: [AuthGuard],
  },
  // { path: '**', redirectTo: 'home/ncms' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
