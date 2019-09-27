import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuardService } from './services/authguards/auth-guard.service';

import { PostListsComponent } from "./posts/post-lists/post-lists.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


const routes: Routes = [
  {
    path: "",
    component: PostListsComponent
  },
  {
    path: "create",
    component: PostCreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "edit/:postID",
    component: PostCreateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule {
  constructor() {}
}
