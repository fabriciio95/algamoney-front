import { Component, Input, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

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
  @Input('control') ngModel!: NgModel;
  @Input() text!: string;


  temErro(): boolean {
    return this.ngModel.control.hasError(this.error) && this.ngModel.control.dirty;
  }
}
