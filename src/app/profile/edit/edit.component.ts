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
  languages_: string[];
  langChange: boolean = false;
  langList = LANG_LIST;
  roleList = ROLES;
  isAdmin: boolean = false; // TODO: check if user can edit the role of a user


  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initUserForm();
    this.languages = new Set(this.user.lang);
    this.languages_ = [...this.user.lang] || [];
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
    console.log(this.user);

    this.userService.edit(this.user).subscribe(
      (res: any) => {
        this.snackBar.open('Changes succesfully saved!', null, {
          duration: 2000,
        });
        this.save(true);
        console.log(res);
      },
      (error) => {
        this.snackBar.open(error.message, null, { duration: 2000 });
        console.log(error);
        this.save(false);
      }
    );
  }

  save(save: boolean) {
    this.saveEvent.emit(save);
  }

  removeLang(element) {
    this.languages.delete(element);
    this.langChange = !this.equalsIgnoreOrder(this.languages, this.languages_);
  }

  addLang(lang: string) {
    this.languages.add(lang);
    this.langChange = !this.equalsIgnoreOrder(this.languages, this.languages_);
  }

  equalsIgnoreOrder(a, b) {
    if (a.length !== b.length) return false;
    const uniqueValues = new Set([...a, ...b]);
    for (const v of uniqueValues) {
      const aCount = a.filter(e => e === v).length;
      const bCount = b.filter(e => e === v).length;
      if (aCount !== bCount) return false;
    }
    return true;
  }

}
