import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class RegistrationService 
{
  constructor (
    private http: Http
  ) {}

  AddRegisterUser(firstname, lastname, email, password) {
      var headers = new Headers();

      // headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Content-Type', 'application/json');
      const body = {
                      first_name: firstname,
                      last_name: lastname,
                      email: email,
                      password: password
                   }

      return this.http
        .post('http://local.laraangular.com/api/register',
          body, {
            headers: headers
          })
  }    


}
