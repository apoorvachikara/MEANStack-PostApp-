import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { PostsService } from '../postservice/posts.service';
import { AuthenticationModel } from '../../auth/authentication.model';
import { inflate } from 'zlib';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticated: boolean = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: NodeJS.Timer;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private postsService: PostsService
  ) { }

  public getToken() {
    return this.token;
  }

  public getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  public isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  public autoAuthData() {
    const authInformation = this.getAuthDataOnReload();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expiration.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setTimerForAuth(expiresIn / 1000);
      this.authStatusListener.next(true);
      return ;
    }

  }

  public createUser(email: string, password: string) {

    const user: AuthenticationModel = { email: email, password: password }
    this.httpClient.post<{ message: string, result: AuthenticationModel }>("http://localhost:3000/api/user/signup", user)
      .subscribe(response => {
        console.log(response);
      })
  }

  public loginUser(email: string, password: string) {
    const user: AuthenticationModel = { email: email, password: password }
    this.httpClient.post<{ token: string, expires: number }>('http://localhost:3000/api/user/login', user)
      .subscribe((response) => {
        const token = response.token;
        const now = new Date();
        this.token = token;
        if (token) {
          const expiresIn = response.expires;
          const expiration = new Date(now.getTime() + expiresIn * 1000);
          this.setTimerForAuth(expiresIn);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.saveAuthData(token, expiration);
          this.postsService.rerouteAppToPostList();
        }
      })
  }

  public logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.postsService.rerouteAppToPostList();
  }

  private setTimerForAuth(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private getAuthDataOnReload() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    if (!token && !expiration) {
        return;
    }
    return {
        token: token,
        expiration: new Date(expiration)
    }
  }

  private saveAuthData(token: string, expirationdata: Date) {
      localStorage.setItem('token',token);
      localStorage.setItem('expiration', expirationdata.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
}
