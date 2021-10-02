import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {AuthFacade, IAuthState, IUser} from "@mfe/auth";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {filter, shareReplay, switchMap, take, takeUntil} from "rxjs/operators";
import {UserService} from "../../../bootstrap/services/user.service";

@Component({
  selector: 'mfe-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit, OnDestroy {
  private destroyed$: Subject<void> = new Subject<void>();
  user$: Observable<IAuthState> = this.authFacade.getActiveUser().pipe(shareReplay(1));
  userDetailsForm: FormGroup;
  roles: Array<{ display: string, code: string }> = [
    {
      code: 'adm',
      display: 'Admin',
    },
    {
      code: 'beta',
      display: 'Beta tester',
    }
  ];

  constructor(
    private authFacade: AuthFacade,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.user$.pipe(
      filter(user => user.authorized),
      take(1)
    ).subscribe(user => {
      this.initForm(user);
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private initForm(user: IUser) {
    const idControl = new FormControl(user.id);
    idControl.disable();
    this.userDetailsForm = this.formBuilder.group({
      id: idControl,
      name: new FormControl(user.name),
      roles: new FormControl(user.roles),
    } as Record<keyof IUser, FormControl>)
    this.subscribeToChanges();
  }

  private subscribeToChanges(){
    this.userDetailsForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$.asObservable()),
        switchMap(value => this.userService.setUser(this.userDetailsForm.getRawValue().id, value))
      ).subscribe()
  }
}
