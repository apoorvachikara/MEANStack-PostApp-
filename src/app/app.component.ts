import { Component, OnInit } from '@angular/core';

import {Post } from './posts/post.model';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private authenticationService: AuthenticationService
  ) {

  }

  ngOnInit() {
      this.authenticationService.autoAuthData()
  }
}
