import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, from } from 'rxjs';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit{
  title: string='';
  description: string='';
  ratingTitle1:string='';
  ratingTitle2: string='';
  ratingTitle3: string='';
  ratingTitle4: string='';
  note: string='';
  langSubscription: any;

  reviewImages = [
    'assets/reviews/review1.jpg',
    'assets/reviews/review2.jpg',
    'assets/reviews/review3.jpg',
    'assets/reviews/review5.jpg',
    'assets/reviews/review6.jpg',
    'assets/reviews/review7.jpg',
    'assets/reviews/review8.jpg',
    'assets/reviews/review9.jpg',
    'assets/reviews/review10.jpg',
    'assets/reviews/review11.jpg',
    'assets/reviews/review12.jpg',
    'assets/reviews/review13.jpg',
    'assets/reviews/review14.jpg'
  ];

  scrollAmount: number = 3; 
  scrollPosition: number = 0;
  visibleCount: number = 3;

  constructor(private translationService: TranslationService,
      private translate: TranslateService
    ) {}

  
  
  ngOnInit(): void {
      this.loadData();
      this.visibleCount = this.getVisibleCount();
      this.langSubscription = this.translate.onLangChange.subscribe(() => {
        this.loadData();
        this.visibleCount = this.getVisibleCount();
      });
    }
  
    loadData(): void{
     forkJoin([
             from(this.translationService.translate('Review.title')),
             from(this.translationService.translate('Review.description')),
             from(this.translationService.translate('Review.ratingTitle1')),
             from(this.translationService.translate('Review.ratingTitle2')),
             from(this.translationService.translate('Review.ratingTitle3')),
             from(this.translationService.translate('Review.ratingTitle4')),
             from(this.translationService.translate('Review.note'))
           ]).subscribe(([title, description, ratingTitle1,ratingTitle2, ratingTitle3, ratingTitle4, note]) => {
             this.title = title;
             this.description=description;
             this.ratingTitle1=ratingTitle1;
             this.ratingTitle2=ratingTitle2;
             this.ratingTitle3=ratingTitle3;
             this.ratingTitle4=ratingTitle4;
             this.note=note;
           });
    }
       
    

    getVisibleCount(): number {
      return window.innerWidth >= 768 ? 3 : 1;
    }
    // Función para avanzar en las imágenes
    nextImage() {
      if (this.scrollPosition < this.reviewImages.length - this.visibleCount) {
        this.scrollPosition++;
      }
    }
  
    // Función para retroceder en las imágenes
    prevImage() {
      if (this.scrollPosition > 0) {
        this.scrollPosition--;
      }
    }
  
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.visibleCount = this.getVisibleCount();
    }
}
