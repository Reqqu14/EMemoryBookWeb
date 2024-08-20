import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddMediaComponent } from '../components/add-media/add-media.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddMediaComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'EMemoryBook123';
}
