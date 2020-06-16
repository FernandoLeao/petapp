import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children : [
      { path: 'customer', loadChildren: './../customer/customer.module#CustomerPageModule' },
      { path: 'animal', loadChildren: './../animal/animal.module#AnimalPageModule' },
      { path: 'schedule', loadChildren: './../schedule/schedule.module#SchedulePageModule' },
      { path: 'history-attendance', loadChildren: './../history-attendance/history-attendance.module#HistoryAttendancePageModule' }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/customer'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
