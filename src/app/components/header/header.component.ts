import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; 
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, BsDropdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
}
