import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cobo-yes-no-dialog',
  templateUrl: './yes-no-dialog.html',
  styleUrls: ['./yes-no-dialog.scss'],
  imports: [MatDialogModule, MatButtonModule],
})
export class YesNoDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; text: string },
    private dialogRef: MatDialogRef<YesNoDialog>
  ) {}

  close(isYes: boolean) {
    this.dialogRef.close(isYes);
  }
}
