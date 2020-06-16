import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../shared/services/attendance.service';


@Component({
  selector: 'app-history-attendance',
  templateUrl: './history-attendance.page.html',
  styleUrls: ['./history-attendance.page.scss'],
})
export class HistoryAttendancePage implements OnInit {

  public attendances = [];
  constructor(
    private attendanceService: AttendanceService) {
    }

  ngOnInit() {
    // tslint:disable-next-line: radix
    const customerid = parseInt(JSON.parse(localStorage.getItem('customer_key')).id);

    this.attendanceService.getAttendanceByCustomerId(customerid).subscribe( result => {
      this.attendances = result.attendances;
    });
  }

}
