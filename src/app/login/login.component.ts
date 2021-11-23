import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from './../Shared/Services/token.service';
import { AlertService } from './../Shared/Services/alert.service';
import {NavService} from './../Shared/Services/nav.service';
import { AuthenticationService } from './../Shared/Services/authentication.service';
import { Helpers } from './../Helpers/helpers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
    isLoading = false;
    submitted = false;
    returnUrl: string | undefined;
    errormgs : string | undefined;
    private formSubmitAttempt: boolean = false;
  constructor(private helpers: Helpers, 
    private router: Router, 
    private route: ActivatedRoute,
    private tokenService: TokenService, 
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private navService: NavService    ) { 
      // if (this.authenticationService.currentUserValue) { 
      //   this.router.navigate(['/']);
    //}
    }
    
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  

  login(): void {
    this.isLoading = true;
    this.errormgs ="";     
    let authValues = {"Username":this.f.username.value, "Password":this.f.password.value};
    //let authValues = {"Username":"admin", "Password":"20@21"};
    this.tokenService.auth(authValues).subscribe((token: any) => {
      
      this.isLoading = false;
      this.helpers.setToken(token);
      this.router.navigate(['/home/dashboard']);      
      
    }, (error: { status: number; }) => {
      
      if (error.status===0)
        this.errormgs ="Không kết nối được đến server";
      if (error.status===401)
        this.errormgs ="Sai tên người dùng hoặc mật khẩu";
      
      this.isLoading = false;
    });
  }

  get f() { return this.loginForm.controls; }

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field)!.valid && this.loginForm.get(field)!.touched) ||
      (this.loginForm.get(field)!.untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    
    this.login();
    
    // this.authenticationService.login(this.f.username.value, this.f.password.value)
    //     .pipe(first())
    //     .subscribe(
    //         data => {
    //             this.router.navigate([this.returnUrl]);
    //         },
    //         error => {
    //             this.alertService.error(error);
    //             this.loading = false;
    //         });
  }

} 
