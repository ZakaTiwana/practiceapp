import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string;
  
  constructor(private http: HttpClient) {
    this.url = environment.api + "user/";
  }

  addUser(user_data: FormData) {
    return this.http.post(this.url, user_data)
  }

  deleteUser(id: string) {
    return this.http.delete(this.url.concat(id));
  }
  UpdateUser(user: User) {
    return this.http.put(this.url.concat(user._id), user);
  }
  getUser(id: string) {
    return this.http.get(this.url.concat(id));
  }
  getAllUsers():Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
  userLogin(user:User){
    return this.http.post(this.url.concat("login"),user);
  }
}
