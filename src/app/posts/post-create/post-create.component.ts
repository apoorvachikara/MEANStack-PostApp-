import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { Post } from "../post.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  @Output() postEnteredValues = new EventEmitter<Post>();
  public enteredContent = "";
  public enteredTitle = "";

  constructor() {}

  ngOnInit() {}

  public savePost() {
    const post: Post = {
      title: this.enteredTitle,
      content: this.enteredContent
    };
    this.postEnteredValues.emit(post);
  }
}
