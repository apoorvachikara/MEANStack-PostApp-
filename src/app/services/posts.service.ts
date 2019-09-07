import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Post } from "../posts/post.model";
import { post } from 'selenium-webdriver/http';

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private httpClient: HttpClient) {}
  private posts: Post[] = [];
  private postsUpdates: Subject<Post[]> = new Subject<Post[]>();

  public getPosts() {
    this.httpClient
      .get<{ message: string; posts: any }>(
        "http://localhost:3000/api/posts"
      )
      .pipe(map(postData => {
          return postData.posts.map(post => {
            return {
                title : post.title,
                content : post.content,
                id : post._id
            }
          })
      }))
      .subscribe((transformedPost: Post[]) => {
        this.posts = transformedPost;
        this.postsUpdates.next([...this.posts]);
      });
  }

  public getPostsListListener(): Observable<Post[]> {
    return this.postsUpdates.asObservable();
  }

  public addPosts(posts) {
    const post: Post = { id: null, title: posts.title, content: posts.content };

    this.httpClient
      .post<{ message: string, postID: string}>('http://localhost:3000/api/posts', post)
      .subscribe(response => {
        post.id = response.postID;
        this.posts.push(post);
        this.postsUpdates.next([...this.posts]);
      });
  }

  public deleteposts(id) {
      this.httpClient.delete('http://localhost:3000/api/posts/' + id)
        .subscribe((response: {message: string}) => {
            const updatePostList = this.posts.filter(post => post.id !== id);
            this.posts = updatePostList;
            this.postsUpdates.next([...this.posts]  );
        })
  }
}