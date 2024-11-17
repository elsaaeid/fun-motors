import { Component } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component'; // Regular component
import { HeaderComponent } from './components/header/header.component'; // Standalone component
import { RouterOutlet } from '@angular/router';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component'; // Regular component
import { ToastComponent } from './components/toast/toast.component'; // Standalone component

@Component({
  selector: 'app-root',
  standalone: true, // Marking AppComponent as standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    HeaderComponent,
    RouterOutlet,
    ScrollToTopComponent,
    FooterComponent,
    ToastComponent
  ]
})
export class AppComponent {
  // Component logic here
}