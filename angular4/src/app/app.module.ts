import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from     './registration/registration.component';
import { HomeComponent } from './home/home.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdInputModule, MdSnackBarModule } from '@angular/material';

import { ControlMessagesComponent } from './control-messages.component';
import { ValidationService } from 'app/Services/validation.service';

import { RegistrationService } from 'app/Services/registration.service';
import { LoginService } from 'app/Services/login.service';


const appRoutes: Routes = [
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegistrationComponent,
        HomeComponent,
        ControlMessagesComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MdButtonModule,
        MdInputModule,
        MdSnackBarModule,
        RouterModule.forRoot(
            appRoutes
            // { enableTracing: true } // <-- debugging purposes only
        )
            // other imports here
    ],
    providers: [
        RegistrationService,
        LoginService,
        ValidationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
