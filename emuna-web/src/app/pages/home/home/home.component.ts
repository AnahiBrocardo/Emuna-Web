import { Component } from '@angular/core';
import { AboutMeComponent } from '../../../components/about/about-me/about-me.component';
import { CarruselComponent } from '../../../components/carrusel/carrusel/carrusel.component';
import { ServicesComponent } from '../../../components/services/services.component';
import { ReviewsComponent } from '../../../components/reviews/reviews.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AboutMeComponent, CarruselComponent, ServicesComponent, ReviewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
