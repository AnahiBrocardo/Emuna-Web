import {  Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent  implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.addScrollObserver();
  }

  addScrollObserver(): void {
    const cards = document.querySelectorAll('.service-card');

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Aplica el retraso solo cuando la tarjeta es visible
          setTimeout(() => {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }, index * 500); // 200ms de retraso por cada tarjeta

          // Sigue observando la tarjeta para futuros triggers
          observer.observe(entry.target);
        } else {
          // Opcional: Hacer que la tarjeta vuelva a su estado inicial si sale de la vista
          entry.target.classList.remove('opacity-100', 'translate-y-0');
          entry.target.classList.add('opacity-0', 'translate-y-10');
        }
      });
    }, {
      threshold: 0.4 // Activar cuando el 20% de la tarjeta sea visible
    });

    cards.forEach(card => {
      observer.observe(card); // Observa todas las tarjetas
    });
  }
}
