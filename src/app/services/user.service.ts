import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  get(username: string): Observable<unknown> {
    return this.http.get('users/' + username);
  }

  create(user): Observable<unknown> {
    return this.http.post('users/create', user);
  }

  login(user): Observable<unknown> {
    return this.http.post('users/login', user);
  }

  edit(user: User): Observable<unknown> {
    return this.http.put('users/update', user);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
