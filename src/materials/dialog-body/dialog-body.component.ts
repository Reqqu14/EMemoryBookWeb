import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-body',
  standalone: true,
  imports: [MatIconModule, MatDialogModule],
  templateUrl: './dialog-body.component.html',
  styleUrl: './dialog-body.component.css',
})
export class DialogBodyComponent {}
