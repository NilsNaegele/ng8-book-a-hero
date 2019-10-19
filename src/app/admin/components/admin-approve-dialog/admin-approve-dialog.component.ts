import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-approve-dialog',
  templateUrl: './admin-approve-dialog.component.html',
  styleUrls: ['./admin-approve-dialog.component.scss']
})
export class AdminApproveDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>) { }

  ngOnInit() {
  }

}
