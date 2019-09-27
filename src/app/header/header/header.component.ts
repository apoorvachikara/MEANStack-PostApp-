import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private authSubscription: Subscription;
  public isUserAuthenticated: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.isUserAuthenticated = this.authenticationService.isUserAuthenticated();
    this.authSubscription = this.authenticationService.getAuthStatusListener().subscribe((userAuthenticationStatus) => {
        this.isUserAuthenticated = userAuthenticationStatus;
    });
  }

  public onLogout() {
    this.authenticationService.logout();
  }
  
  
  ngOnDestroy() {
      this.authSubscription.unsubscribe();
  }



}
