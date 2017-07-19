import { Component, OnInit } from '@angular/core';
import { LoginService } from './../login.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	constructor(private LoginService: LoginService, private router: Router) {
		if(localStorage.getItem('userId') != null && localStorage.getItem('userToken') != null && localStorage.getItem('userName') != null){
			this.router.navigateByUrl('/home');
		}
	}

	ngOnInit() {}
	message = '';
	response = [];
	Login(email, password){
		this.LoginService.Login(email, password).subscribe(res=>{
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
