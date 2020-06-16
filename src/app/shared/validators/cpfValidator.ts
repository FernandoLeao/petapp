import { AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { RegisterService } from '../services/register.service';

export function isCpfAlreadyExist(
        registerService: RegisterService): AsyncValidatorFn {

    return async (control: AbstractControl) => {

        if (!control.value) {
            return null;
        }
        const hascpf = await  registerService.hasCpf(control.value);
        if (hascpf) {
            return {duplicate: true};
        } else {
            return null;
        }

    };
}
