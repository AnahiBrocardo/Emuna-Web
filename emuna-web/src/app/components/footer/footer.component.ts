import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{

 constructor(private router: Router,
  private translate: TranslateService) {}
  
 currentLang: string ='';
 langSubscription: any;

  ngOnInit(): void {
    this.currentLang= this.translate.currentLang;
    this.langSubscription = this.translate.onLangChange.subscribe(() => {
      this.currentLang= this.translate.currentLang;
    });
  }


  navigateToContact():void{
    this.router.navigate(['/contact']);
  }
}
