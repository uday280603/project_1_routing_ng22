import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  imports: [MatCardModule, MatButtonModule],
  selector: 'app-get-confirm-component',
  styleUrl: './get-confirm-component.scss',
  templateUrl: './get-confirm-component.html',
})
export class GetConfirmComponent {
  message!: string;
  constructor(
    private _matRef: MatDialogRef<GetConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) data: string,
  ) {
    this.message = data;
  }

  onClose(flag : boolean){
    this._matRef.close(flag);
  }
}
