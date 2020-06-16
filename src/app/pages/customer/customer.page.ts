import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { CpfCnpjValidator } from '../../shared/validators/CpfCnpjValidator';
import { ToolsService } from '../../shared/services/tools.service';
import { isCpfAlreadyExist } from '../../shared/validators/cpfValidator';
import { RegisterService } from '../../shared/services/register.service';
import { HttpErrorResponse } from '@angular/common/http';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
})
export class CustomerPage implements OnInit {

  public customerForm: FormGroup;

  public validationMessages = {

    name: [
      { type: 'required', message: 'Por favor preencha seu nome' }
    ],
    cpf: [
      { type: 'required', message: 'Por favor preencha seu Cpf' },
      { type: 'invalid',  message : 'Cpf Inválido'},
      { type: 'duplicate', message: 'Cpf já Cadastrado'}
    ],
  };


  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private toolsService: ToolsService,
    private router: Router
  ) {

    this.customerForm = this.formBuilder.group({
      name: new FormControl('', {
        updateOn: 'blur',
        validators: Validators.compose([
          Validators.required
        ])
      }),
      cpf: new FormControl('', {
        updateOn: 'blur' ,
        validators: Validators.compose([
          Validators.required,
          CpfCnpjValidator.validateCpf
        ]), asyncValidators: [isCpfAlreadyExist(this.registerService)]
      })
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

  }

  public showErrorMessage(input: string, validation: {type: string, message: string}): boolean {

    return this.customerForm.get(input)
        .hasError(validation.type) &&
        ( this.customerForm.get(input).dirty || this.customerForm.get(input).touched);
  }

  public newCustomer() {

    if (!this.customerForm.valid) {
      return;
    }

    const requestCustomer = this.customerForm.getRawValue();
    requestCustomer['cpf'] = this.getDigitos(requestCustomer['cpf']);
    this.toolsService.presentLoading('Criando o seu cadastro').then(async () => {
      this.registerService.createCustomer(requestCustomer).subscribe( async result => {
          this.toolsService.dismissLoading();
          await this.toolsService.presentErrorAlert('Cliente criado com sucesso!!!', 'Novo Cadastro', '' , 'OK');
          this.registerService.getCustomerByCpf( requestCustomer['cpf']).subscribe( customer => {
             localStorage.setItem('customer_key', JSON.stringify(customer));
             this.router.navigateByUrl('tabs/animal');
          });
      }, (errorResponse: HttpErrorResponse) => {
        this.toolsService.dismissLoading();
        if (errorResponse.status === 400 && errorResponse.error.errors) {
          const error = errorResponse.error.errors;
          if (error.Cpf && error.Cpf.length > 0) {
            this.toolsService.presentErrorAlert(error.Cpf[0], 'ATENÇÃO', '', 'OK' );
          }
          if (error.Name && error.Name.length > 0){
            this.toolsService.presentErrorAlert(error.Name[0], 'ATENÇÃO', '', 'OK' );
          }

        }
      });
    });

  }

  public getDigitos(value) {
    const regex = new RegExp('\\D', 'g');
    return value.replace(regex, '');
  }

}
