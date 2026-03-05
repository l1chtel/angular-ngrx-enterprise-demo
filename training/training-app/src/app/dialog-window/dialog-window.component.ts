import { Component,  Inject, input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MATERIAL_MODULES } from '../Imports/Imports';

@Component({
  selector: 'app-dialog-window',
  standalone: true,
  imports: [MATERIAL_MODULES],
  templateUrl: './dialog-window.component.html',
  styleUrl: './dialog-window.component.scss'
})
export class DialogWindowComponent {
 constructor(public dialogRef: MatDialogRef<DialogWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: string }) {}

 onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
