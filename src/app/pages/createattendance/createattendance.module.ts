import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/modules/shared.module';
import { IonicModule } from '@ionic/angular';

import { CreateattendancePage } from './createattendance.page';

const routes: Routes = [
  {
    path: '',
    component: CreateattendancePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateattendancePage]
})
export class CreateattendancePageModule {}
