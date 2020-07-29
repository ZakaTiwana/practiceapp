import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms"

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import {FileValidator} from "../../validators/file-input-required.validator";
import { MinValidator } from "../../validators/number-input-min.validator";
import { MaxValidator } from "../../validators/number-input-max.validator";

@NgModule({
  declarations: [
    SignupComponent,
    MinValidator,
    MaxValidator,
    FileValidator
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    FormsModule
  ]
})
export class SignupModule { }
