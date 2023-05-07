import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
})
export class DateFormatterPipe implements PipeTransform {
  transform(timestamp: any): unknown {
    // Check if input is a Firestore timestamp
    if (timestamp && timestamp.toDate instanceof Function) {
      // Convert to JavaScript Date object
      const date = timestamp.toDate();
      // Format the date in mm/dd/yyyy format
      return date.toLocaleDateString('en-US');
    }
    return '';
  }
}
