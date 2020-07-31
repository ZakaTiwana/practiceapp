import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';
import { UserDataSource } from "./all-user-tabledata";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  tableHeaders:String[] = ["image","name","email","age","dob"];
  tabledata:UserDataSource;
  constructor(private userService: UserService) { 
    // this.getAllUserData();
  }

  ngOnInit(): void {  
    this.tabledata = new UserDataSource(this.userService);
    this.tabledata.loadLessons(); 
  }

  // getAllUserData(){
  //   this.userService.getAllUsers().subscribe(
  //     (res)=>{  
  //       this.userData = res;
  //       this.formatData();
  //     },
  //     (err)=>{console.log(err.error.message)}
  //   )
  // }

  // formatData(){
  //   for (const val of this.userData) {
  //     let obj = {};
  //     for (const key in val) {
  //       if (this.tableHeaders.includes(key)) {
  //         obj[key] = val[key];
  //       }
  //     }
  //     this.tabledata.push(obj);
  //   }
  // }

}
