import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TraductionService {
  private currentLang = 'en';

  langChange$: any;
  constructor(private translateService: TranslateService, private http: HttpClient) {
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');

    this.loadTranslations('en');
    this.loadTranslations('es');
  }

  async setLang(lang: string): Promise<void> {
    this.translateService.use(lang);
    await this.loadTranslations(lang);
  }

  async translate(key: string): Promise<string> {
    await this.loadTranslations(this.getCurrentLang());
    return this.translateService.instant(key); 
  }

  getCurrentLang(): string {
    return this.translateService.currentLang || 'es';
  }

  private async loadTranslations(lang: string): Promise<void> {
    const translations = await firstValueFrom(this.http.get(`assets/data/${lang}.json`));
    this.translateService.setTranslation(lang, translations, true);
  }

  getTranslations(): Observable<any> {
    return this.http.get(`/assets/data/${this.currentLang}.json`);
  }
}
