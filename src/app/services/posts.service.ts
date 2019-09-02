import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { Post } from "../posts/post.model";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor( private httpClient: HttpClient) {}
  private posts: Post[] = [];
  private postsUpdates: Subject<Post[]> = new Subject<Post[]>();

  public getPosts() {
    this.httpClient.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
        .subscribe((posts) => {
            this.posts = posts.posts;
            this.postsUpdates.next([...this.posts]);
        });
  }

  public getPostsListListener(): Observable<Post[]> {
    return this.postsUpdates.asObservable();
  }

  public addPosts(posts) {
    const post: Post = { id: null, title: posts.title, content: posts.content };

    this.httpClient.post<{message: string}>('http://localhost:3000/api/posts', post)
        .subscribe((response) => {
            console.log(response.message);
            this.posts.push(post);
            this.postsUpdates.next([...this.posts]);
        });
  }
}
