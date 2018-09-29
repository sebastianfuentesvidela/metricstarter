import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from '../static/about/about.component';
import { TechstartComponent } from './techstart/techstart.component';
import { DinchartComponent } from './dinchart/dinchart.component';
import { GrafoComponent } from './grafo/grafo.component';
import { InfoComponent } from './info.component';
import { ContentDialogComponent } from '../static/login/contentdialog';
import { LoginDialogComponent } from '../static/login/logindialog';
import { AuthGuardService } from '@app/core';

const routes: Routes = [
  {
    path: 'infometrics',
    canActivate: [AuthGuardService],
    component: InfoComponent,
    data: { title: 'TechstartComponent' },
    children: [
      {
        path: '',
        component: TechstartComponent  },
        {
          path: 'dashh',
          component: TechstartComponent  },
          {
          path: 'aupanishads',
          component: LoginDialogComponent  },
          {
          path: 'grafo',
          component: GrafoComponent  },
          {
            path: 'dinamyc',
            component: DinchartComponent  },
          {
          path: 'dialogs',
          component: ContentDialogComponent  }
    ]

  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InfoRoutingModule {}
