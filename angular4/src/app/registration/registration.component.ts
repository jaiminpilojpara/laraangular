import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'app/Services/registration.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'app/Services/validation.service';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
	registrationForm: any;

	constructor(private RegistrationService: RegistrationService, private router: Router, private formBuilder: FormBuilder) {
		if(localStorage.getItem('userId') != null && localStorage.getItem('userToken') != null && localStorage.getItem('userName') != null){
			this.router.navigateByUrl('/home');
		}

		this.registrationForm = this.formBuilder.group({
			'first_name': ['', Validators.required],
			'last_name': ['', Validators.required],
			'email': ['', [Validators.required, ValidationService.emailValidator]],
			'password': ['', [Validators.required, ValidationService.passwordValidator]]
		});
		
		// console.log(this.registrationForm);
	}

	ngOnInit() {}
	
	statuscode = 0;
	message = '';

	Register(){
		// console.log(this.registrationForm.value.first_name, this.registrationForm.value.last_name, this.registrationForm.value.email, this.registrationForm.value.password);
		if(this.registrationForm.dirty && this.registrationForm.valid){
			this.RegistrationService.AddRegisterUser(this.registrationForm.value.first_name, this.registrationForm.value.last_name, this.registrationForm.value.email, this.registrationForm.value.password).subscribe(res=>{
				this.statuscode = parseInt(JSON.stringify(res.status))
				
				if(this.statuscode == 200){		
					this.message = 'User Registered successfully';
					this.statuscode = 0;
				}
				else{
					this.message = 'User Registered Failed Please Try Again';
				}
			}, 
			error => {
				this.message = 'User Registered Failed Please Try Again';
			});
		}
	}
}
