import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation.service';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { Router } from '@angular/router';


@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent implements OnInit, OnDestroy{
  title: string = '';
  notes: string = '';
  questions: any = {};
  sectionKeys: string[] = [];
  language: string='';

  langSubscription: any;

  constructor(
    private translate: TranslateService,
    private translationService: TranslationService,
    private http: HttpClient,
    private router: Router
  ) {}


  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }


  ngOnInit(): void {
    this.loadQuestions();

    this.langSubscription = this.translate.onLangChange.subscribe((event) => {
      
      this.translationService.setLang(event.lang); 
      this.loadQuestions();
    });
  }


  loadQuestions(): void {
    from(this.translationService.translate('Questions')).subscribe((questions: any) => {
      this.title = questions.title;
      this.notes = questions.notes;
      this.questions = questions;


      this.sectionKeys = Object.keys(questions.sections);
      setTimeout(() => {
        initFlowbite();
      }, 100);
    });
  }

  navigateToContact():void{
    this.router.navigate(['/contact']);
  }

}
