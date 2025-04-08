import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, from } from 'rxjs';
import { DomElementSchemaRegistry } from '@angular/compiler';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patterns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patterns.component.html',
  styleUrl: './patterns.component.css'
})
export class PatternsComponent implements OnInit{
  
  title: string='';
  download: string='';
  note: string='';
  freePatterns: any =[];
  langSubscription: any;

  constructor(private translationService: TranslationService,
      private translate: TranslateService){}
  
  ngOnInit(): void {
    this.loadPatterns();

    this.langSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadPatterns();
    });
  }

  loadPatterns(): void {
        forkJoin([
          from(this.translationService.translate('FreePatterns.title')),
          from(this.translationService.translate('FreePatterns.download')),
          from(this.translationService.translate('FreePatterns.note')),
          from(this.translationService.translate('FreePatterns.items'))
        ]).subscribe(([title, download, note, items]) => {
          this.title = title;
          this.download=download;
          this.note= note;
          for(let i=0; i<items.length; i++){
           this.freePatterns[i]= items[i];
          }
        });
  
    }
}
