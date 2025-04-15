import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, from } from 'rxjs';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{
   form= inject(FormBuilder);

   title: String ='';
   emailLabel: String ='';
   emailRequired: String ='';
   emailInvalid: String ='';
   subjectLabel: string='';
   subjectPlaceholder: String ='';
   subjectRequired: String ='';
   subjectMinLenght: String ='';
   subjectMinCharacters: String ='';
   commentLabel: string='';
   commentPlaceholder: String ='';
   commentRequired: String ='';
   commentMinLenght: String ='';
   commentMinCharacters: String ='';
   sendMesagge: String='';
   urlLabel: String='';
   notes: String='';
   imageError: string | null = null;
   imagePreviewUrl: string | null = null;
   selectedImage: File | null = null;

   langSubscription: any;

    constructor(private translationService: TranslationService,
       private translate: TranslateService
     ) {}
   
     ngOnInit(): void {
       this.loadData();
   
       this.langSubscription = this.translate.onLangChange.subscribe(() => {
         this.loadData();
       });
     }
   
     loadData(): void{
      forkJoin([
              from(this.translationService.translate('Contact.title')),
              from(this.translationService.translate('Contact.emailLabel')),
              from(this.translationService.translate('Contact.emailRequired')),
              from(this.translationService.translate('Contact.emailInvalid')),
              from(this.translationService.translate('Contact.subjectLabel')),
              from(this.translationService.translate('Contact.subjectPlaceholder')),
              from(this.translationService.translate('Contact.subjectRequired')),
              from(this.translationService.translate('Contact.subjectMinLenght')),
              from(this.translationService.translate('Contact.subjectMinCharacters')),
              from(this.translationService.translate('Contact.commentLabel')), 
              from(this.translationService.translate('Contact.commentPlaceholder')),
              from(this.translationService.translate('Contact.commentRequired')),
              from(this.translationService.translate('Contact.commentMinLenght')),
              from(this.translationService.translate('Contact.commentMinCharacters')),
              from(this.translationService.translate('Contact.sendMesagge')),
              from(this.translationService.translate('Contact.urlLabel')),
              from(this.translationService.translate('Contact.notes'))
            ]).subscribe(([title, emailLabel, emailRequired,emailInvalid, subjectLabel,
              subjectPlaceholder,subjectRequired, subjectMinLenght, subjectMinCharacters,commentLabel,
              commentPlaceholder, commentRequired, commentMinLenght, commentMinCharacters,
              sendMesagge, urlLabel, notes
            ]) => {
              this.title = title;
              this.emailLabel=emailLabel;
              this.emailRequired=emailRequired;
              this.emailInvalid=emailInvalid;
              this.subjectLabel= subjectLabel;
              this.subjectPlaceholder=subjectPlaceholder;
              this.subjectRequired=subjectRequired;
              this.subjectMinLenght=subjectMinLenght;
              this.subjectMinCharacters=subjectMinCharacters;
              this.commentLabel= commentLabel;
              this.commentPlaceholder=commentPlaceholder;
              this.commentRequired=commentRequired;
              this.commentMinLenght=commentMinLenght;
              this.commentMinCharacters=commentMinCharacters;
              this.sendMesagge=sendMesagge;
              this.urlLabel=urlLabel;
              this.notes=notes;

            });
     }
   
   contactForm = this.form.group({
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [
      Validators.required, 
      Validators.minLength(5), 
      Validators.pattern(/\S{5,}/) 
    ]],
    message: ['', [
      Validators.required,
      Validators.minLength(10), 
      Validators.pattern(/\S{5,}/) // Al menos 10 caracteres sin contar espacios
    ]],
    imageUrl: ['']
   });
   


   send(form: any): void {
    if (!this.isFormValid()) return;

    this.confirmSend().then((result) => {
      if (result.isConfirmed) {
        this.sendEmail();
      }
    });
  }
  
   confirmSend(): Promise<any> {
    const lang = this.translate.currentLang;
  
    const title = lang === 'en' ? 'Are you sure you want to send the message?' : '¿Estás seguro de enviar el mensaje?';
    const confirmButtonText = lang === 'en' ? 'Send' : 'Enviar';
    const cancelButtonText = lang === 'en' ? 'Cancel' : 'Cancelar';
  
    return Swal.fire({
      title,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    });
  }
  
   isFormValid(): boolean {
    const lang = this.translate.currentLang;
    if (this.contactForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: lang === 'en' ? 'Oops...' : 'Oops...',
        text: lang === 'en'
          ? 'Please complete all required fields!'
          : '¡Por favor completá todos los campos obligatorios!',
      });
      return false;
    }
  
    const imageUrl = this.contactForm.get('imageUrl')?.value;
    const imagePattern = /\.(jpg|jpeg|png|webp)$/i;
  
    if (imageUrl && !imagePattern.test(imageUrl)) {
      Swal.fire({
        icon: 'error',
        title: lang === 'en' ? 'Invalid image URL' : 'URL de imagen inválida',
        text: lang === 'en'
          ? 'Only PNG, JPG, or WebP images are allowed.'
          : 'Solo se permiten imágenes PNG, JPG o WebP.',
      });
      return false;
    }
  
    return true;
  }
  
   sendEmail(): void {
    const lang = this.translate.currentLang;
      
      const emailData = {
        email: this.contactForm.get('email')?.value,
        subject: this.contactForm.get('subject')?.value,
        message: this.contactForm.get('message')?.value,
        imageUrl: this.contactForm.get('imageUrl')?.value || ''
      };
    
      emailjs.send(
        environment.emailjs.serviceID,
        environment.emailjs.templateID,
        emailData,
        { publicKey: environment.emailjs.publicKey }
      ).then(() => {
        Swal.fire({
        icon: 'success',
        title: lang === 'en' ? 'Message sent!' : '¡Mensaje enviado!',
        text: lang === 'en' ? 'We will contact you soon.' : 'Nos contactaremos pronto.',
        confirmButtonColor: '#3085d6',
        });
        this.resetForm();
      }).catch((error) => {
        console.error('Error al enviar el mensaje:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: lang === 'en'
      ? 'There was a problem sending the message. Please try again later.'
      : 'Hubo un problema al enviar el mensaje. Intentá nuevamente más tarde.',
        });
      });
  
  }

  resetForm(): void {
    this.contactForm.reset();
    this.imagePreviewUrl = null;
  }
  

  removeImage(): void {
    this.imagePreviewUrl = null;
    this.contactForm.get('imageUrl')?.setValue('');
  }

  onImageUrlChange(): void {
    const url = this.contactForm.get('imageUrl')?.value;
  
    if (!url) {
      this.imageError = null;
      this.imagePreviewUrl = null;
      return;
    }
  
    const imageRegex = /\.(jpg|jpeg|png|webp)$/i;
  
    if (imageRegex.test(url)) {
      this.imagePreviewUrl = url;
      this.imageError = null;
    } else {
      this.imagePreviewUrl = null;
      this.imageError = '.jpg, .jpeg, .png o .webp.';
    }     
  }
  
}