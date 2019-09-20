import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public loadingSpinner: boolean = false;
  public email: string = '';
  public password: string = '';

  constructor() { }

  ngOnInit() {
  }

  public loginFormSave(formValues: NgForm) {
    console.log(formValues.value);
  }

}
