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
  ) { }

  onLogoutClick(): void {
    this.auth.signOut();
  }
  
  onAccountClick(): void {
    this.router.navigate(['account']);
  }

  onBackClick(): void {
    window.history.back();
  }
}
