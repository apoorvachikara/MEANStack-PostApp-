import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { map, count } from "rxjs/operators";
import { Router } from '@angular/router';

import { Post } from "../../posts/post.model";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }
  private posts: Post[] = [];
  private postsUpdates: Subject<{posts: Post[], count: number}> = new Subject<{posts: Post[], count: number}>();

  public getPosts(postPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postPerPage}&page=${currentPage}`;
   
    this.httpClient
      .get<{ message: string; posts: any; count: number}>(
        "http://localhost:3000/api/posts" + queryParams
      )
      .pipe(map(postData => {
        return {posts: postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagepath
          }
        }),
        count: postData.count  
      }
      })
      )
      .subscribe((transformedPost: {posts: Post[], count: number}) => {
        console.log(transformedPost);
        this.posts = transformedPost.posts;
        this.postsUpdates.next({posts: [...this.posts], count: transformedPost.count});
      });
  }

  public getPostsListListener(): Observable<{posts: Post[], count: number}> {
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
        this.rerouteAppToPostList();
      });
  }
  public deleteposts(id) {
      return this.httpClient.delete<{ message: string }>('http://localhost:3000/api/posts/' + id)
  }

  public rerouteAppToPostList() {
    this.router.navigate(['/']);
  }

}
