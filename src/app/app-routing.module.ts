import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostListsComponent } from "./posts/post-lists/post-lists.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";

const routes: Routes = [
  {
    path: "",
    component: PostListsComponent
  },
  {
    path: "create",
    component: PostCreateComponent
  },
  {
    path: "edit/:postID",
    component: PostCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {}
}
