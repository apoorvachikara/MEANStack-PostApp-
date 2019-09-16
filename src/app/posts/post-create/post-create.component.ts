import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostsService } from '../../services/posts.service';
import {Post} from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  public mode = 'create';
  public postID: string;
  public post: Post;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap
          .subscribe((paramMap: ParamMap) => {
            console.log(paramMap);
            if (paramMap.has('postID')) {
                this.mode = 'edit';
                this.postID = paramMap.get('postID');
                this.postsService.getEditedPost(this.postID).subscribe( postData => {
                    this.post = { id: postData._id, title: postData.title, content: postData.content }
                });
            } else {
                this.mode = 'create';
                this.postID = null;
            }
          });
  }

  public savePost(form: NgForm) {
    if (form.invalid) {
      return;
    } else if (this.mode === 'create') {
      this.postsService.addPosts({
        title: form.value.title,
        content: form.value.content
      });
    } else {
      console.log(form.value);
      this.postsService.updatePost({
        title: form.value.title,
        content: form.value.content,
        id: this.post.id
      });
    }
    form.reset();
  }
}
