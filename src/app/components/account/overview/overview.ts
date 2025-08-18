import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { User } from '@app/models';

@Component({
  selector: 'cobo-account-overview',
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
})
export class AccountOverview {
  @Input() user: User;
}
