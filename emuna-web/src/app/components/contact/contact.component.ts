import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, from } from 'rxjs';

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
