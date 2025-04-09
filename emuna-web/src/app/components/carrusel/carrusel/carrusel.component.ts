import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

interface SlideContent {
  title: string;
  description: string;
}


@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css'
})



export class CarruselComponent implements OnInit, OnDestroy{
  slides: SlideContent[] = [];
  langSubscription: Subscription | undefined;
  background = 'url("assets/carrousel/background.png")';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.loadItems();
    this.langSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadItems();
    });
  }

  ngOnDestroy(): void {
    this.langSubscription?.unsubscribe();
  }

  getCurrentLang(): string {
    return this.translate.currentLang || 'en';
  }

  loadItems(): void {
    const lang = this.getCurrentLang();

    const translations: { [lang: string]: SlideContent[] } = {
      en: [
        { title: 'Pattern Testing', description: 'We conduct thorough tests to ensure the effectiveness of your patterns.' },
        { title: 'Pattern Design', description: 'We design custom patterns or the ones you already have on the page.' },
        { title: 'Pattern Sales', description: 'Buy exclusive patterns for your project or business.' },
      ],
      es: [
        { title: 'Pruebas de Patrones', description: 'Realizamos pruebas exhaustivas para garantizar la efectividad de tus patrones.' },
        { title: 'Diseño de Patrones', description: 'Diseñamos patrones personalizados o usamos los que ya tengas.' },
        { title: 'Venta de Patrones', description: 'Comprá patrones exclusivos para tu proyecto o emprendimiento.' },
      ]
    };

    this.slides = translations[lang] || translations['en'];
  }
}
