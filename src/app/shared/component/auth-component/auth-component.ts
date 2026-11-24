import { Component, inject, OnInit, signal } from '@angular/core';
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
import { exhaustMap, Subject, catchError, EMPTY, finalize } from 'rxjs';

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
export class AuthComponent implements OnInit {
  isAllReadyHaveAccount = false;

  private loginSubject = new Subject<ILogin>();
  private signInSubject = new Subject<IsignUp>();

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
  isLoggingIn = signal(false);
  isSigning = signal(false);
  private _authService = inject(AuthService);
  private _routerService = inject(Router);
  private _snackbar = inject(SnackbarService);

  ngOnInit(): void {
    this.onLoginThroughExecustMap();
    this.onSignupThroughExecustMap();
  }

  onLoginThroughExecustMap() {
    this.loginSubject
      .pipe(
        exhaustMap((user) => {
          this.isLoggingIn.set(true);

          return this._authService.loginUser(user).pipe(
            catchError((err) => {
              this._snackbar.openSnackBar(err.error?.message || 'Login failed');
              return EMPTY;
            }),
            finalize(() => this.isLoggingIn.set(false)),
          );
        }),
      )
      .subscribe({
        next: (data) => {
          const authData = data as {
            token: string;
            userRole: string;
            message: string;
          };

          this._authService.saveToken(authData.token);
          this._authService.saveUserRole(authData.userRole);
          this._routerService.navigate(['home']);
          this._snackbar.openSnackBar(authData.message);
        },
      });
  }
  onSignupThroughExecustMap() {
    this.signInSubject
      .pipe(
        exhaustMap((user) => {
          this.isSigning.set(true);

          return this._authService.signInUser(user).pipe(
            catchError((err) => {
              this._snackbar.openSnackBar(err.error?.message || 'Signup failed');
              return EMPTY;
            }),
            finalize(() => this.isSigning.set(false)),
          );
        }),
      )
      .subscribe({
        next: (res) => {
          this.isAllReadyHaveAccount = true;
        },
      });
  }
  onLogin(eve: Event) {
    eve.preventDefault();
    if (this.loginForm().invalid()) {
      this.loginForm().markAsTouched();
      return;
    }
    const USER: ILogin = {
      ...this.loginModel(),
    };
    this.loginSubject.next(USER);
  }

  onSignUp(eve: Event) {
    eve.preventDefault();
    if (this.signInForm().invalid()) {
      this.signInForm().markAsTouched();
      return;
    }
    let NEW_OBJ: IsignUp = {
      ...this.signUpModel(),
    };
    this.signInSubject.next(NEW_OBJ);
  }
}
