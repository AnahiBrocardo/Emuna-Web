import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = 'en';

  langChange$: any;

  constructor(private translateService: TranslateService, private http: HttpClient) {
    const savedLang = localStorage.getItem('language') || 'en';
    this.currentLang = savedLang;

    this.translateService.setDefaultLang('en');
    this.translateService.use(savedLang); 
     
    this.loadTranslations('en');
    this.loadTranslations('es');
  }

  async setLang(lang: string): Promise<void> {
    this.currentLang = lang;
    this.translateService.use(lang);
    localStorage.setItem('language', lang);
    await this.loadTranslations(lang);
  }

  async translate(key: string): Promise<string> {
    await this.loadTranslations(this.getCurrentLang());
    return this.translateService.instant(key); 
  }

  getCurrentLang(): string {
    return this.translateService.currentLang || 'en';
  }

  private async loadTranslations(lang: string): Promise<void> {
    const translations = await firstValueFrom(this.http.get(`assets/data/${lang}.json`));
    this.translateService.setTranslation(lang, translations, true);
  }

  getTranslations(): Observable<any> {
    return this.http.get(`/assets/data/${this.currentLang}.json`);
  }
}
