import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/Services/login.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'app/Services/validation.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: any;

	constructor(private LoginService: LoginService, private router: Router, private formBuilder: FormBuilder) {
		if(localStorage.getItem('userId') != null && localStorage.getItem('userToken') != null && localStorage.getItem('userName') != null){
			this.router.navigateByUrl('/home');
		}

		this.loginForm = this.formBuilder.group({
			'email': ['', [Validators.required, ValidationService.emailValidator]],
			'password': ['', [Validators.required]]
		});
	}

	ngOnInit() {}
	message = '';
	response = [];
	Login(){
		if(this.loginForm.dirty && this.loginForm.valid){
			this.LoginService.Login(this.loginForm.value.email, this.loginForm.value.password).subscribe(res=>{
				this.response = JSON.parse(res['_body'])

				if(this.response['status'] == '1'){		
					localStorage.setItem("userId",this.response['id'])
					localStorage.setItem("userToken",this.response['loginToken'])
					localStorage.setItem("userName",this.response['name'])
					this.router.navigateByUrl('/home');
				}
				else if(this.response['status'] == '0'){
					this.message = 'Login Failed Please Try Again';
				}
			});
		}
	}

}
