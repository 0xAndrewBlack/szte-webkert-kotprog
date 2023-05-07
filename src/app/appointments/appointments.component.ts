import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

import { Appointment } from '../Appointment';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  appointments$!: Observable<Appointment[]>;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.appointments$ = this.firestore
      .collection<Appointment>('idopontok')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Appointment;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  deleteAppointment(id: string): void {
    console.log('deleteAppointment() called', id);

    this.firestore.collection<Appointment>('idopontok').doc(id).delete();
  }
}
