import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { PostsService } from "../../services/posts.service";

import { Post } from "../post.model";

@Component({
  selector: "app-post-lists",
  templateUrl: "./post-lists.component.html",
  styleUrls: ["./post-lists.component.css"]
})
export class PostListsComponent implements OnInit, OnDestroy {
  public postList: Post[] = [];
  private postSubscriptions: Subscription;
  public isLoading : boolean = false;

  constructor(private postsService: PostsService) {}

  public ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postSubscriptions = this.postsService.getPostsListListener().subscribe((newPost: Post[]) => {
      this.isLoading = false;
      this.postList = newPost;
    });
  }

  ngOnDestroy() {
      this.postSubscriptions.unsubscribe();
  }

  public deletePost(id) {
        this.postsService.deleteposts(id);
  }

}
