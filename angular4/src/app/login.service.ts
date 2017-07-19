import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class LoginService 
{
    constructor (private http: Http) {

    }

    Login(email, password) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const body = {
                      email: email,
                      password: password
                   }

        return this.http
        .post('http://local.laraangular.com/api/login',
            body, {
                headers: headers
            })
    }

    Logout(id){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const body = {id: id}
        return this.http
        .post('http://local.laraangular.com/api/logout',
            body, {
                headers: headers
            })
    }
}