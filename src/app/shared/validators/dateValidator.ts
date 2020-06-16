import {  FormControl} from '@angular/forms';
import { ValidationResult } from './CpfCnpjValidator';

export class DateValidator {

     public static validate(fc: FormControl) : ValidationResult {

        if (!fc.value){
            return (null);
        } 
        const dateString = fc.value.trim();

        const  isnull = (dateString === undefined ||  dateString === null || dateString === '');

        if (isnull) {
            return (null);
        }

        // First check for the pattern
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)){
            return ({dateNotValid: true});
        }

        // Parse the date parts to integers
        const parts = dateString.split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month === 0 || month > 12) {
            return ({dateNotValid : true});
        }

        const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

        // Adjust for leap years
        if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
            monthLength[1] = 29;
        }

        return (day > 0 && day <= monthLength[month - 1]) ? null : {dateNotValid: true};
    }
}
