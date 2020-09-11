import { Component } from '@angular/core';

import { AuthService } from '../../services';

@Component({
  selector: 'cobo-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  constructor(public auth: AuthService) { }

}
