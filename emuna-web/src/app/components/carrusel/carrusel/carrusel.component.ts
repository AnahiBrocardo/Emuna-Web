import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  TranslateService } from '@ngx-translate/core';
import { forkJoin, from, Subscription } from 'rxjs';
import { TranslationService } from '../../../services/translation.service';


@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css'
})


export class CarruselComponent implements OnInit{
  lang: string= '';
  langSubscription: Subscription | undefined;
  textoItem1: string = this.lang === 'es' 
  ? 'Descubre el arte del crochet, donde cada punto cuenta una historia' 
  : 'Discover the art of crochet, where every stitch tells a story';

texto2Item1: string = this.lang === 'es' 
  ? 'y transforma hilos en sueños tejidos con tus manos' 
  : 'and turn threads into dreams crafted by your hands';

textoItem2: string = this.lang === 'es' 
  ? 'Explora patrones únicos y creativos' 
  : 'Explore unique and creative patterns';

texto2Item2: string = this.lang === 'es' 
  ? 'que despertarán tu inspiración y amor por lo hecho a mano' 
  : 'that awaken your inspiration and love for handmade beauty';

  constructor(private translationService: TranslationService, private translate: TranslateService) {}

  ngOnInit(): void {
    this.lang= this.translationService.getCurrentLang();
    
    this.langSubscription = this.translate.onLangChange.subscribe(() => {
      this.lang= this.translationService.getCurrentLang();
    });
  }

  ngOnDestroy(): void {
    this.langSubscription?.unsubscribe();
  }

 

}
