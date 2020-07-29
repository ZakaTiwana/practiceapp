import { Component, OnInit } from '@angular/core';

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
    if(userForm.valid) this.disbaleSubmit = true;
  }

}
