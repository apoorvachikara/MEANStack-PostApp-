import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthRoutingModule } from './auth/auth-routing.module';

import { AuthGuardService } from './services/authguards/auth-guard.service';

import { PostListsComponent } from "./posts/post-lists/post-lists.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";



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
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule {
  constructor() { }
}
