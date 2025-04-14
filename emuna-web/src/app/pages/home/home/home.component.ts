import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AboutMeComponent } from '../../../components/about/about-me/about-me.component';
import { CarruselComponent } from '../../../components/carrusel/carrusel/carrusel.component';
import { ServicesComponent } from '../../../components/services/services.component';
import { ReviewsComponent } from '../../../components/reviews/reviews.component';
import { WelcomeComponent } from '../../../components/about/welcome/welcome.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AboutMeComponent, CarruselComponent, ServicesComponent, ReviewsComponent, WelcomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{


}
