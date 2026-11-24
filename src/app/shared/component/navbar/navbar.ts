import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { MatButtonModule } from '@angular/material/button';
import { SnackbarService } from '../../service/snackbar-service';

@Component({
  imports: [RouterLink, MatButtonModule],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit {
  ngOnInit(): void {}

  public _roueterService = inject(Router);
  public _snackbarService = inject(SnackbarService);
  public _authService = inject(AuthService);

  get token() {
    return this._authService.getToken();
  }

  logoutUser() {
    this._authService.logout();
    this._roueterService.navigate(['']);
    this._snackbarService.openSnackBar(`Logout Successfully....!`);
  }
}
