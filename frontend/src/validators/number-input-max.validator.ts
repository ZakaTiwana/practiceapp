import {Directive, Input} from "@angular/core";
import {NG_VALIDATORS, Validator,AbstractControl,ValidatorFn , ValidationErrors} from "@angular/forms";

@Directive({
    selector: "[maxRequired]",
    providers: [
        { provide: NG_VALIDATORS, useExisting: MaxValidator, multi: true },
    ]
})
export class MaxValidator implements Validator {
    @Input()max:Number;    

    // logic for custome validation
    validateMaxMax(max:Number): ValidatorFn {
      return (c: AbstractControl):ValidationErrors| null  => {
          return c.value > max? { "max" : {"requiredMax":max}} : null
        };
    }

    // Validator Class Funtion
    validate(c: AbstractControl): ValidationErrors|null {
      return this.validateMaxMax(this.max)(c);
    }
}