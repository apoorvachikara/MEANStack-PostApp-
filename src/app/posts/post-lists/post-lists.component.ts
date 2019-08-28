import { Component, OnInit, Input } from "@angular/core";

import { Post } from "../post.model";

@Component({
  selector: "app-post-lists",
  templateUrl: "./post-lists.component.html",
  styleUrls: ["./post-lists.component.css"]
})
export class PostListsComponent implements OnInit {
  public mockPosts = [
    // {title : 'Heading 1', content : 'content 1' },
    // {title : 'Heading 2', content : 'content 2' },
    // {title : 'Heading 3 ', content : 'content 3' },
  ];

  @Input() postList: Post[] = [];

  constructor() {}

  ngOnInit() {}
}
