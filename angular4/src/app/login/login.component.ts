import { Component, OnInit } from '@angular/core';
import { LoginService } from './../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private LoginService: LoginService) { }

  ngOnInit() {
  }
  message = '';
  statuscode = 0;
  Login(email, password){
  	// console.log(email, password);
  	this.LoginService.Login(email, password).subscribe(res=>{
  	    	this.statuscode = parseInt(JSON.stringify(res.status))
	  	    if(this.statuscode == 200){		
  	    		this.message = 'User Login successfully';
  	    		this.statuscode = 0;
  	    	}
  	    	else{
  	    		this.message = 'Login Failed Please Try Again';
  	    	}
  	    }, error => {
                	    		this.message = 'Login Failed Please Try Again';
          });
  }

}
