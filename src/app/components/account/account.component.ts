import { Component, OnInit } from '@angular/core';
import { AuthState, selectAuthState } from '@auth/store/auth.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'cobo-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  authState$: Observable<AuthState>;

  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.authState$ = this.store.select(selectAuthState);
  }
}
