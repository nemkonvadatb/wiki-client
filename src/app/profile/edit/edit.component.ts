import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { LANG_LIST } from 'src/app/shared/language.list';
import { ROLES, User, USER_DATA } from '../../shared/user.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input() user: User;
  @Output() saveEvent = new EventEmitter<boolean>();
  userDataLabels = USER_DATA;
  userForm: FormGroup;
  languages: Set<string>;
  languages_: Set<string>;
  langChange: boolean = false;
  langList = LANG_LIST;
  roleList = ROLES;
  isAdmin: boolean = false; 


  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.checkAdmin();
    this.initUserForm();
    this.languages = new Set(this.user.lang);
    this.languages_ = new Set(this.user.lang);
  }

  checkAdmin(): void {
    this.isAdmin = this.user.role == "admin" || this.user.role == "lector"    
  }

  initUserForm(): void {
    this.userForm = new FormGroup({
      username: new FormControl(this.user.name, [Validators.required]),
      academic_degree: new FormControl(this.user.academic_degree),
      specialization: new FormControl(this.user.specialization),
      institution: new FormControl(this.user.institution),
      lang: new FormControl(this.user.lang),
      role: new FormControl(this.user.role, [Validators.required]),
    });
    if (!this.isAdmin) {
      this.userForm.removeControl('role');
    }
  }

  submit(): void {
    this.user.name = this.userForm.get('username').value;
    this.user.academic_degree = this.userForm.get('academic_degree').value;
    this.user.specialization = this.userForm.get('specialization').value;
    this.user.institution = this.userForm.get('institution').value;
    this.user.lang = this.userForm.get('lang').value;
    if (this.isAdmin) {
      this.user.role = this.userForm.get('role').value;
    }
    this.user.lang = Array.from(this.languages);
    // console.log(this.user);

    this.userService.edit(this.user).subscribe(
      (res: any) => {
        this.snackBar.open('Changes succesfully saved!', null, {
          duration: 2000,
        });
        this.save(true);
        // console.log(res);
      },
      (error) => {
        this.snackBar.open(error.message, null, { duration: 2000 });
        console.error(error);
        this.save(false);
      }
    );
  }

  save(save: boolean) {
    this.saveEvent.emit(save);
  }

  removeLang(element) {
    this.languages.delete(element);
    this.langChange = !this.isSetsEqual(this.languages, this.languages_);
  }

  addLang(lang: string) {
    this.languages.add(lang);
    this.langChange = !this.isSetsEqual(this.languages, this.languages_);
  }

  isSetsEqual(a, b): boolean {
    return a.size === b.size && [...a].every(value => b.has(value));
  }

}
