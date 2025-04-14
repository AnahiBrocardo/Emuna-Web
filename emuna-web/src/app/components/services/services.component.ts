import { CommonModule } from '@angular/common';
import {  Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, from } from 'rxjs';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent  implements OnInit {
  itemsArray: any[] = [];
  title: string='';
  langSubscription: any;

  constructor(private translationService: TranslationService,
      private translate: TranslateService
    ) {}

  ngOnInit(): void {

    this.loadItems();

    this.langSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadItems();
    });
  }

    loadItems(): void {
        forkJoin([
          from(this.translationService.translate('Services.title')),
          from(this.translationService.translate('Services.items'))
        ]).subscribe(([title, items]) => {
          this.title = title;
          
          for(let i=0; i<items.length; i++){
           this.itemsArray[i]= items[i];
          }
        });
    }

 
}
