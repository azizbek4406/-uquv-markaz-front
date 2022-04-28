import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    template: `
    <h1 matDialogTitle>{{title}}</h1>
    
    <mat-dialog-content>
       {{msg}}
    </mat-dialog-content>
    
    <mat-dialog-actions>
        <button mat-raised-button color="accent" matDialogClose>
          <mat-icon class="mat-18">close</mat-icon>
        Bekor qilish</button>
        <button mat-raised-button color="primary" (click)="ok()">
        <mat-icon class="mat-18" color="white">check</mat-icon>  
        Tasdiqlash</button>
        
    </mat-dialog-actions>
    `
  })
  export class ConfirmDialogComponent {
      title = '';
      msg = '';
      
        constructor(
          public dialogRef: MatDialogRef<ConfirmDialogComponent>,
          @Inject(MAT_DIALOG_DATA) public data: {title: string, msg: string},
        ) {
          this.title = data.title;
          this.msg = data.msg
        }
  
    ok() {
      this.dialogRef.close(true);
    }
  }