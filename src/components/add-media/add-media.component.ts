import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../services/eventService';
import { MessagesService } from '../../services/messagesService';
import { MatDialog, MatDialogActions } from '@angular/material/dialog';
import { DialogBodyComponent } from '../../materials/dialog-body/dialog-body.component';

@Component({
  selector: 'add-media',
  standalone: true,
  imports: [FormsModule, CommonModule, MatDialogActions],
  templateUrl: './add-media.component.html',
  styleUrl: './add-media.component.css',
})
export class AddMediaComponent {
  password: string = '';
  isAuthenticated: boolean = false;
  showError: boolean = false;
  isContentVisible: boolean = false;

  private correctPassword: string = 'admin';
  eventId: string = '';

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(
    private router: Router,
    private eventService: EventService,
    private messagesService: MessagesService,
    private matDialog: MatDialog
  ) {}

  checkPassword() {
    if (this.password === this.correctPassword) {
      this.isAuthenticated = true;
      this.showError = false;
      this.eventService.getEventId(this.password).subscribe({
        next: (id) => {
          this.eventId = id;
          setTimeout(() => {
            this.isContentVisible = true;
          }, 100);
        },
      });
    } else {
      this.showError = true;
    }
  }

  // Funkcja do otwierania okna wyboru pliku
  onUpload() {
    this.fileInput.nativeElement.click();
  }

  // Funkcja obsługująca wybrany plik
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Wybrano plik:', file.name);
      this.messagesService
        .uploadMessage(this.eventId, 'Dodano testowe zdjęcie', file)
        .subscribe({
          next: (response) => {
            console.log('File uploaded successfully', response);
          },
          error: (error) => {
            console.error('Error uploading file', error);
          },
        });
      // Tutaj możesz dodać logikę przesyłania pliku na serwer
    }
  }

  // Funkcja do przenoszenia na inną podstronę
  navigateToPage() {
    this.router.navigate(['/view-media', this.eventId]);
  }

  openHarmonogramy() {
    this.matDialog.open(DialogBodyComponent, {
      width: '550px',
      height: 'auto',
    });
  }
}
