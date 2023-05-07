import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: Auth
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  async register() {
    console.log(this.registrationForm.value);

    const { email, password, confirmPassword, firstName, lastName } =
      this.registrationForm.value;

    if (password !== confirmPassword) {
      alert('Passwords do not match');

      return;
    }

    try {
      await this.authService.register(email, password);

      this.router.navigateByUrl('/appointment');
    } catch (e) {
      console.log("Couldn't register user");
    }
  }
}
