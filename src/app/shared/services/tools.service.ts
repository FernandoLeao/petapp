import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  public loading: HTMLIonLoadingElement;
  constructor(private alertCtrl: AlertController,
    private loadingController: LoadingController) { }

  public async presentErrorAlert(message: string, header: string, subHeader: string, buttonName: string) {
    const alertOpen = await this.alertCtrl.getTop(),
          loadingOpen = await this.loadingController.getTop();
    if (!alertOpen) {
      const alert = await this.alertCtrl.create({
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: [buttonName]
      });
      await alert.present();
    }
  }

  public async presentLoading(message: string) {
    const alertOpen = await this.alertCtrl.getTop(),
          loadingOpen = await this.loadingController.getTop();
    if (!loadingOpen) {
      this.loading = await this.loadingController.create({
        spinner: 'bubbles',
        message: message,
        translucent: true,
        cssClass: 'custom-class custom-loading'
      });
      return await this.loading.present();
    }
  }

  public async dismissLoading() {
    const top = await this.loadingController.getTop();
    if (top) {
      top.dismiss();
    }
  }

  public validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  public addModalHistory() {
    if (!window.history.state.modal) {
      const modalState = { modal: true };
      history.pushState(modalState, null);
    }
  }

  public searchCep(zip_code: string){
    

  }
}
