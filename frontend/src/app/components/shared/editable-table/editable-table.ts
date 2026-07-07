import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { YesNoDialog } from '@app/components';

@Component({
  selector: 'cobo-editable-table',
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './editable-table.html',
  styleUrl: './editable-table.scss',
})
export class EditableTable {
  @Input() set data(value: any[]) {
    const emptyRecord: any = {};
    for (const col of this.columns) {
      if (col.editable) {
        emptyRecord[col.key] = null;
      }
    }
    this.localData = [...value, emptyRecord];
  }
  localData: any[] = [];

  @Input() columns: { key: string; label: string; editable: boolean; type?: 'number' | 'date' }[] = [];
  @Output() save = new EventEmitter<any>();
  @Output() add = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  editingRowId: string | number;
  editBuffer: any = {};

  private dialog = inject(MatDialog);

  // Computed columns for table rendering
  get displayedColumns(): string[] {
    return [...this.columns.map((c) => c.key), 'actions'];
  }

  startEdit(row: any) {
    this.editingRowId = row.id;
    this.editBuffer = { ...row };
  }

  saveEdit(row: any) {
    // Remove non-editable cols to prevent errors on saving
    const editableData = { ...this.editBuffer };
    for (const col of this.columns) {
      if (!col.editable) {
        delete editableData[col.key];
      }
    }
    this.save.emit(editableData);
    this.editingRowId = null;
    this.editBuffer = {};
  }

  deleteRow(row: any) {
    this.dialog
      .open(YesNoDialog, {
        data: {
          title: 'Categorie verwijderen',
          text: 'Weet je zeker dat je de categorie wilt verwijderen?',
        },
      })
      .afterClosed()
      .subscribe((clickedYes) => {
        if (clickedYes) {
          this.delete.emit(row);
        }
      });
  }

  cancelEdit() {
    this.editBuffer = {};
    this.editingRowId = null;
  }
}
