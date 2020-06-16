import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AttendanceService } from '../../shared/services/attendance.service';
import { ToolsService } from '../../shared/services/tools.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DateValidator } from '../../shared/validators/dateValidator';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-createattendance',
  templateUrl: './createattendance.page.html',
  styleUrls: ['./createattendance.page.scss'],
})
export class CreateattendancePage implements OnInit {

  private customerId: number;
  public customerName: string;
  public animals = [];
  public veterinaries = [];


  public attendanceForm: FormGroup;
  public animalId: any  = '0';
  public veterinaryId: any = '0';

  public validationMessages = {

    attendanceDate: [
      { type: 'required', message: 'Por favor preencha a data do Atendimento' },
      { type: 'dateNotValid', message: 'Data não é válida' }
    ],
    diagnostic: [
      { type: 'required', message: 'Por favor preencha a idade do seu animal' }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toolsService: ToolsService,
    private alertCtrl: AlertController,
    private router: Router,
    private attendanceService: AttendanceService) {

      this.attendanceForm = this.formBuilder.group({
        diagnostic: new FormControl('', {
          updateOn: 'blur',
          validators: Validators.compose([
            Validators.required
          ])
        }),
        attendanceDate: new FormControl('', {
          updateOn: 'blur' ,
          validators: Validators.compose([
            Validators.required,
            DateValidator.validate
          ])
        })
      });
  }

  ngOnInit() {

   this.route.params.subscribe(params => {
      // tslint:disable-next-line: radix
      this.customerId = parseInt(params['customerid']);
      this.customerName = params['customername'];
      this.attendanceService.getAnimalsByCustomerId(this.customerId).subscribe( result => {
        this.animals = result.animals;
        console.log(this.animals);
      });

      this.attendanceService.geAllVeterinaries().subscribe( result => {
        this.veterinaries = result.veterinaries;
        console.log(this.veterinaries);
      });

   });

  }


  public showErrorMessage(input: string, validation: {type: string, message: string}): boolean {

      return this.attendanceForm.get(input)
        .hasError(validation.type) &&
        ( this.attendanceForm.get(input).dirty || this.attendanceForm.get(input).touched);
  }

  public newAttendance() {


    if (!this.attendanceForm.valid) {
      return;
    }

    if (this.animalId === '0' || !this.animalId) {
      this.toolsService.presentErrorAlert('Selecione um animal', 'ATENÇÃO', '', 'OK');
      return;
    }


    if (this.veterinaryId === '0' || !this.veterinaryId) {
      this.toolsService.presentErrorAlert('Selecione um Veterinário', 'ATENÇÃO', '', 'OK');
      return;
    }

    const requestAttendece = this.attendanceForm.getRawValue();
    requestAttendece.attendanceDate = this.transformDate(requestAttendece.attendanceDate);
    requestAttendece.animalId = this.animalId;
    requestAttendece.veterinaryId = this.veterinaryId;

    this.toolsService.presentLoading('Criando o Atendimento').then(async () => {
      this.attendanceService.createAttendance(requestAttendece).subscribe( async result => {
          this.toolsService.dismissLoading();
          await this.new_attendance();
      }, (errorResponse: HttpErrorResponse) => {
        this.toolsService.dismissLoading();
        if (errorResponse.status === 400 && errorResponse.error.errors) {
          const error = errorResponse.error.errors;
          if (error.AnimalId && error.AnimalId.length > 0) {
            this.toolsService.presentErrorAlert(error.AnimalId[0], 'ATENÇÃO', '', 'OK' );
          }
          if (error.VeterinaryId && error.VeterinaryId.length > 0) {
            this.toolsService.presentErrorAlert(error.VeterinaryId[0], 'ATENÇÃO', '', 'OK' );
          }

          if (error.Diagnostic && error.Diagnostic.length > 0) {
            this.toolsService.presentErrorAlert(error.Diagnostic[0], 'ATENÇÃO', '', 'OK' );
          }

          if (error.AttendanceDate && error.AttendanceDate.length > 0) {
            this.toolsService.presentErrorAlert(error.AttendanceDate[0], 'ATENÇÃO', '', 'OK' );
          }

        }
      });
    });


  }

  private transformDate(date: string) {
    const dateArr = date.split('/');
    return  dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
  }


  public async new_attendance() {
    const alert = await this.alertCtrl.create({
        message: `Deseja cadastrar mais um Atendimento para o cliente ${this.customerName} ?`,
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            handler: () => {
              this.router.navigateByUrl('tabs/customer');
            }
          },
          {
            text: 'Sim',
            handler: () => {
              this.attendanceForm.reset();
              this.veterinaryId = '0';
              this.animalId = '0';
            }
          }
        ]
      });
    await alert.present();
  }

}
