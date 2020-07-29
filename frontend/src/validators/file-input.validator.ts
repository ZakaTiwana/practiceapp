import {Directive} from "@angular/core";
import {NG_VALIDATORS, Validator, FormControl,AbstractControl,ValidatorFn, ValidationErrors} from "@angular/forms";

@Directive({
    selector: "[requireFile]",
    providers: [
        { provide: NG_VALIDATORS, useExisting: FileValidator, multi: true },
    ]
})
export class FileValidator implements Validator {
    
    // logic for custom validation
    validaterequireFile(): ValidatorFn {
        return (c: AbstractControl):ValidationErrors| null  => {
          return c.value == null || c.value.length == 0 ? { "required" : true} : null
          };
      }

    // Validator Class Funtion
    validate(c: AbstractControl): ValidationErrors|null {
        return this.validaterequireFile()(c);
      }
}