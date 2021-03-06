import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import { PostsService } from '../postservice/posts.service';
import { AuthenticationModel } from '../../auth/authentication.model';


const BackendUrl: string = environment.apiUrl + 'user';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticated: boolean = false;
  private token: string;
  private userId: string;
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

  public getUserId() {
    return this.userId;
  }

  public getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  public isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  public autoAuthData() {
    const authInformation = this.getAuthDataOnReload();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expiration.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.isAuthenticated = true;
      this.setTimerForAuth(expiresIn / 1000);
      this.authStatusListener.next(true);
      return ;
    }

  }

  public createUser(email: string, password: string) {

    const user: AuthenticationModel = { email: email, password: password }
    this.httpClient.post<{ message: string, result: AuthenticationModel }>(`${BackendUrl}/signup`, user)
      .subscribe(response => {
        this.router.navigate(['/']);
      }, error => {
        this.authStatusListener.next(false);
      })    
  }

  public loginUser(email: string, password: string) {
    const user: AuthenticationModel = { email: email, password: password }
    this.httpClient.post<{ userId: string, token: string, expires: number }>(`${BackendUrl}/login`, user)
      .subscribe((response) => {
        const token = response.token;
        const now = new Date();
        this.token = token;
        if (token) {
          const expiresIn = response.expires;
          const expiration = new Date(now.getTime() + expiresIn * 1000);
          this.setTimerForAuth(expiresIn);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          this.saveAuthData(token, expiration, this.userId);
          this.postsService.rerouteAppToPostList();
        }
      }, error =>{
        this.authStatusListener.next(false);
      });
  }

  public logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
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
    const userId = localStorage.getItem('userId');
    if (!token && !expiration) {
        return;
    }
    return {
        token: token,
        expiration: new Date(expiration),
        userId: userId
    }
  }

  private saveAuthData(token: string, expirationdata: Date, userId: string) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('expiration', expirationdata.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiration');
  }
}
