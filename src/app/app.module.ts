import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import { AppRoutingModule } from "./app-routing.module";
import { AngularMaterial } from './angular-material.module';
import { PostsModule } from './posts/posts.module';import { AuthModule } from './auth/auth.module';

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header/header.component";
import { TestPipePipe } from "./test-pipe.pipe";
import { AuthenticationService } from "./services/authentication/authentication.service";
import { AuthinterceptorService } from "./services/interceptor/authinterceptor.service";
import { ErrorinterceptorService } from "./services/interceptor/errorinterceptor.service";
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TestPipePipe,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterial,
    PostsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthinterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorinterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
