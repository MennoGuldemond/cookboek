import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Log } from '@app/models';
import { LogService } from '@app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'cobo-admin-log',
  imports: [CommonModule, MatTableModule],
  templateUrl: './admin-log.html',
  styleUrl: './admin-log.scss',
})
export class AdminLog implements OnInit {
  logs: Observable<Log[]>;
  displayedColumns: string[] = ['message', 'level', 'createdAt'];

  private logService = inject(LogService);

  ngOnInit() {
    this.logs = this.logService.get(50, 0);
  }
}
