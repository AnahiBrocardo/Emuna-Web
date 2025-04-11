import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, from } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit{

  productsArray: any[] = [];
  notes: string='';
  notes2: string='';
  langSubscription: any;
  currentLang: string ='';

  constructor(private translationService: TranslationService,
    private translate: TranslateService,
    private http: HttpClient
  ) {}

    ngOnInit(): void {
      this.loadProducts();
      this.currentLang= this.translate.currentLang;

      this.langSubscription = this.translate.onLangChange.subscribe(() => {
        this.currentLang= this.translate.currentLang;
        this.loadProducts();
      });
    }
  
    
     loadProducts(): void {
      forkJoin([
        from(this.translationService.translate('Products.notes')),
        from(this.translationService.translate('Products.notes2')),
        from(this.translationService.translate('Products.items'))
      ]).subscribe(([notes, notes2, products]) => {
        this.notes = notes;
        this.notes2=notes2;
        
        for(let i=0; i<products.length; i++){
         this.productsArray[i]= products[i];
        }
      });

  }
}

