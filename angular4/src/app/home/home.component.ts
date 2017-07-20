import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/Services/login.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private LoginService: LoginService,private router: Router) { 
		if(localStorage.getItem('userId') == null && localStorage.getItem('userToken') == null && localStorage.getItem('userName') == null){
			this.router.navigateByUrl('/login');
		}
	}

	ngOnInit() {}

	name = "Welcome Mr. " + localStorage.getItem("userName")
	message = name; //You can Change Accordingly

	logout(){
		this.LoginService.Logout(localStorage.getItem("userId")).subscribe();
		localStorage.clear();
	}
}