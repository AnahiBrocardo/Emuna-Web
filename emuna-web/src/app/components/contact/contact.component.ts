import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
   form= inject(FormBuilder);
   
   contactForm = this.form.group({
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [
      Validators.required, 
      Validators.minLength(5), 
      Validators.pattern(/\S{5,}/) // Al menos 5 caracteres sin contar espacios
    ]],
    message: ['', [
      Validators.required,
      Validators.minLength(10), 
      Validators.pattern(/\S{10,}/) // Al menos 10 caracteres sin contar espacios
    ]]
   });
   
  send(){
    if (this.contactForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields!',
      });
    }else{
// Simular envío de formulario
Swal.fire({
  icon: 'success',
  title: 'Message Sent!',
  text: 'We will get back to you soon.',
  confirmButtonColor: '#3085d6',
});

this.contactForm.reset();
    }
  
    
  }
}
