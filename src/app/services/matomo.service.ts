import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatomoService {
  constructor(
    public route:Router
  ) { }

  MatomoTracking()
  {
    return this.route.events.pipe(filter(event => event instanceof NavigationStart))
    // .subscribe((event:NavigationStart) => {
    //   console.log(environment.BaseUrl+event.url)
    // });
  }
}
