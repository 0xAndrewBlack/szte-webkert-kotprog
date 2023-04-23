import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  satisfiedCustomers = 1234;
  issuedDocuments = 5678;
  yearsOfExperience = 12;
  teamMembers = 6;
}
