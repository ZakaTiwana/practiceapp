import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  disbaleSubmit:Boolean = false;
  file:File;
  uploadForm:FormData;
  user:User;
  constructor(private userService:UserService) {
   }

  ngOnInit(): void {
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  registerUser(userForm){
    if(userForm.invalid) return;
    else {
      this.uploadForm = new FormData();
      this.disbaleSubmit = true;
      this.uploadForm.append("image",this.file);
      for (const key in userForm.value) {
        if (Object.prototype.hasOwnProperty.call(userForm.value, key)) {
          const element = userForm.value[key];
          if(key === "image") continue; // donot add image
          this.uploadForm.append(key,element);
        }
      }
      this.userService.addUser(this.uploadForm).subscribe(
        (res)=>{
          console.log(res);
        },
        (err)=>{
          this.disbaleSubmit = false;
          console.log(err.error.message)
        }
      );
    }
  }

  log = (x) => {console.log(x)};
}
