import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  disbaleSubmit:Boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  registerUser(userForm){
    console.log(userForm);
    console.log(userForm.submitted)
    console.log(userForm.form)
    console.log(userForm.valid)
    if(userForm.valid) this.disbaleSubmit = true;
  }

}
