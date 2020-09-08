import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, DeviceService } from '../../services';

@Component({
  selector: 'cobo-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {

  constructor(
    public auth: AuthService,
    public deviceService: DeviceService,
    private router: Router
  ) {}

  onUserClick(): void {
    this.router.navigate(['login']);
  }

  onBackClick(): void {
    window.history.back();
  }
}
