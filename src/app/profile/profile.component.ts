import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string = 'Név';
  userInfo = undefined; //ID, name, role ... minden
  userSubs: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userSubs = this.userService.get('' + localStorage.getItem('user-id')).subscribe(
      (result) => {
        console.log(result);
        this.userInfo = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return {key:key, value:obj[key]}});
}



}
