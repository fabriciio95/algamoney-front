import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appCampoColorido]'
})
export class CampoColoridoDirective {

  @HostBinding('style.backgroundColor')
  corDeFundo: string  = "transparent";

  @HostListener('focus')
   aoGanharFoco() {
      this.corDeFundo = 'blue';
   }

   @HostListener('blur')
   aoPerderFoco() {
    this.corDeFundo = 'transparent';
   }

}
