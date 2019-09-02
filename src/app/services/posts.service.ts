import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Post } from "../posts/post.model";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor() {}
  private posts: Post[] = [];
  private postsUpdates: Subject<Post[]> = new Subject<Post[]>();

  public getPosts(): Post[] {
    return [...this.posts];
  }

  public getPostsListListener(): Observable<Post[]> {
    return this.postsUpdates.asObservable();
  }

  public addPosts(posts) {
    const post = { title: posts.title, content: posts.content };
    this.posts.push(post);
    this.postsUpdates.next([...this.posts]);
  }
}
