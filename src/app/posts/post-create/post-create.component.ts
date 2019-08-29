import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Post } from "../post.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  @Output() postEnteredValues = new EventEmitter<Post>();

  constructor() {}

  ngOnInit() {}

  public savePost(form: NgForm) {
    if (form.invalid) {
      return ;
    }
    const post: Post = {
      title: form.value.title,
      content: form.value.content
    };
    this.postEnteredValues.emit(post);
  }
}
