import { UserService } from './../services/user.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  registrationForm: FormGroup;

  isLoginActive = true;
  userSubs: Subscription;
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetLoginForm();
  }

  ngOnDestroy(): void {
    if (this.userSubs) {
      this.userSubs.unsubscribe();
    }
  }

  resetLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

  resetRegistrationForm(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordAgain: new FormControl(''),
      /* role: new FormControl(''),
      specialization: new FormControl(''),
      institution: new FormControl(''),
      academic_degree_id: new FormControl(''),
       */
    });
  }

  setIsLoginActive(): void {
    if (this.isLoginActive) {
      this.resetRegistrationForm();
    } else {
      this.resetLoginForm();
    }
    this.isLoginActive = !this.isLoginActive;
  }

  submit(): void {
    if (this.isLoginActive) {
      this.loginUser();
    } else {
      if (
        this.registrationForm.value.password ===
        this.registrationForm.value.passwordAgain
      ) {
        this.createUser({
          email: this.registrationForm.value.email,
          name: this.registrationForm.value.name,
          password: this.registrationForm.value.password,
        });
      } else {
        this.registrationForm.controls.passwordAgain.setErrors({
          incorrect: true,
        });
      }
    }
  }

  createUser(user): void {
    this.userSubs = this.userService.create(user).subscribe(
      (res: any) => {
        this.snackBar.open('Successful registration!', null, {
          duration: 2000,
        });
        setTimeout(() => {
          this.setIsLoginActive();
        }, 1500);
      },
      (error) => {
        this.snackBar.open(error.message, null, { duration: 2000 });
      }
    );
  }

  loginUser(): void {
    this.userSubs = this.userService
      .login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe(
        (res: any) => {
          /* localStorage.setItem('id', res.id);
            localStorage.setItem('name', res.name); */
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        },
        (error) => {
          this.snackBar.open(error.message, null, { duration: 2000 });
        }
      );
  }
}
