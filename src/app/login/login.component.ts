import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from './../Shared/Services/token.service';
import { AlertService } from './../Shared/Services/alert.service';
import { NavService } from './../Shared/Services/nav.service';
import { AuthenticationService } from './../Shared/Services/authentication.service';
import { Helpers } from './../Helpers/helpers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { AutoLogoutService } from '../Shared/Services/auto-logout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  submitted = false;
  returnUrl: string | undefined;
  errormgs: string | undefined;
  private formSubmitAttempt: boolean = false;
  constructor(
    private helpers: Helpers,
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private navService: NavService,
    private _autoLogoutService: AutoLogoutService
  ) {
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    //}
  }
  
  private currentUserSubject = new BehaviorSubject<any>(null);
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(): void {
    this.isLoading = true;
    this.errormgs = '';
    let authValues = {
      Username: this.f.username.value,
      Password: this.f.password.value,
    };
    this.tokenService.auth(authValues).subscribe(
      (token: any) => {
        this.isLoading = false;
        this.helpers.setToken(token);
        
        localStorage.setItem('placeName', token.placeName);
        localStorage.setItem('placeId', token.placeId);
        localStorage.setItem('userid', token.userid);
        localStorage.setItem('manageCityID', token.manageCityID);
        //localStorage.setItem('manageCityTypeID', token.manageCityTypeID);
        
        this.currentUserSubject.next(token.placeId);
        this._autoLogoutService.check();
        this.router.navigate(['/home/dashboard']);
        return token.placeId;
      },
      (error: { status: number }) => {
        if (error.status === 0) this.errormgs = 'Kh??ng k???t n???i ???????c ?????n server';
        if (error.status === 401)
          this.errormgs = 'Sai t??n ng?????i d??ng ho???c m???t kh???u';

        this.isLoading = false;
      }
    );
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  get f() {
    return this.loginForm.controls;
  }

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field)!.valid &&
        this.loginForm.get(field)!.touched) ||
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

  }
}
