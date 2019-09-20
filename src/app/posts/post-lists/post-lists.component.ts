import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { PageEvent } from '@angular/material';

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
  public isLoading: boolean = false;
  public totalPost: number;
  public postPerPage: number = 2;
  public currentPage: number = 1;
  public pageSizeOptions: Array<number> = [1, 2, 4, 10];

  constructor(private postsService: PostsService) { }

  public ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postPerPage, this.currentPage);
    this.postSubscriptions = this.postsService.getPostsListListener().subscribe((newPost: { posts: Post[], count: number}) => {
      this.isLoading = false;
      this.postList = newPost.posts;
      this.totalPost = newPost.count;
    });
  }

  public onPageChange(pageEvent: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageEvent.pageIndex + 1;
    this.postPerPage = pageEvent.pageSize;
    this.postsService.getPosts(this.postPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.postSubscriptions.unsubscribe();
  }

  public deletePost(id) {
    this.postsService.deleteposts(id).subscribe(() => {
        this.postsService.getPosts(this.postPerPage, this.currentPage);
    })
  }

}
