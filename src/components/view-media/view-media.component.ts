import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messagesService';
import { Message } from '../../models/message';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'view-media',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-media.component.html',
  styleUrl: './view-media.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.85s ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ViewMediaComponent implements OnInit {
  messages: Message[] = [];
  eventId: string = '';
  currentIndex = 0;
  isAnimating = false;

  constructor(
    private messagesService: MessagesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId')!;
    this.messagesService.getMessagesByEventId(this.eventId).subscribe({
      next: (data) => {
        this.messages = data;
        console.log(this.messages);
      },
    });
  }

  get currentPhoto() {
    return this.messages[this.currentIndex].mediaUrl;
  }

  get photoText() {
    return this.messages[this.currentIndex].userName;
  }

  previousPhoto() {
    if (this.currentIndex > 0) {
      this.fadeOutPhoto(() => {
        this.currentIndex--;
      });
    }
  }

  nextPhoto() {
    if (this.currentIndex < this.messages.length - 1) {
      this.fadeOutPhoto(() => {
        this.currentIndex++;
      });
    }
  }

  fadeOutPhoto(callback: () => void) {
    this.isAnimating = true;
    setTimeout(() => {
      callback();
    }, 500); // czas trwania animacji fade
  }

  onImageLoad() {
    this.isAnimating = false; // usunięcie klasy fade-out po załadowaniu nowego zdjęcia
  }
}
