import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
 
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

  goToPrev() {
    if (this.scrollPosition > 0) {
      this.scrollPosition -= this.scrollAmount;
    }
  }

  goToNext() {
    if (this.scrollPosition < this.reviewImages.length - this.scrollAmount) {
      this.scrollPosition += this.scrollAmount;
    }
  }
  
  
}
