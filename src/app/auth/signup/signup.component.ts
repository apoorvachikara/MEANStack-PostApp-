import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  public signupFormSave(form: NgForm) {
    if (form.invalid) {
      return;
    }
    else {
      this.authenticationService.createUser(form.value.email, form.value.password);
    }
  }

}
