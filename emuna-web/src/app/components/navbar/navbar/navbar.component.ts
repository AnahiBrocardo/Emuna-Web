import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TraductionService } from '../../../services/traduction.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  home: string= '';
  services: string='';
  freePatterns: string='';
  questions: string='';
  aboutMe: string='';
  contact: string='';

  constructor(private router: Router, private traducctionService: TraductionService) {}

  async ngOnInit(): Promise <void> {
    await this.setTranslations();
  }

  async setTranslations(): Promise<void> {
    this.home = await this.traduccionService.translate('Navbar.home');
    this.services = await this.traduccionService.translate('NAVBAR.PROYECTOS');
    this.freePatterns = await this.traduccionService.translate('NAVBAR.HABILIDADES');
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }

  navigateToContact():void{
    this.router.navigate(['/contact']);
  }

  navigateToPatterns():void{
    this.router.navigate(['/patterns']);
  }
}
