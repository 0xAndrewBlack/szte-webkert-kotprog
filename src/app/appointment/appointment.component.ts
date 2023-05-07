import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../auth.service';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent {
  appointmentForm!: FormGroup;
  cases = ['Diákigazolvány készítése', 'Jogosítvány meghosszabbítása'];

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private fb: FormBuilder,
    private authService: Auth,
    private apService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      name: ['', Validators.required],
      case: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  async submit() {
    const uid = await this.auth.currentUser;
    const name = this.appointmentForm.value.name;
    const date = this.appointmentForm.value.date;
    const caseType = this.appointmentForm.value.case;

    const appointment = {
      uid: uid?.uid,
      date,
      name,
      case: caseType,
    };

    this.apService.createAppointment(appointment);
    this.router.navigate(['/appointments']);

    console.log(this.appointmentForm.value);
  }
}
