import { Component, OnInit, OnDestroy } from '@angular/core';

import { NgForm } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private authStatusSub: Subscription;

  public loadingSpinner: boolean = false;
  public email: string = '';
  public password: string = '';

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authStatusSub = this.authenticationService.getAuthStatusListener().subscribe( status => {
      this.loadingSpinner = false;
    });
  }

  public loginFormSave(formValues: NgForm) {
      if(formValues.invalid){
        return;
      }
      this.loadingSpinner = true;
      this.authenticationService.loginUser(formValues.value.email, formValues.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }


}
