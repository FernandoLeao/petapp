import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { ToolsService } from '../../shared/services/tools.service';
import { AlertController } from '@ionic/angular';
import { RegisterService } from '../../shared/services/register.service';
import { HttpErrorResponse } from '@angular/common/http';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.page.html',
  styleUrls: ['./animal.page.scss'],
})
export class AnimalPage implements OnInit {

  public animalForm: FormGroup;
  public animalTypeId: any  = '1';

  public validationMessages = {

    name: [
      { type: 'required', message: 'Por favor preencha o nome do seu animal' }
    ],
    age: [
      { type: 'required', message: 'Por favor preencha a idade do seu animal' }
    ]
  };


  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private toolsService: ToolsService,
    private alertCtrl: AlertController,
    private router: Router
  ) {

    this.animalForm = this.formBuilder.group({
      name: new FormControl('', {
        updateOn: 'blur',
        validators: Validators.compose([
          Validators.required
        ])
      }),
      age: new FormControl('', {
        updateOn: 'blur' ,
        validators: Validators.compose([
          Validators.required
        ])
      })
    });
  }

  ngOnInit(): void {
  }

  public showErrorMessage(input: string, validation: {type: string, message: string}): boolean {

    return this.animalForm.get(input)
        .hasError(validation.type) &&
        ( this.animalForm.get(input).dirty || this.animalForm.get(input).touched);
  }

  public newAnimal() {

    if (!this.animalForm.valid) {
      return;
    }

    const requestAnimal = this.animalForm.getRawValue();
    requestAnimal.customerId =  JSON.parse(localStorage.getItem('customer_key')).id;
    requestAnimal.animalTypeId = this.animalTypeId;

    this.toolsService.presentLoading('Criando o cadastro do seu animal').then(async () => {
      this.registerService.createAnimal(requestAnimal).subscribe( async result => {
          this.toolsService.dismissLoading();
          await this.new_animal();
      }, (errorResponse: HttpErrorResponse) => {

        this.toolsService.dismissLoading();
        if (errorResponse.status === 400 && errorResponse.error.errors) {
          const error = errorResponse.error.errors;
          if (error.Name && error.Name.length > 0){
            this.toolsService.presentErrorAlert(error.Name[0], 'ATENÇÃO', '', 'OK' );
          }
          if (error.Age && error.Age.length > 0) {
            this.toolsService.presentErrorAlert(error.Age[0], 'ATENÇÃO', '', 'OK' );
          }
          if (error.AnimalTypeId && error.AnimalTypeId.length > 0) {
            this.toolsService.presentErrorAlert(error.AnimalTypeId[0], 'ATENÇÃO', '', 'OK' );
          }
        }
      });
    });
  }


  public async new_animal() {
    const alert = await this.alertCtrl.create({
        message: 'Deseja cadastrar mais um Animal ?',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            handler: () => {
              this.router.navigateByUrl('tabs/schedule');
            }
          },
          {
            text: 'Sim',
            handler: () => {
              this.animalForm.reset();
              this.animalTypeId = '1';
            }
          }
        ]
      });
    await alert.present();
  }
}



