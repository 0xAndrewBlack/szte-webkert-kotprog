import { Component, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { User } from '@firebase/auth';
import { Auth } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @ViewChild('sidenav') sidenav?: MatSidenav;

  user!: User | null;

  constructor(private router: Router, private authService: Auth) {
    this.authService.isUserLoggedIn().subscribe((user) => {
      this.user = user as User;
    });
  }

  toggleSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  logout() {
    this.authService.logout();

    console.log(this.user);

    if (this.sidenav) {
      this.sidenav.close();
    }

    this.router.navigate(['/auth']);
  }
}
