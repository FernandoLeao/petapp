import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../shared/services/attendance.service';
import { ToolsService } from 'src/app/shared/services/tools.service';
import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {

  public searchInput: string;
  public customers: any;
  public spinner = false;

  constructor( private attendanceService: AttendanceService,
              private toolsService: ToolsService,
              private modalCtrl: ModalController,
              private router: Router) { }

  ngOnInit() {
  }


  public onChange() {
    this.customers = [];
    this.loadCustomers(this.searchInput);
  }


  public loadCustomers(customerName: string) {
    this.spinner = true;
    this.customers = [];
    this.attendanceService.getCustomersByName(customerName)
    .subscribe(result  => {
        this.customers = result.customers;
        this.spinner = false;
      }, error => {
        this.spinner = false;
        this.toolsService.presentErrorAlert(error, '', '', 'Sair');
      });
  }

  public async goto(customer: any) {

    this.router.navigate(['/create-attendance', customer.id, customer.name]);
  }

}
