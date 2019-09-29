import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  public loadingSpinner: boolean = false;
  private authStatusSub: Subscription;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authStatusSub = this.authenticationService.getAuthStatusListener().subscribe( status => {
      this.loadingSpinner = false;
    });
  }

  public signupFormSave(form: NgForm) {
    if (form.invalid) {
      return;
    }
    else {
      this.loadingSpinner = true;
      this.authenticationService.createUser(form.value.email, form.value.password);
    }
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
