import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'app/Services/registration.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'app/Services/validation.service';
import { MdSnackBar } from '@angular/material';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
	registrationForm: any;

	constructor(private RegistrationService: RegistrationService, private router: Router, private formBuilder: FormBuilder,  public snackBar: MdSnackBar) {
		if(localStorage.getItem('userId') != null && localStorage.getItem('userToken') != null && localStorage.getItem('userName') != null){
			this.router.navigateByUrl('/home');
		}

		this.registrationForm = this.formBuilder.group({
			'first_name': ['', Validators.required],
			'last_name': ['', Validators.required],
			'email': ['', [Validators.required, ValidationService.emailValidator]],
			'password': ['', [Validators.required, ValidationService.passwordValidator]]
		});		
	}

	ngOnInit() {}
	
	statuscode = 0;
	message = '';

	Register(){
		if(this.registrationForm.dirty && this.registrationForm.valid){
			this.RegistrationService.AddRegisterUser(this.registrationForm.value.first_name, this.registrationForm.value.last_name, this.registrationForm.value.email, this.registrationForm.value.password).subscribe(res=>{
				this.statuscode = parseInt(JSON.stringify(res.status))
				
				if(this.statuscode == 200){	
					this.router.navigateByUrl('/login');
					this.snackBar.open('You have Registered successfully Now enter your credetials to Login', null , {duration: 5000,});
					this.statuscode = 0;
				}
				else{
					this.snackBar.open('Your Registeration Failed Please Try Again', null , {duration: 3000,});
				}
			}, 
			error=>{
				this.snackBar.open('Server not Responding Please try again', null , {duration: 4000,});
			});
		}
	}
}

