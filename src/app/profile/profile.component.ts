import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { USER_DATA, User } from './user.model';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  username: string = 'Név';
  user: User;
  userSubs: Subscription;
  edit: boolean = false;
  userDataLabels = USER_DATA;
  img = 'https://material.angular.io/assets/img/examples/shiba1.jpg';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const userId = '' + localStorage.getItem('user-id'); // vagy majd az urlből:  profile/:id
    this.userSubs = this.userService.get(userId).subscribe(
      (result) => {
        console.log(result);
        const userInfo = result[0];
        this.username = userInfo.name;

        this.user = {
          id: userInfo._id,
          name: userInfo.name,
          password: userInfo.password,
          email: userInfo.email,
          role: userInfo.role,
          specialization: userInfo.specialization,
          institution: userInfo.institution,
          academicDegree: userInfo.academicDegree,
          userLang: userInfo.userLang,
          articleParticipant: userInfo.articleParticipant,
          numberOfArticles: userInfo.articleParticipant?.length(),
          registeredAt: null //TODO:
        }
        console.log(this.user);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.userSubs) {
      this.userSubs.unsubscribe();
    }
  }

  editData() {
    this.edit = true;
  }

  saveChanges(save: boolean) {
    if (save) {
      // TODO:
      //  valami popup ha sikeres a mentés
      this.ngOnInit();
      this.edit = false;
    } else {
      this.edit = false;
    }
  }

}
