import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PostCreateComponent } from "./post-create/post-create.component";
import { PostListsComponent } from "./post-lists/post-lists.component";
import { AngularMaterial } from '../angular-material.module';
import { RouterModule } from '@angular/router';

@NgModule({

    declarations: [
        PostCreateComponent,
        PostListsComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        AngularMaterial
    ],
    exports: [
        PostCreateComponent,
        PostListsComponent,
    ]
})
export class PostsModule {

}