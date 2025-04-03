import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  language: string='';
  home: string= '';
  services: string='';
  freePatterns: string='';
  questions: string='';
  aboutMe: string='';
  contact: string='';

  constructor(private router: Router, private translationService: TranslationService) {}

  async ngOnInit(): Promise<void> {
    
    this.language= this.getCurrentLang();
    
    await this.setTranslations();
  }

  async setTranslations(): Promise<void> {
    this.home = await this.translationService.translate('Navbar.home');
    this.services = await this.translationService.translate('Navbar.services');
    this.freePatterns = await this.translationService.translate('Navbar.freePatterns');
    this.questions = await this.translationService.translate('Navbar.questions');
    this.aboutMe = await this.translationService.translate('Navbar.aboutMe');
    this.contact = await this.translationService.translate('Navbar.contact');
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }

  async toggleLanguage(): Promise<void> {
    const newLang = this.translationService.getCurrentLang() === 'en' ? 'es' : 'en';
    await this.translationService.setLang(newLang);
    this.language= newLang;
    await this.setTranslations(); 
  }

  navigateToContact():void{
    this.router.navigate(['/contact']);
  }

  navigateToPatterns():void{
    this.router.navigate(['/patterns']);
  }
  
  getCurrentLang(): string {
    return this.translationService.getCurrentLang();
  }
}
