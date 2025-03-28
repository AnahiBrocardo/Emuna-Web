import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar/navbar.component';
import { AboutMeComponent } from '../../../components/about/about-me/about-me.component';
import { CarruselComponent } from '../../../components/carrusel/carrusel/carrusel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, AboutMeComponent, CarruselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
