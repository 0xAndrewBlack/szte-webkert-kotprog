import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Appointment } from './Appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  collectionName = 'idopontok';

  constructor(private afs: AngularFirestore) {}

  async createAppointment(appointment: Appointment) {
    const appointments = this.afs.collection(this.collectionName);

    await appointments.add(appointment);
  }

  async getMyAppointments(uid: string) {
    const appointments = this.afs
      .collection(this.collectionName, (ref) => ref.where('uid', '==', uid))
      .get();

    return appointments;
  }

  async getAppointments() {
    const appointments = this.afs.collection(this.collectionName);

    return appointments;
  }

  async deleteAppointment(id: string) {
    const appointments = this.afs.collection(this.collectionName);

    await appointments.doc(id).delete();
  }

  async updateAppointment(id: string, appointment: Appointment) {
    const appointments = this.afs.collection(this.collectionName);

    await appointments.doc(id).update(appointment);
  }

  async getAppointment(id: string) {
    const appointments = this.afs.collection(this.collectionName);

    return appointments.doc(id).get();
  }
}
