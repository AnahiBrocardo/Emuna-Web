import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../../services/translation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{
  titleES: string ='BIENVENIDO A EMUNA';
  titleEN: string ='WELCOME TO EMUNA';
  descriptionES: string='  Donde el arte del crochet cobra vida ';
  descriptionEN: string='  Where the art of crochet comes to life';
    noteES: string=' Tejer es crear, conectar y sanar';
  noteEN: string=' Knitting is creating, connecting, and healing';

  lang: string= '';
  langSubscription: any;

    constructor(private translationService: TranslationService, private translate: TranslateService) {}
  
    ngOnInit(): void {
      this.lang= this.translationService.getCurrentLang();
      
      this.langSubscription = this.translate.onLangChange.subscribe(() => {
        this.lang= this.translationService.getCurrentLang();
      });
    }
}
