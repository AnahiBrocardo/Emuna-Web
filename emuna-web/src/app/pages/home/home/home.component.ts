import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar/navbar.component';
import { AboutMeComponent } from '../../../components/about/about-me/about-me.component';
import { CarruselComponent } from '../../../components/carrusel/carrusel/carrusel.component';
import { ServicesComponent } from '../../../components/services/services.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, AboutMeComponent, CarruselComponent, ServicesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
