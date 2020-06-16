import { NgModule } from '@angular/core';
import { BrMaskerModule } from 'br-mask';
import { CpfCnpjValidatorDirective } from '../validators/validateCpfCnpjValidatorDirective';

@NgModule({
  imports: [
    BrMaskerModule
  ],
  exports: [
    BrMaskerModule
  ],
  declarations: [
    CpfCnpjValidatorDirective
  ],
  entryComponents: [
  ]
})
export class SharedModule { }
