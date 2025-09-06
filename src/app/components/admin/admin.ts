import { Component } from '@angular/core';
import { AdminCategory } from './category/admin-category';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminLog } from './log/admin-log';

@Component({
  selector: 'cobo-admin',
  imports: [CommonModule, MatTabsModule, AdminCategory, AdminLog],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {}
