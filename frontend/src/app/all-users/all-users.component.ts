import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  userData : User[];
  tableHeaders:String[] = ["img","name","email","age","dob"];
  tabledata;
  constructor(private userService: UserService) { 
    this.getAllUserData();
  }

  ngOnInit(): void {  
  }

  getAllUserData(){
    this.userService.getAllUsers().subscribe(
      (res)=>{  
        this.userData = res;
      },
      (err)=>{console.log(err.error.message)}
    )
  }

  formatData(){

  }

}
