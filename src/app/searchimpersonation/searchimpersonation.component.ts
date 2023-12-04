import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../Dtos/User';
import { AuthService } from '../services/auth.service';
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  catchError,
  map,
} from 'rxjs/operators';
import { Observable, of, OperatorFunction } from 'rxjs';
import { EmployeeService } from '../services/employee.service';
import { ROUTE_CONSTANTS } from '../utils/route-constants';

@Component({
  selector: 'app-searchimpersonation',
  templateUrl: './searchimpersonation.component.html',
  styleUrls: ['./searchimpersonation.component.css'],
})
export class SearchimpersonationComponent implements OnInit {
  User: User;
  @Input() name;
  searching = false;
  searchFailed = false;
  SearchImpersonateTxt;
  SelectedEmployee;

  constructor(
    public activeModal: NgbActiveModal,
    private AuthService: AuthService,
    private EmployeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.User = this.AuthService.UserDetails;
  }

  SearchEmployeeByKey: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.EmployeeService.SearchEmployees(term).pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    );

  inputFormatBandListValue(Employee: any) {
    return (
      Employee.FirstName + ' ' + Employee.LastName + ' (' + Employee.Pein + ')'
    );
  }
  resultFormatBandListValue(Employee: any) {
    return (
      Employee.FirstName + ' ' + Employee.LastName + ' (' + Employee.Pein + ')'
    );
  }

  OnSelectItem(Selecteditem: any) {
    this.SelectedEmployee = { ...Selecteditem.item };
  }

  OnBlur() {
    var ObjectType = typeof this.SearchImpersonateTxt;
    if (ObjectType == 'string' && this.SearchImpersonateTxt == '')
      this.SelectedEmployee = null;
    else this.SearchImpersonateTxt = this.SelectedEmployee;
  }

  OnImpersonate() {
    this.activeModal.close();
    this.AuthService.Impersonate(this.SelectedEmployee.Pein).subscribe(
      (User: any) => {
        window.location.reload();
      },
      () => {}
    );
  }

  StopImpersonation() {
    this.activeModal.close();
    this.AuthService.RemoveImpersonate().subscribe(
      () => {
        window.location.reload();
      },
      () => {}
    );
  }
}
