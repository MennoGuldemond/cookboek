import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cobo-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.scss'],
})
export class YesNoDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; text: string },
    private dialogRef: MatDialogRef<YesNoDialogComponent>
  ) {}

  close(isYes: boolean): void {
    this.dialogRef.close(isYes);
  }
}
