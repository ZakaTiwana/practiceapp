import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

export class UserDataSource implements DataSource<User> {

    private userSubject = new BehaviorSubject<User[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private userService: UserService) {

    }

    connect(collectionViewer: CollectionViewer): Observable<User[]> {
        return this.userSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.userSubject.complete();
        this.loadingSubject.complete();
    }

    loadLessons() {
        this.loadingSubject.next(true);
        this.userService.getAllUsers()
            .subscribe(
                users => {
                    this.formateData(users);
                    this.userSubject.next(users)
                    this.loadingSubject.next(false);
                    console.log(users);
                },
                err =>  {
                    this.loadingSubject.next(false);
                    console.log(err); 
                });

    }
    formateData(users){
        for (let user of users) {
            user.dob = new Date(Date.parse(user.dob)).toISOString();
        }  
    }
}