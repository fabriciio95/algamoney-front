import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, NgModel } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div class="message">
     <p-message *ngIf="temErro()"
        severity="error" text="{{ text }}"></p-message>
    </div>
  `,
  styles: [`
   .message {
     margin-top: 5px !important;
   }
  `]
})
export class MessageComponent  {

  @Input() error!: string;
  @Input() control?: AbstractControl | FormControl | null;
  @Input() text!: string;


  temErro(): boolean {
    return this.control ? this.control.hasError(this.error) && this.control.dirty : true;
  }
}
