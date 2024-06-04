import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-calendario-component',
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss',
  standalone: true,
  imports: [MatDatepickerModule, MatCardModule],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarioComponent implements OnInit {
  selected: Date = new Date();

  ngOnInit(): void {}

  daysSelected: any[] = ['2024-06-01', '2024-05-08'];

  event: any;

  isSelected = (event: any) => {
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2);
    return this.daysSelected.find((x) => x == date) ? 'selected' : null;
  };

  select(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      '-' +
      ('00' + (event.getMonth() + 1)).slice(-2) +
      '-' +
      ('00' + event.getDate()).slice(-2);
    const index = this.daysSelected.findIndex((x) => x == date);
    if (index < 0) this.daysSelected.push(date);
    else this.daysSelected.splice(index, 1);

    calendar.updateTodaysDate();
  }
}
