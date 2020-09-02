import { Component } from '@angular/core';
import { AuthService } from '../../services';

@Component({
  selector: 'cobo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(public auth: AuthService) {}

}
