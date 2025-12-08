import { Component } from '@angular/core';
import { AdminCategory } from './category/admin-category';

import { MatTabsModule } from '@angular/material/tabs';
import { AdminLog } from './log/admin-log';

@Component({
  selector: 'cobo-admin',
  imports: [MatTabsModule, AdminCategory, AdminLog],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {}
