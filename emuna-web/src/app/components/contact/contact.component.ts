import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, from } from 'rxjs';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

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
   file: String='';
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
              from(this.translationService.translate('Contact.file')),
              from(this.translationService.translate('Contact.notes'))
            ]).subscribe(([title, emailLabel, emailRequired,emailInvalid, subjectLabel,
              subjectPlaceholder,subjectRequired, subjectMinLenght, subjectMinCharacters,commentLabel,
              commentPlaceholder, commentRequired, commentMinLenght, commentMinCharacters,
              sendMesagge, file, notes
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
              this.file=file;
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
    image: [null as File | null]
   });
   


   send(form: any): void {

    if (this.contactForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields!',
      });
      return;
    }
  
    const formData = new FormData();
    formData.append('email', this.contactForm.get('email')?.value ?? '');
   formData.append('subject', this.contactForm.get('subject')?.value ?? '');
    formData.append('message', this.contactForm.get('message')?.value ?? '');

  
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    emailjs.send(
      'service_m05lske',
      'template_5wiurmf',
      {
       email: this.contactForm.get('email')?.value,
      subject: this.contactForm.get('subject')?.value,
       message: this.contactForm.get('message')?.value,
      image: this.selectedImage
  },
      { publicKey: 'xC-ELT_JUavCDsViQ' }
    ).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'We will get back to you soon.',
        confirmButtonColor: '#3085d6',
      });
  
      this.contactForm.reset();
      this.removeImage();
      this.imagePreviewUrl = null;
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  

  removeImage(): void {
    this.contactForm.patchValue({ image: null });
  this.contactForm.get('image')?.updateValueAndValidity();

  this.imagePreviewUrl = null;
  this.imageError = null;

  const fileInput = document.getElementById('file_input') as HTMLInputElement;
  if (fileInput) {
    fileInput.value = ''; 
  }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
  
      // (opcional) vista previa
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
  
      // limpiar error si había
      this.imageError = null;
    } else {
      this.selectedImage = null;
      this.imagePreviewUrl = null;
    }
  }
  
}