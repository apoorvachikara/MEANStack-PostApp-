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
  public loadingSpinner : boolean = false;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap
          .subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postID')) {
                this.mode = 'edit';
                this.postID = paramMap.get('postID');
                this.loadingSpinner = true;
                this.postsService.getEditedPost(this.postID).subscribe( postData => {
                  this.post = { id: postData['posts'][0]['_id'], title: postData['posts'][0]['title'], content: postData['posts'][0]['content'] };
                  this.loadingSpinner = false;
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
      this.loadingSpinner = true;
      this.postsService.addPosts({
        title: form.value.title,
        content: form.value.content
      });
    } else {
      this.postsService.updatePost({
        title: form.value.title,
        content: form.value.content,
        id: this.post.id
      });
    }
    form.reset();
  }
}
