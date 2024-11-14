import { Component } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { SliderContainerComponent } from './components/slider-container/slider-container.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent, SliderContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
}
