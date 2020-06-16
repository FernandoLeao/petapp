import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlService } from './url.service';

@Injectable({
    providedIn: 'root'
  })
  export class RegisterService {

    constructor(private httpService: HttpClient) { }


    public async hasCpf(cpf: string): Promise<any> {

        const promise = new Promise( async (resolve, reject) =>  {
            this.getCustomerByCpf(cpf).subscribe(customer => {
                console.log(customer);
                if (customer) {
                    resolve(true);
                }
                resolve(false);
            }, (error) => {
                resolve(false);
            });
        });

        return promise;
    }

    private getDigitos(value) {
        const regex = new RegExp('\\D', 'g');
        return value.replace(regex, '');
    }

    public getCustomerByCpf(cpf: string): Observable<any> {
        return  this.httpService.get(UrlService.addApiPrefix('api/customer/getcustomerbycpf/' + this.getDigitos(cpf) ));
    }

    public createCustomer(customer: any): Observable<any> {
        return  this.httpService.post(UrlService.addApiPrefix('api/customer/create'), customer);
    }

    public createAnimal(animal: any): Observable<any> {
        return  this.httpService.post(UrlService.addApiPrefix('api/animal/create'), animal);
    }
}
