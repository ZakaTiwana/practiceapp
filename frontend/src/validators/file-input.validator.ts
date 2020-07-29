import {Directive} from "@angular/core";
import {NG_VALIDATORS, Validator, FormControl,AbstractControl,ValidatorFn} from "@angular/forms";

@Directive({
    selector: "[requireFile][ngModel]",
    providers: [
        { provide: NG_VALIDATORS, useExisting: FileValidator, multi: true },
    ]
})
export class FileValidator implements Validator {
    
    constructor(){};
    validateFileFactory(c: FormControl): ValidatorFn {
      return (c: AbstractControl) => {
          return c.value == null || c.value.length == 0 ? { "required" : true} : null
        };
    }

    validate(c: FormControl): {[key: string]: any} {
      return this.validateFileFactory(c);
    }
}