import { FormControl } from '@angular/forms';
import { ValidateCpfCnpjService } from '../services/validateCpfCnpj.service';

export interface ValidationResult {
  [key: string]: boolean;
}

export class CpfCnpjValidator {
  public static validateBothCpfAndCnpj(control: FormControl): ValidationResult {
    return ValidateCpfCnpjService.cpfAndCnpjIsValid(control.value) ? null : { invalid: true };
  }

  public static validateCnpj(control: FormControl): ValidationResult {
    return ValidateCpfCnpjService.cnpjIsValid(control.value) ? null : { invalid: true };
  }

  public static validateCpf(control: FormControl): ValidationResult {
    return ValidateCpfCnpjService.cpfIsValid(control.value) ? null : { invalid: true };
  }
}
