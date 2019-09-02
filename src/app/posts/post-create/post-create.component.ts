import { Component, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";

import { PostsService } from "../../services/posts.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {

  constructor(
    private _postsService: PostsService,
  ) {}

  ngOnInit() {}

  public savePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this._postsService.addPosts({title: form.value.title, content: form.value.content});
    form.reset();
  }
}
