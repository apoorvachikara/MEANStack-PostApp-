import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControlName, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { PostsService } from '../../services/postservice/posts.service';
import { Post } from '../post.model';
import { mimeType } from '../../validators/mime-type.validator';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AuthinterceptorService } from 'src/app/services/interceptor/authinterceptor.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  public mode = 'create';
  public postID: string;
  public post: Post;
  public loadingSpinner: boolean = false;
  public imagePreview: string | ArrayBuffer;

  private authSubs: Subscription;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.authSubs = this.authenticationService.getAuthStatusListener().subscribe( authStatus => {
      this.loadingSpinner = false;
    })
    this.initializeForm();
    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.has('postID')) {
          this.mode = 'edit';
          this.postID = paramMap.get('postID');
          this.loadingSpinner = true;
          this.postsService.getEditedPost(this.postID).subscribe(postData => {
            this.post = { id: postData['posts'][0]['_id'], title: postData['posts'][0]['title'], content: postData['posts'][0]['content'], imagePath: postData['posts'][0]['imagePath'], creator: null };
            this.form.setValue({
              title: postData['posts'][0]['title'],
              content: postData['posts'][0]['content'],
              image: postData['posts'][0]['imagepath'],
            });
            this.loadingSpinner = false;
          });

        } else {
          this.mode = 'create';
          this.postID = null;
        }
      });
  }

  public initializeForm() {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
  }


  public savePost() {

    if (this.form.invalid) {
      return;
    } else if (this.mode === 'create') {
      this.loadingSpinner = true;
      this.postsService.addPosts({
        title: this.form.value.title,
        content: this.form.value.content,
        imagePath: this.form.value.image
      });
    } else {
      this.postsService.updatePost({
        title: this.form.value.title,
        content: this.form.value.content,
        id: this.post.id,
        imagePath: this.form.value.image,
        creator: null
      });
    }
    this.form.reset();
  }

  public imagePicked(event: Event) {
    const file = (event.target as HTMLInputElement)['files'][0];
    const reader = new FileReader();
    console.log(file);
    this.form.patchValue({
      image: file
    });
    this.form.get('image').updateValueAndValidity();
    reader.onload = () => {
      this.imagePreview = reader.result as string | ArrayBuffer;
    };
    reader.readAsDataURL(file);
  }

  ngOnDestroy() {
    this.authSubs.unsubscribe();
  }

}
