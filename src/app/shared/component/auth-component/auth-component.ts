import { Component, inject, signal } from '@angular/core';
import { ILogin, IsignUp } from '../../model/Ilogin';
import { form, FormField } from '@angular/forms/signals';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../service/snackbar-service';
import { MatSelectModule } from '@angular/material/select';
import { CdkPortal } from '@angular/cdk/portal';

@Component({
  imports: [
    MatCardModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButtonModule,
    FormField,
    MatSelectModule,
  ],
  selector: 'app-auth-component',
  styleUrl: './auth-component.scss',
  templateUrl: './auth-component.html',
})
export class AuthComponent {
  isAllReadyHaveAccount = false;

  loginModel = signal<ILogin>({
    email: '',
    password: '',
  });
  signUpModel = signal<IsignUp>({
    name: '',
    email: '',
    password: '',
    userRole: 'buyer',
  });

  loginForm = form(this.loginModel);
  signInForm = form(this.signUpModel);

  private _authService = inject(AuthService);
  private _routerService = inject(Router);
  private _snackbar = inject(SnackbarService);

  onLogin(eve: Event) {
    eve.preventDefault();

    if (this.loginForm().invalid()) {
      this.loginForm().markAsTouched();
      return;
    }

    const USER: ILogin = {
      ...this.loginModel(),
    };
    this._authService.loginUser(USER).subscribe({
      next: (data) => {
        const authData = data as { token: string; userRole: string; message: string };
        this._authService.saveToken(authData.token);
        this._authService.saveUserRole(authData.userRole);
        this._routerService.navigate(['home']);
        this._snackbar.openSnackBar(authData.message);
      },
      error: (err) => {
        this._snackbar.openSnackBar(err);
      },
    });
  }

  onSignUp(eve: Event) {
    eve.preventDefault();
    let NEW_OBJ: IsignUp = {
      ...this.signUpModel(),
    };
    this._authService.signInUser(NEW_OBJ).subscribe({
      next: (data) => {
        this.isAllReadyHaveAccount = true;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
