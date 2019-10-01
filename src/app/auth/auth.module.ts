import { NgModule } from '@angular/core';
import { AngularMaterial } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AngularMaterial,
        AuthRoutingModule
    ],
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    exports:[
        LoginComponent,
        SignupComponent
    ]
}
)
export class AuthModule {

}