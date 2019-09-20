import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from '@angular/router';

import { Post } from "../posts/post.model";
import { Title } from '@angular/platform-browser';


@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }
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
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagepath
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
    const postData = new FormData();
    postData.append('title', posts.title)
    postData.append('id', null)
    postData.append('content', posts.content)
    postData.append('image', posts.imagePath);


    this.httpClient
      .post<{ message: string, post: { [key: string]: any } }>('http://localhost:3000/api/posts', postData)
      .subscribe(response => {
        const post: Post = { id: null, title: response.post.title, content: response.post.content, imagePath: response.post.imagePath };
        post.id = response.post._id;
        this.posts.push(post);
        this.postsUpdates.next([...this.posts]);
        this.rerouteAppToPostList();
      });
  }

  public getEditedPost(id: string) {
    return this.httpClient.get<{ message: string, posts: Post }>('http://localhost:3000/api/posts/' + id);
  }

  public updatePost(post: Post) {
    let postData: Post | FormData;
    if( typeof post.imagePath === 'object') {
      postData = new FormData();
      postData.append('title', post.title)
      postData.append('content', post.content)
      postData.append('id', post.id)
      postData.append('image', post.imagePath)
    } else {
      postData = {...post};
    }

    this.httpClient.put<{ message: string, post: Post }>('http://localhost:3000/api/posts/' + post.id, postData)
      .subscribe((response: { message: string, post: Post }) => {
        const updatedPost = [...this.posts];
        const oldPostIndex = this.posts.findIndex(p => p.id === post.id);
        updatedPost[oldPostIndex] = post;
        this.posts = updatedPost;
        this.postsUpdates.next([...this.posts]);
        this.rerouteAppToPostList();
      });
  }
  public deleteposts(id) {
    this.httpClient.delete<{ message: string }>('http://localhost:3000/api/posts/' + id)
      .subscribe((response: { message: string }) => {
        const updatePostList = this.posts.filter(post => post.id !== id);
        this.posts = updatePostList;
        this.postsUpdates.next([...this.posts]);
      });
  }

  public rerouteAppToPostList() {
    this.router.navigate(['/']);
  }

}
