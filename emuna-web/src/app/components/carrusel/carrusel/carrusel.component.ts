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
  description1: string='';
  description2: string='';
  description3: string='';

  imageList = [
    '../../../../assets/carrousel/image1.jpg',
    '../../../../assets/carrousel/image2.jpg'
  ]

  currentImages: string[] = [this.imageList[0], this.imageList[1]];

  langSubscription: Subscription | undefined;

  constructor(private translationService: TranslationService,
    private translate: TranslateService
  ) {}

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
   forkJoin([
              from(this.translationService.translate('Header.description1')),
              from(this.translationService.translate('Header.description2')),
              from(this.translationService.translate('Header.description3')),
            ]).subscribe(([description1, description2,description3]) => {
              this.description1=description1;
              this.description2=description2;
              this.description3=description3;
            });
  }
}
