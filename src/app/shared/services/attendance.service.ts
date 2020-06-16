import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlService } from './url.service';


@Injectable({
    providedIn: 'root'
  })
  export class AttendanceService {

    constructor(private httpService: HttpClient) { }

    public getCustomersByName(customerName: string): Observable<any> {
        return this.httpService.get<any>(
        UrlService.addApiPrefix('api/customer/getcustomerbyname/' + customerName));
    }

    public getAnimalsByCustomerId(customerId: number): Observable<any> {
      return this.httpService.get<any>(
      UrlService.addApiPrefix(`api/animal/getbycustomerId/${customerId}`));
    }

    public geAllVeterinaries(): Observable<any> {
      return this.httpService.get<any>(
      UrlService.addApiPrefix(`api/veterinary/getall`));
    }

    public createAttendance(attendence: any): Observable<any> {
      return this.httpService.post<any>( UrlService.addApiPrefix(`api/attendance/create`), attendence);
    }

    public getAttendanceByCustomerId(customerId: number): Observable<any> {
      return this.httpService.get(UrlService.addApiPrefix(`api/attendance/GetByCustomerId/${customerId}`));
    }
  }
