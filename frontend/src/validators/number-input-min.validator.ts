import {Directive, Input} from "@angular/core";
import {NG_VALIDATORS, Validator,AbstractControl,ValidatorFn , ValidationErrors} from "@angular/forms";

@Directive({
    selector: "[minRequired]",
    providers: [
        { provide: NG_VALIDATORS, useExisting: MinValidator, multi: true },
    ]
})
export class MinValidator implements Validator {
    @Input()min:Number; 

    // logic for custome validation
    validateMinMax(min:Number): ValidatorFn {
      return (c: AbstractControl):ValidationErrors| null  => {
          return c.value < min? { "min" : {"requiredMin":min}} : null
        };
    }

    // Validator Class Funtion
    validate(c: AbstractControl): ValidationErrors|null {
      return this.validateMinMax(this.min)(c);
    }
}