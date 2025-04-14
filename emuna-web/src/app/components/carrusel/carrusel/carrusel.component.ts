import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {  TranslateService } from '@ngx-translate/core';
import { forkJoin, from, Subscription } from 'rxjs';
import { TranslationService } from '../../../services/translation.service';
import Carousel from 'flowbite/lib/esm/components/carousel';


@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css'
})


export class CarruselComponent implements OnInit, OnDestroy{
  lang: string= '';
  langSubscription: Subscription | undefined;
  slides = [
    {
      img: 'assets/carrousel/image.jpg',
      textEN: 'Discover the art of crochet, where every stitch tells a story',
      textES: 'Descubre el arte del crochet, donde cada punto cuenta una historia',
      subtextEN: 'and turn threads into dreams crafted by your hands',
      subtextES: 'y transforma hilos en sueños tejidos con tus manos'
    },
    {
      img: 'assets/carrousel/image1.jpg',
      textEN: 'Explore unique and creative patterns',
      textES: 'Explora patrones únicos y creativo',
      subtextEN: 'that awaken your inspiration and love for handmade beauty',
      subtextES: 'que despertarán tu inspiración y amor por lo hecho a mano'
    }
  ];

  currentIndex = 0;
  intervalId: any;

  constructor(private translationService: TranslationService, private translate: TranslateService) {}
  

  ngOnInit(): void {
    this.lang= this.translationService.getCurrentLang();
    this.startAutoSlide();
    
    this.langSubscription = this.translate.onLangChange.subscribe(() => {
      this.lang= this.translationService.getCurrentLang();
      this.startAutoSlide();
    });
  }

  ngOnDestroy(): void {
    this.langSubscription?.unsubscribe();
  }
  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 7000);
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

}
