import { Component, OnInit } from '@angular/core';
import { RegistrationService } from './../registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private RegistrationService: RegistrationService) {
   }

  ngOnInit() {
  }
  statuscode = 0;
  message = '';
  Register(first_name, last_name, email, password){
  	    this.RegistrationService.AddRegisterUser(first_name, last_name, email, password).subscribe(res=>{
  	    	this.statuscode = parseInt(JSON.stringify(res.status))
	  	    if(this.statuscode == 200){		
  	    		this.message = 'User Registered successfully';
  	    		this.statuscode = 0;
  	    	}
  	    	else{
  	    		this.message = 'User Registered Failed Please Try Again';
  	    	}
  	    }, error => {
                	    		this.message = 'User Registered Failed Please Try Again';
          });
  }
}
