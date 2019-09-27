import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public loadingSpinner: boolean = false;
  public email: string = '';
  public password: string = '';

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  public loginFormSave(formValues: NgForm) {
      if(formValues.invalid){
        return;
      }
      this.authenticationService.loginUser(formValues.value.email, formValues.value.password);
  }

}
