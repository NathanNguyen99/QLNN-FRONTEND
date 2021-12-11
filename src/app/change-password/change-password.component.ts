import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Helpers } from '../Helpers/helpers';
import { AlertService, UserService } from '../Shared/Services';
import { Location } from '@angular/common';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  hide = true;
  constructor(
    private fb: FormBuilder,
    private usersevice: UserService,
    private alertSv: AlertService,
    public helper: Helpers,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        oldpassword: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.ConfirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  }
  passwordVisible = false;
  password?: string;

  ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmPasswordValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  @ViewChild('newpassword') newpassword: any;
  @ViewChild('confirmpassword') confirmpassword: any;

  focusOn() {
    let virtualPass = this.newpassword
    this.newpassword.nativeElement.focus();
    if(virtualPass != this.newpassword) {
      this.newpassword.nativeElement.blur();
      this.submitted = false;
      
    }
    //this.submitted = false;

  }

  secondFocusOn() {
    this.confirmpassword.nativeElement.focus();
    let virtualPass = this.confirmpassword
    if(virtualPass != this.confirmpassword) {
      this.confirmpassword.nativeElement.blur();
      this.submitted = false;
      
    }
    //this.submitted = false;

  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.status === 'VALID') {
      //console.log(this.registerForm.controls)
      this.usersevice
        .ChangePw(
          this.registerForm.controls.oldpassword.value,
          this.registerForm.controls.password.value
        )
        .subscribe(
          (r: any) => {
            console.log(r);
            if (r === false) this.fail();
            else this.success();
          },
          (er: any) => console.log(er)
        );
    }
  }

  back() {
    this._location.back();
  }

  private success() {
    this.alertSv.message('Lưu thành công');
    this._location.back();
  }

  private fail() {
    this.alertSv.message('Mật khẩu sai');
  }
}
