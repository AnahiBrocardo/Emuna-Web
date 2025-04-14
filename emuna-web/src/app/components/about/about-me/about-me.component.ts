import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TranslationService } from '../../../services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, from } from 'rxjs';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent implements OnInit{
  title: string= '';
  presentation: string ='';
  description1: string='';
  description2: string='';
  description3: string='';
  description4: string='';
  langSubscription: any;

  constructor(private translationService: TranslationService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadData();

    this.langSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadData();
    });
  }


  loadData(): void{
   forkJoin([
           from(this.translationService.translate('AboutMe.title')),
           from(this.translationService.translate('AboutMe.presentation')),
           from(this.translationService.translate('AboutMe.description1')),
           from(this.translationService.translate('AboutMe.description2')),
           from(this.translationService.translate('AboutMe.description3')),
           from(this.translationService.translate('AboutMe.description4'))
         ]).subscribe(([title, presentation, description1, description2,description3, description4]) => {
           this.title = title;
           this.presentation= presentation;
           this.description1=description1;
           this.description2=description2;
           this.description3=description3;
           this.description4=description4;
         });
         setTimeout(() => this.initFadeInObserver(), 0);
  }

  initFadeInObserver(): void {
    const images = document.querySelectorAll('.fade-in');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show'); // <- se quita si sale de pantalla
        }
      });
    }, {
      threshold: 0.2,
    });
  
    images.forEach(img => observer.observe(img));
  }
  
}
