import { Component, OnInit } from '@angular/core';
import { IUser } from '@app/models';
import { AuthState, selectUser } from '@auth/store/auth.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'cobo-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  user$: Observable<IUser>;

  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
  }
}
