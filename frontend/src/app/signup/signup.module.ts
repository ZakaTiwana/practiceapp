import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms"

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import {FileValidator} from "../../validators/file-input.validator";
import { MinValidator } from "../../validators/number-input-min.validator";

@NgModule({
  declarations: [
    SignupComponent,
    MinValidator,
    FileValidator
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    FormsModule
  ]
})
export class SignupModule { }
