import { Component } from '@angular/core';
import { ContactComponent } from '../../../app/components/contact/contact.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ContactComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent {

}
